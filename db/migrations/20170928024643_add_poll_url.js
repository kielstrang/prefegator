
exports.up = function(knex, Promise) {
  return knex.schema.table('polls', table => {
    table.string('url');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('polls', table => {
    table.dropColumn('url');
  });
};
