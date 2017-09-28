"use strict";

require('dotenv').config();

const knexConfig = require("../knexfile");
const ENV = process.env.ENV || "development";
const knex = require("knex")(knexConfig[ENV]);

const db = require('../lib/data-helpers.js')(knex);

db.getOptionsByURL('qwerty')
  .then((options) => {
    console.log('getOptionsByURL:');
    options.forEach((option) => {
      console.log(option.option_name);
    });
  });

db.getResultsByURL('qwerty')
  .then((options) => {
    console.log('getResultsByURL:');
    options.forEach((option) => {
      console.log(option.option_name);
    });
  });