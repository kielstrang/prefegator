class PollNotFound extends Error {
  constructor(url, ...params) {
    super(...params);
    this.status = 404;
    this.message = `Poll ${url} not found`;
  }
}

class InvalidPollData extends Error {
  constructor(pollErrors, ...params) {
    super(...params);
    this.status = 400;
    this.pollErrors = pollErrors;
  }
}

class VoteOptionNotFound extends Error {
  constructor(option, ...params) {
    super(...params);
    this.status = 400;
    this.option = option;
  }
}

module.exports = { PollNotFound, InvalidPollData, VoteOptionNotFound };