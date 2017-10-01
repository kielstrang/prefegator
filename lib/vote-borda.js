'use strict';

function calculateRanks(options, ballots) {
  const numOptions = options.length;

  options.forEach(option => {
    option.count = 0;
  });

  ballots.forEach(ballot => {
    console.log('Ballot:', ballot);
    ballot.votes.forEach(vote => {
      const option = options.find(option => option.id === vote.poll_option_id);
      option.count += numOptions - vote.rating + 1;
    });
  });

  options.sort((a, b) => {
    return b.count - a.count;
  });

  options.forEach((option, index) => {
    option.rank = index + 1;
  });
  console.log('Options:', options);
  return options;
}

module.exports = { calculateRanks };