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
          { name: 'Alligator', desc: '', rank: 2 },
          { name: 'Crocodile', desc: '', rank: 3 },
          { name: 'Caiman', desc: '', rank: 1 }
        ]
      };

      return db.createPoll(poll);
    })
    .then(() => {
      const ballot = ["Alligator", "Caiman", "Crocodile"];
      return db.saveBallot('qwerty', ballot);
    });
};
