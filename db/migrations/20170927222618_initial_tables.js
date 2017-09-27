
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('users'),

    knex.schema.createTable('polls', table => {
      table.increments();
      table.timestamps(true, true);
      table.string('name');
      table.string('creator_email');
      table.string('desc');
    }),

    knex.schema.createTable('poll_options', table => {
      table.increments();
      table.timestamps(true, true);
      table.integer('poll_id');
      table.foreign('poll_id').references('id').inTable('polls').onDelete('CASCADE');
      table.string('option_name');
      table.string('option_desc');
      table.integer('rank');
    }),

    knex.schema.createTable('votes', table => {
      table.increments();
      table.timestamps(true, true);
      table.integer('poll_option_id');
      table.foreign('poll_option_id').references('id').inTable('poll_options').onDelete('CASCADE');
      table.integer('rating');
      table.string('voter');
    }),
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('votes'),
    knex.schema.dropTable('poll_options'),
    knex.schema.dropTable('polls'),

    knex.schema.createTable('users', table => {
      table.increments();
      table.string('name');
    })
  ]);
};
