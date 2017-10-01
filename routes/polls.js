'use strict';

const express = require('express');
const errors = require('../lib/custom-errors.js');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('create');
  });

  router.post("/", (req, res, next) => {
    const poll = JSON.parse(req.body.poll);
    db.createPoll(poll)
      .then(url => res.redirect(`/polls/${url}/links`))
      .catch(next);
  });

  router.get("/:id", (req, res, next) => {
    if(req.session.voter_id === req.params.id) {
      res.redirect(`/polls/${req.params.id}/results`);
    } else {
      db.getPoll(req.params.id)
        .then(poll => {
          res.locals.poll = poll;
          res.locals.id = req.params.id;
          res.render('vote');
        })
        .catch(next);
    };
  });

  router.post("/:id", (req, res, next) => {
    const voterId = req.params.id;
    req.session.voter_id = voterId;
    console.log(req.body.ballot);
    const ballot = JSON.parse(req.body.ballot);
    db.saveBallot(req.params.id, ballot)
      .then(() => res.redirect(`/polls/${req.params.id}/results`))
      .catch(next);
  });

  router.get("/:id/links", (req, res, next) => {
    db.getPoll(req.params.id)
      .then(poll => {
        res.locals.poll = poll;
        res.locals.id = req.params.id;
        res.render('links');
      })
      .catch(next);
  });

  router.get("/:id/results", (req, res, next) => {
    db.getPoll(req.params.id, 'sort')
      .then(poll => {
        res.locals.poll = poll;
        res.locals.id = req.params.id;
        res.render('results');
      })
      .catch(next);
  });

  return router;
};
