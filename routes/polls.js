'use strict';

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    res.render('create');
  });

  router.post("/", (req, res) => {
    //add new poll to database
    res.redirect(`/${req.params.id}/links`);
  });

  router.get("/:id", (req, res) => {
    //add vote to database
    //calculate ranks from votes
    //load option ranks
    res.render('vote');
  });


  router.post("/:id", (req, res) => {
    //submit vote
    res.redirect(`/${req.params.id}/results`);
  });

  router.get("/:id/links", (req, res) => {
    res.render('links');
  });

  router.get("/:id/results", (req, res) => {
    res.render('results');
  });

  return router;
};
