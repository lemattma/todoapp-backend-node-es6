const knexfile = require('../../knexfile');
const knex = require("knex")(knexfile);
const bookshelf = require('bookshelf')(knex);
// bookshelf.plugin('registry');

const List = bookshelf.Model.extend({
    tableName: 'lists'
});

module.exports = List;
