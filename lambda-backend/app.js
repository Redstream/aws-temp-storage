'use strict';

const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello world!'));
app.get('/mirror', (req, res) => res.send(req.toSource()));

module.exports = app;