const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const books = require('./routes/book');
const authors = require('./routes/author');



app.use('/api/v1',books);
app.use('/api/v1',authors);

module.exports = app;