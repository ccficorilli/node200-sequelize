const express = require('express');
const sequelize = require('sequelize');
const bodyParser = require('body-parser');
const db = require('./db/models');
const authorRoutes = require('./routes/authors');
const blogRoutes = require('./routes/blogs');

/* sequelize configuration */
db.sequelize.sync();

const app = express();


app.use(bodyParser.json());
app.use('/api/authors', authorRoutes);
app.use('/api/blogs', blogRoutes);

app.get('/', (req, res) => {
    res.status(200).send();
});

module.exports = app;