'use strict';

const express = require('express');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('create');
  });

  router.post("/", (req, res) => {
    const poll = JSON.parse(req.body.poll);
    db.createPoll(poll)
      .then(url => res.redirect(`/polls/${url}/links`));
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
    db.getPoll(req.params.id)
      .then(poll => {
        res.locals.poll = poll;
        res.locals.id = req.params.id;
        res.render('links');
      });
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
