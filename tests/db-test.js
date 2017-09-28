"use strict";

require('dotenv').config();

const knexConfig = require("../knexfile");
const ENV = process.env.ENV || "development";
const knex = require("knex")(knexConfig[ENV]);

const db = require('../lib/data-helpers.js')(knex);

db.getPollIDByURL('qwerty')
  .then(id => {
    console.log(id);
    db.getOptions(id)
      .then((options) => {
        console.log('getOptions:');
        options.forEach((option) => {
          console.log(option.option_name);
        });
      });

    db.getResults(id)
      .then((results) => {
        console.log('getResults:');
        results.forEach((result) => {
          console.log(result.option_name);
        });
      });
  });

db.getOptionsByURL('qwerty')
  .then((options) => {
    console.log('getOptionsByURL:');
    options.forEach((option) => {
      console.log(option.option_name);
    });
  });

db.getResultsByURL('qwerty')
  .then((options) => {
    console.log('getOptionsByURL:');
    options.forEach((option) => {
      console.log(option.option_name);
    });
  });