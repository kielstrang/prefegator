'use strict';

const DataHelpers = function(knex) {
  this.knex = knex;
};

DataHelpers.prototype = {
  createPoll: function(poll) {
    return this.knex('polls').insert({
      name: poll.name,
      creator_email: poll.email,
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
      option => {
        return {
          option_name: option.name,
          option_desc: option.desc,
          poll_id: pollID
        };
      });
    return this.knex('poll_options').insert(mapOptions);
  },

  getOptions: function(pollID) {
    return this.knex('poll_options')
      .select().where('poll_id', pollID)
      .orderBy('id');
  },

  getResults: function(pollID) {
    return this.knex('poll_options')
      .select().where('poll_id', pollID)
      .orderBy('rank');
  },

  getPollIDByURL: function(url) {
    return this.knex('polls')
      .select('id').where('url', url).first().pluck('id')
      .then(([id]) => id);
  },

  getOptionsByURL: function(url) {
    return this.getPollIDByURL(url)
      .then(id => this.getOptions(id));
  },

  getResultsByURL: function(url) {
    return this.getPollIDByURL(url)
      .then(id => this.getResults(id));
  },
};

module.exports = (knex) => {
  return new DataHelpers(knex);
};