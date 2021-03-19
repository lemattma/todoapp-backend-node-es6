require('dotenv').config();

const express = require('express');
const cors = require('cors');

const knexfile = require('../knexfile');
const knex = require("knex")(knexfile);
const bookshelf = require('bookshelf')(knex);

const List = require('./models/list')
const Task = require('./models/task');

const app = express();
app.use(express.json());
app.use(cors());

app.get("/ping", (_, res) =>
    res.json({ message: "pong" })
);

app.get("/lists", (_, res) =>
    List.fetchAll().then(lists =>
        res.json(lists.toJSON())
    ).catch(err =>
        res.status(500).json({ error: err })
    )
);

app.get("/lists/:id", (req, res) =>
    List.where({ id: req.params.id }).fetch({withRelated: ['tasks']}).then(list =>
        res.json(list.toJSON())
    ).catch(err =>
        res.status(500).json({ error: err })
    )
);

app.delete("/lists/:id", (req, res) =>
    List.forge({id: req.params.id}).fetch()
        .catch(() => res.status(404).json())
        .then(list => {
            bookshelf.transaction((t) => {
                return Task.where({list_id: req.params.id}).destroy({transacting: t, require: false})
                    .then(() => {
                        return list.destroy({transacting: t})
                    })
            })
            .then(() =>  res.status(203).json())
            .catch(err => res.status(500).json({ error: err }))
    })
);

app.post("/lists", (req, res) =>
    List.forge({ name: req.body.name }).save()
        .then(list => res.status(201).json(list))
        .catch(err => res.status(400).json({error: err}))

);

app.post("/tasks", (req, res) =>
    Task.forge({
        name: req.body.name,
        description: req.body.description,
        list_id: req.body.list_id
    }).save()
        .then(task => res.status(201).json(task))
        .catch(err => res.status(400).json({error: err}))
);

app.delete("/tasks/:id", (req, res) =>
    Task.forge({id: req.params.id}).fetch()
        .catch(() => res.status(404).json())
        .then(task => {
            task.destroy();
            res.status(203).json();
        })
        .catch(err => res.status(500).json({ error: err }))
);

app.listen(process.env.PORT, () => console.log(`Server is running`));
