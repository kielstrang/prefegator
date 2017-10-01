exports.up = function(knex, Promise) {
  return knex.schema.table('polls', table => {
    table.boolean('require_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('polls', table => {
    table.dropColumn('require_name');
  });
};
