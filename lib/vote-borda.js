'use strict';

function calculateRanks(options, votes) {
  const numOptions = options.length;
  votes.forEach(vote => {
    const option = options.find(option => option.id === vote.poll_option_id);
    if(!option.count) option.count = 0;
    option.count += numOptions - vote.rating + 1;
  });

  options.sort((a, b) => {
    return b.count - a.count;
  });

  options.forEach((option, index) => {
    option.rank = index + 1;
  });
  return options;
}

module.exports = { calculateRanks };