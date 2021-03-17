const knexfile = require('../../knexfile');
const knex = require("knex")(knexfile);
const bookshelf = require('bookshelf')(knex);
const List = require('./list');
// bookshelf.plugin('registry');

const Task = bookshelf.Model.extend({
    tableName: 'tasks',
    list: function() {
        return this.belongsTo(List);
    }
});

module.exports = Task;
