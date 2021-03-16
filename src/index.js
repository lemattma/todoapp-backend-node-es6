const List = require('./models/list')
require('dotenv').config();

const express = require('express');
const app = express();
app.use(express.json());

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

app.post("/lists", (req, res) =>
    List.forge({ name: req.body.name }).save()
        .then(list => res.status(201).json(list))
        .catch(err => res.status(400).json({error: err}))

);

app.listen(process.env.PORT, () => console.log(`Server is running`));
