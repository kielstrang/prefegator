exports.seed = function(knex, Promise) {
  return knex('polls').del()
    .then(function() {
      return knex('polls').insert({ creator_email: 'gator@prefegator.com', name: 'Which is the best animal?' })
        .then(function() {
          return Promise.all([
            knex('poll_options').insert({ poll_id: 1, option_name: 'Alligator' }),
            knex('poll_options').insert({ poll_id: 1, option_name: 'Crocodile' }),
            knex('poll_options').insert({ poll_id: 1, option_name: 'Caiman' }),
          ]);
        });
    });
};
