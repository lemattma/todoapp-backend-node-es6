
exports.up = function(knex) {
    return knex.schema.createTable('tasks', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.text('description');
        table.boolean('done').defaultTo(false);
        table.boolean('today').defaultTo(false);
        table.datetime('due_date');
        table.integer('list_id').references('lists.id');

        table.index('done');
        table.index('today');
        table.index('due_date');
        table.index('list_id');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('tasks');
};
