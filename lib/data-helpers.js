'use strict';

const voteCounter = require('./vote-irv.js');
const errors = require('./custom-errors.js');
const mailgun = require('./send-emails.js');
const URL_LENGTH = 8;

module.exports = (knex) => {
  function createPoll(poll) {
    return _validatePollData(poll)
      .then(({ name, email, desc, url, require_name, options }) => {
        return knex('polls').insert({ name, email, desc, url, require_name })
          .returning('id')
          .then(([id]) => {
            return _createPollOptions(id, options);
          })
          .then(() => {
            mailgun.sendCreateEmail(email, name, url);
            return url;
          });
      });
  };

  function getPoll(url, sort = false) {
    return _getPollIDByURL(url)
      .then(id => {
        return Promise.all([
          _getPollInfo(id),
          _getPollOptions(id, sort),
          _getPollBallots(id)
        ]);
      })
      .then(_buildPollObject);
  }

  function saveBallot(url, ballot) {
    return _getPollIDByURL(url)
      .then(pollID => {
        return _writeBallot(pollID, ballot)
          .then( _updatePollRanks)
          .then(() => {
            return _getPollInfo(pollID);
          })
          .then(({ name, email, url }) => {
            mailgun.sendVoteEmail(email, name, url);
          });
      });
  };

  function _validatePollData(poll) {
    const pollErrors = [];
    if(!poll.name) pollErrors.push('Poll name not specified');
    if(!poll.email) pollErrors.push('Creator email not specified');
    if(!poll.url) poll.url = _buildPollURL(URL_LENGTH);
    if(!poll.options || poll.options.length < 2) pollErrors.push('Minimum 2 options required');
    if(pollErrors.length > 0) return Promise.reject(new errors.InvalidPollData(pollErrors));
    return Promise.resolve(poll);
  }

  function _buildPollURL(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for(var i = 0; i < length; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  }

  function _createPollOptions(poll_id, options) {
    return _validatePollOptions(options)
      .then(options => {
        const mapOptions = options.map(
          ({ name, desc, rank, count }) => ({ name, desc, rank, count, poll_id }));
        return knex('poll_options').insert(mapOptions);
      });
  };

  function _validatePollOptions(options) {
    if(options.some(option => !option.name)) return Promise.reject(new errors.InvalidPollData(['All options must be named']));
    return Promise.resolve(options);
  }

  function _getPollIDByURL(url) {
    return knex('polls')
      .select('id').where('url', url).first().pluck('id')
      .then(([id]) => {
        if(!id) return Promise.reject(new errors.PollNotFound(url));
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

  function _getPollBallots(pollID) {
    return knex('ballots').select().where('poll_id', pollID)
      .then((ballots) => {
        return Promise.all(ballots.map(_getBallotVotes));
      });
  };

  function _getBallotVotes({ id, poll_id, voter_name }) {
    return knex('votes').select().where('ballot_id', id)
      .then(votes => {
        const ballot = { id, poll_id, voter_name, votes: [] };
        votes.forEach(({ poll_option_id, rating }) => {
          ballot.votes.push({ poll_option_id, rating });
        });
        return ballot;
      });
  }

  function _getPollVotes(pollID) {
    const subquery = knex('poll_options').select().where('poll_id', pollID).pluck('id');
    return knex('votes').select().whereIn('poll_option_id', subquery);
  };

  function _buildBallotVotes(pollID, ballot, ballotID) {
    return Promise.all(ballot.map((vote, index) => {
      return _buildVoteWithOptionID(pollID, vote, index, ballotID);
    }));
  };

  function _buildVoteWithOptionID(pollID, name, index, ballot_id) {
    return knex('poll_options')
      .select().where('poll_id', pollID).andWhere('name', name)
      .then(([option]) => {
        if(!option) return Promise.reject(new errors.VoteOptionNotFound(name));
        const poll_option_id = option.id;
        const rating = index + 1;
        return { poll_option_id, rating, ballot_id };
      });
  };

  function _writeBallot(poll_id, ballot) {
    console.log(ballot.voter_name);
    return knex('ballots').insert({ poll_id, voter_name: ballot.voter_name}).returning('id')
      .then(([ballotID]) => {
        return _buildBallotVotes(poll_id, ballot.votes, ballotID)
          .then((votes) => {
            return Promise.all(votes.map(_saveVote));
          })
          .then(() => poll_id);
      });
  }

  function _saveVote({ poll_option_id, rating, ballot_id }) {
    return knex('votes').insert({ poll_option_id, rating, ballot_id });
  }

  function _buildPollObject([{ name, email, desc, url, require_name}, options, ballots]) {
    console.log('Ballots:', ballots);
    const voteCount = ballots.length;
    const poll = { name, email, desc, url, require_name, voteCount };
    poll.options = [];
    options.forEach(({ name, desc, rank, count }) => {
      poll.options.push({ name, desc, rank, count });
    });
    poll.voters = [];
    ballots.forEach(ballot => {
      poll.voters.push(ballot.voter_name);
    });
    return poll;
  };

  function _updatePollRanks(pollID) {
    return _getPollOptions(pollID)
      .then(options => {
        return _getPollBallots(pollID)
          .then(ballots => {
            return voteCounter.calculateRanks(options, ballots);
          });
      })
      .then(rankedOptions => {
        return Promise.all(rankedOptions.map(option => {
          return Promise.all([knex('poll_options').where('id', option.id).update('rank', option.rank),
            knex('poll_options').where('id', option.id).update('count', option.count)]);
        }));
      });
  };

  return { createPoll, getPoll, saveBallot };
};
