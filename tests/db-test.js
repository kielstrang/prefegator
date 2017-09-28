"use strict";

require('dotenv').config();

const knexConfig = require("../knexfile");
const ENV = process.env.ENV || "development";
const knex = require("knex")(knexConfig[ENV]);

const db = require('../lib/data-helpers.js')(knex);

db.getOptions(15)
  .then((options) => {
    console.log('getPollOptions:');
    options.forEach((option) => {
      console.log(option.option_name);
    });
  });

db.getResults(15)
  .then((results) => {
    console.log('getPollResults:');
    results.forEach((result) => {
      console.log(result.option_name);
    });
  });