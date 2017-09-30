class PollNotFound extends Error {
  constructor(url, ...params) {
    super(...params);
    this.status = 404;
    this.message = `Poll ${url} not found`;
  }
}

class InvalidPollData extends Error {
  constructor(...params) {
    super(...params);
    this.status = 400;
    this.message = 'Invalid poll data';
  }
}

function handle(req, res, error) {
  console.error('Error:', error.message);
  if(error instanceof PollNotFound || error instanceof InvalidPollData) {
    return res.status(error.status).send(error.message);
  }
  return res.status(500).send('An internal error occured');
}

module.exports = { PollNotFound, InvalidPollData, handle };