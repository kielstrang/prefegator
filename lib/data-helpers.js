'use strict';

const DataHelpers = function(knex) {
  this.knex = knex;
};

DataHelpers.prototype = {
  createPoll: function({ name, email, desc, url, options }) {
    return this.knex('polls').insert({ name, email, desc, url })
      .returning('id')
      .then(([id]) => {
        return this._createPollOptions(id, options);
      });
  },

  getPoll: function(url, sort = false) {
    return this._getPollIDByURL(url)
      .then(id => {
        return Promise.all([
          this._getPollInfo(id),
          this._getPollOptions(id, sort)
        ]);
      })
      .then(([{ name, email, desc, url }, options]) => {
        const poll = { name, email, desc, url };
        poll.options = [];
        options.forEach(({ name, desc, rank }) => {
          poll.options.push({ name, desc, rank });
        });
        return poll;
      });
  },

  _createPollOptions: function(poll_id, options) {
    const mapOptions = options.map(
      ({ name, desc, rank }) => ({ name, desc, rank, poll_id }));
    return this.knex('poll_options').insert(mapOptions);
  },

  _getPollIDByURL: function(url) {
    return this.knex('polls')
      .select('id').where('url', url).first().pluck('id')
      .then(([id]) => id);
  },

  _getPollInfo: function(pollID) {
    return this.knex('polls')
      .select().where('id', pollID).first();
  },

  _getPollOptions: function(pollID, sort = false) {
    return this.knex('poll_options')
      .select().where('poll_id', pollID)
      .orderBy(sort ? 'rank' : 'id');
  },
};

module.exports = (knex) => {
  return new DataHelpers(knex);
};