'use strict';

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

  function saveVote(url, votes) {
    return _getPollIDByURL(url)
      .then(_getPollOptions)
      .then(options => {
        console.log(options);
        //verify that votes has the correct number of options -> else fail
        //for each vote in votes:
        //  verify that corresponding option exists -> else fail
        //  save vote in votes table

        //call updateVotes
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

  function _buildPollObject([{ name, email, desc, url }, options]) {
    const poll = { name, email, desc, url };
    poll.options = [];
    options.forEach(({ name, desc, rank }) => {
      poll.options.push({ name, desc, rank });
    });
    return poll;
  };

  function _updateVotes(pollID) {
    //get poll options
    //get votes for each option
    //process votes
    //save new ranks
  };

  return { createPoll, getPoll, saveVote };
};
