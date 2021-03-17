
exports.seed = function(knex) {
  return knex('tasks').del()
    .then(function () {
      return knex('tasks').insert([
        // {id: 1, name: 'Life'},
        {id: 1, list_id: 1, name: 'Renew licence'},
        {id: 2, list_id: 1, name: 'Grocery list'},
        {id: 3, list_id: 1, name: 'Doc appointment'},
        // {id: 2, name: 'Work'},
        {id: 4, list_id: 2, name: 'Call client'},
        {id: 5, list_id: 2, name: 'Send proposal'},
        // {id: 3, name: 'Learning'}
        {id: 6, list_id: 3, name: 'Todoapp project planning'}
      ]);
    });
};
