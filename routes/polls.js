"use strict";

const express = require('express');
const router = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    //render create poll interface
  });

  router.post("/", (req, res) => {
    //add new poll to database
    //redirect to /:id/links
  });

  router.get("/:id", (req, res) => {
    //render voting interface
  });


  router.post("/:id", (req, res) => {
    //submit vote
    //redirect to /:id/results
  });

  router.get("/:id/links", (req, res) => {
    //render links page
  });

  router.get("/:id/results", (req, res) => {
    //render results page
  });

  return router;
};
