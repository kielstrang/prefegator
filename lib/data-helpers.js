'use strict';

const voteCounter = require('./vote-borda.js');

module.exports = (knex) => {
  function createPoll({ name, email, desc, url, options }) {
    return knex('polls').insert({ name, email, desc, url })
      .returning('id')
      .then(([id]) => {
        return _createPollOptions(id, options);
      });
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
        return _getBallotOptionIDs(pollID, ballot);
      })
      .then((options) => {
        return Promise.all(options.map(_saveVote));
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
      .then(([id]) => id);
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

  function _saveVote({poll_option_id, rating}) {
    return knex('votes').insert({poll_option_id, rating});
  }

  function _buildPollObject([{ name, email, desc, url }, options]) {
    const poll = { name, email, desc, url };
    poll.options = [];
    options.forEach(({ name, desc, rank }) => {
      poll.options.push({ name, desc, rank });
    });
    return poll;
  };

  function _updateRanks(pollID) {
    //get poll options
    //get votes for each option
    //process votes
    //save new ranks
  };

  return { createPoll, getPoll, saveBallot };
};
