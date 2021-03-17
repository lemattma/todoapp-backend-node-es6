const knexfile = require('../../knexfile');
const knex = require("knex")(knexfile);
const bookshelf = require('bookshelf')(knex);
const Task = require('./task');
// bookshelf.plugin('registry');

const List = bookshelf.Model.extend({
    tableName: 'lists',
    tasks: function() {
        return this.hasMany(Task);
    }
});

module.exports = List;
