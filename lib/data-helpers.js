'use strict';

const DataHelpers = function(knex) {
  this.knex = knex;
};

DataHelpers.prototype = {
  createPoll: function(poll) {
    return this.knex('polls').insert({
      name: poll.name,
      creator_email: poll.email,
      desc: poll.desc
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
};

module.exports = (knex) => {
  return new DataHelpers(knex);
};