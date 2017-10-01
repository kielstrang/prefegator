
exports.up = function(knex, Promise) {
  return knex.schema.table('poll_options', table => {
    table.integer('count');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('poll_options', table => {
    table.dropColumn('count');
  });
};
