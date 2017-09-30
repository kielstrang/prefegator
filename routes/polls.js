'use strict';

const express = require('express');
const errors = require('../lib/custom-errors.js');
const router = express.Router();

module.exports = (db) => {

  router.get("/", (req, res) => {
    res.render('create');
  });

  router.post("/", (req, res) => {
    const poll = JSON.parse(req.body.poll);
    db.createPoll(poll)
      .then(url => res.redirect(`/polls/${url}/links`))
      .catch((error) => errors.handle(req, res, error));
  });

  router.get("/:id", (req, res) => {
    db.getPoll(req.params.id)
      .then(poll => {
        res.locals.poll = poll;
        res.locals.id = req.params.id;
        res.render('vote');
      })
      .catch((error) => errors.handle(req, res, error));
  });

  router.post("/:id", (req, res) => {
    const ballot = JSON.parse(req.body.ballot);
    db.saveBallot(req.params.id, ballot)
      .then(() => res.redirect(`/polls/${req.params.id}/results`))
      .catch((error) => errors.handle(req, res, error));
  });

  router.get("/:id/links", (req, res) => {
    db.getPoll(req.params.id)
      .then(poll => {
        res.locals.poll = poll;
        res.locals.id = req.params.id;
        res.render('links');
      })
      .catch((error) => errors.handle(req, res, error));
  });

  router.get("/:id/results", (req, res) => {
    db.getPoll(req.params.id, 'sort')
      .then(poll => {
        res.locals.poll = poll;
        res.locals.id = req.params.id;
        res.render('results');
      })
      .catch((error) => errors.handle(req, res, error));
  });

  return router;
};
