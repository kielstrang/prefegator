exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('ballots', function(table) {
      table.increments();
      table.timestamps(true, true);
      table.integer('poll_id');
      table.foreign('poll_id').references('id').inTable('polls').onDelete('CASCADE');
    }),

    knex.schema.table('votes', table => {
      table.integer('ballot_id');
      table.foreign('ballot_id').references('id').inTable('ballots').onDelete('CASCADE');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return knex.schema.table('votes', table => {
    table.dropColumn('ballot_id');
  })
    .then(() => {
      return knex.schema.dropTable('ballots');
    });
};
