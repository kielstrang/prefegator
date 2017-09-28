
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('polls', table => {
      table.renameColumn('creator_email', 'email');
    }),
    knex.schema.table('poll_options', table => {
      table.renameColumn('option_name', 'name');
      table.renameColumn('option_desc', 'desc');
    })
  ]);
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.table('polls', table => {
      table.renameColumn('email', 'creator_email');
    }),
    knex.schema.table('poll_options', table => {
      table.renameColumn('desc', 'option_desc');
      table.renameColumn('name', 'option_name');
    })
  ]);
};
