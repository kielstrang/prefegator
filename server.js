"use strict";

require('dotenv').config();

const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();

const knexConfig = require("./knexfile");
const knex = require("knex")(knexConfig[ENV]);
const morgan = require('morgan');
const knexLogger = require('knex-logger');
const db = require('./lib/data-helpers.js')(knex);

const pollsRoutes = require('./routes/polls');
const errorHandler = require('./routes/error-handler.js');

app.use(morgan('dev'));
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

app.use('/polls', pollsRoutes(db));

app.get('/', (req, res) => {
  res.redirect('/polls');
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log('Prefegator listening on port ' + PORT);
});
