'use strict';

const express = require('express');
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => res.send("Hello World!"));
app.all('/mirror', (req, res) => res.send({query: req.query, headers: req.headers, body: req.body}));

module.exports = app;