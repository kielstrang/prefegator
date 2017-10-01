exports.up = function(knex, Promise) {
  return knex.schema.table('ballots', table => {
    table.string('voter_name');
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.table('ballots', table => {
    table.dropColumn('voter_name');
  });
};