exports.seed = function(knex, Promise) {
  const db = require('../../lib/data-helpers.js')(knex);
  return knex('polls').del()
    .then(() => {
      const poll = {
        name: 'Which is the best animal?',
        email: 'gator@prefegator.com',
        desc: '',
        url: 'qwerty',
        options: [
          { name: 'Alligator', desc: ''},
          { name: 'Crocodile', desc: ''},
          { name: 'Caiman', desc: ''}
        ]
      };

      return db.createPoll(poll);
    })
    .then(() => {
      const ballot = ["Alligator", "Caiman", "Crocodile"];
      return db.saveBallot('qwerty', ballot);
    });
};
