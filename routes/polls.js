'use strict';

const express = require('express');
const router = express.Router();

const URL_LENGTH = 8;
function makePollURL(length) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(var i = 0; i < length; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('create');
  });

  router.post("/", (req, res) => {
    const poll = JSON.parse(req.body.poll);
    poll.url = makePollURL(URL_LENGTH);
    db.createPoll(poll)
      .then(res.redirect(`/polls/${poll.url}/links`));
  });

  router.get("/:id", (req, res) => {
    db.getPoll(req.params.id)
      .then(poll => {
        res.locals.poll = poll;
        res.locals.id = req.params.id;
        res.render('vote');
      });
  });


  router.post("/:id", (req, res) => {
    const ballot = JSON.parse(req.body.ballot);
    db.saveBallot(req.params.id, ballot)
      .then(() => {
        res.redirect(`/polls/${req.params.id}/results`);
      });
  });

  router.get("/:id/links", (req, res) => {
    res.locals.id = req.params.id;
    res.render('links');
  });

  router.get("/:id/results", (req, res) => {
    db.getPoll(req.params.id, 'sort')
      .then(poll => {
        res.locals.poll = poll;
        res.locals.id = req.params.id;
        res.render('results');
      });
  });

  return router;
};
