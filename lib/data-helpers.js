'use strict';

const DataHelpers = function(knex) {
  this.knex = knex;
};

DataHelpers.prototype = {
  createPoll: function(poll) {
    return this.knex('polls').insert({
      name: poll.name,
      email: poll.email,
      desc: poll.desc,
      url: poll.url
    })
      .returning('id')
      .then(id => {
        return this.createOptions(id[0], poll.options);
      });
  },

  createOptions: function(pollID, options) {
    const mapOptions = options.map(
      option => ({
        name: option.name,
        desc: option.desc,
        poll_id: pollID
      }));
    return this.knex('poll_options').insert(mapOptions);
  },

  getPollIDByURL: function(url) {
    return this.knex('polls')
      .select('id').where('url', url).first().pluck('id')
      .then(([id]) => id);
  },

  getPollInfo: function(pollID) {
    return this.knex('polls')
      .select().where('id', pollID).first();
  },

  getPollInfoByURL: function(url) {
    return this.getPollIDByURL(url)
      .then(id => this.getPollInfo(id));
  },

  getOptions: function(pollID) {
    return this.knex('poll_options')
      .select().where('poll_id', pollID)
      .orderBy('id');
  },

  getOptionsByURL: function(url) {
    return this.getPollIDByURL(url)
      .then(id => this.getOptions(id));
  },

  getResults: function(pollID) {
    return this.knex('poll_options')
      .select().where('poll_id', pollID)
      .orderBy('rank');
  },

  getResultsByURL: function(url) {
    return this.getPollIDByURL(url)
      .then(id => this.getResults(id));
  },
};

module.exports = (knex) => {
  return new DataHelpers(knex);
};