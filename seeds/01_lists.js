
exports.seed = function(knex) {
  return knex('lists').del()
    .then(function () {
      return knex('lists').insert([
        {id: 1, name: '🌳 Life'},
        {id: 2, name: '💼 Work'},
        {id: 3, name: '🤓 Learning'}
      ])
      .then(() => {
        return knex.raw('SELECT setval(\'lists_id_seq\',(SELECT MAX(id) from "lists"))')
      });
    });
};
