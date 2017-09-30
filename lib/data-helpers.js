'use strict';

const voteCounter = require('./vote-borda.js');
const URL_LENGTH = 8;

module.exports = (knex) => {
  function createPoll({ name, email, desc, url, options }) {
    if(!url) {
      url = _buildPollURL(URL_LENGTH);
    }
    return knex('polls').insert({ name, email, desc, url })
      .returning('id')
      .then(([id]) => {
        return _createPollOptions(id, options);
      })
      .then(() => url);
  };

  function getPoll(url, sort = false) {
    return _getPollIDByURL(url)
      .then(id => {
        return Promise.all([
          _getPollInfo(id),
          _getPollOptions(id, sort)
        ]);
      })
      .then(_buildPollObject);
  }

  function saveBallot(url, ballot) {
    return _getPollIDByURL(url)
      .then(pollID => {
        return _getBallotOptionIDs(pollID, ballot)
          .then((votes) => {
            return Promise.all(votes.map(_saveVote));
          })
          .then(() => {
            return _updatePollRanks(pollID);
          });
      });
  };

  function _createPollOptions(poll_id, options) {
    const mapOptions = options.map(
      ({ name, desc, rank }) => ({ name, desc, rank, poll_id }));
    return knex('poll_options').insert(mapOptions);
  };

  function _getPollIDByURL(url) {
    return knex('polls')
      .select('id').where('url', url).first().pluck('id')
      .then(([id]) => {
        if(!id) {
          const error = new Error(`Poll ${url} not found`);
          error.status = 404;
          return Promise.reject(error);
        }
        return id;
      });
  };

  function _getPollInfo(pollID) {
    return knex('polls')
      .select().where('id', pollID).first();
  };

  function _getPollOptions(pollID, sort = false) {
    return knex('poll_options')
      .select().where('poll_id', pollID)
      .orderBy(sort ? 'rank' : 'id');
  };

  function _getPollVotes(pollID) {
    const subquery = knex('poll_options').select().where('poll_id', pollID).pluck('id');
    return knex('votes').select().whereIn('poll_option_id', subquery);
  };

  function _getBallotOptionIDs(pollID, ballot) {
    return Promise.all(ballot.map((vote, index) => {
      return _getVoteOptionID(pollID, vote, index);
    }));
  };

  function _getVoteOptionID(pollID, name, index) {
    return knex('poll_options')
      .select().where('poll_id', pollID).andWhere('name', name)
      .then(([option]) => {
        if(!option) return Promise.reject(new Error(`Option ${name} does not exist on this poll`));
        const poll_option_id = option.id;
        const rating = index + 1;
        return { poll_option_id, rating };
      });
  };

  function _saveVote({ poll_option_id, rating }) {
    return knex('votes').insert({ poll_option_id, rating });
  }

  function _buildPollObject([{ name, email, desc, url }, options]) {
    const poll = { name, email, desc, url };
    poll.options = [];
    options.forEach(({ name, desc, rank }) => {
      poll.options.push({ name, desc, rank });
    });
    return poll;
  };

  function _buildPollURL(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function _updatePollRanks(pollID) {
    return _getPollOptions(pollID)
      .then(options => {
        return _getPollVotes(pollID)
          .then(votes => {
            return voteCounter.calculateRanks(options, votes);
          });
      })
      .then(rankedOptions => {
        return Promise.all(rankedOptions.map(option => {
          return knex('poll_options').where('id', option.id).update('rank', option.rank);
        }));
      });
  };

  return { createPoll, getPoll, saveBallot };
};
