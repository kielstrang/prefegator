
const errors = require('../lib/custom-errors.js');

module.exports = (err, req, res, next) => {
  console.error('Error:', err.message);
  if(err instanceof errors.PollNotFound) {
    return res.status(err.status).send(err.message);
  }
  if(err instanceof errors.InvalidPollData) {
    return res.status(err.status).send(JSON.stringify(err.pollErrors));
  }
  if(err instanceof errors.VoteOptionNotFound) {
    return res.status(err.status).send(`Option ${err.option} not found on this poll`);
  }
  return res.status(500).send('An internal error occured');
};