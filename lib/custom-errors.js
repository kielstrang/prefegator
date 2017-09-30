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

module.exports = { PollNotFound, InvalidPollData };