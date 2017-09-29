'use strict';

const express = require('express');
const router = express.Router();

function makePollURL(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('create');
  });

  router.post("/", (req, res) => {
    const poll = JSON.parse(req.body.poll);
    poll.url = makePollURL(8);
    db.createPoll(poll);
    res.redirect(`/${poll.url}/links`);
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
