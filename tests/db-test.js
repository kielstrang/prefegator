"use strict";

require('dotenv').config();

const knexConfig = require("../knexfile");
const ENV = process.env.ENV || "development";
const knex = require("knex")(knexConfig[ENV]);

const db = require('../lib/data-helpers.js')(knex);

// db.getPoll('qwerty')
//   .then(poll => {
//     console.log(poll);
//   });

// db.getPoll('qwerty', 'sort')
//   .then(poll => {
//     console.log(poll);
//   });

const votes = [
  { name: 'Alligator', rating: 1 },
  { name: 'Crocodile', rating: 2 },
  { name: 'Caiman', rating: 3 },
  { name: 'Troll', rating: 3 },
];
db.saveVote('qwerty', votes)
  .then(res => {
    console.log(res);
  });