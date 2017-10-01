'use strict';
function incrementOptionCount(id, options) {
  const option = options.find(option => option.id === id);
  option.count += 1;
}

function getHighestVoteNotEliminated(ballot, eliminated) {
  for(const vote of ballot.votes) {
    if(!eliminated.includes(vote.poll_option_id)) return vote.poll_option_id;
  }
}

function getOptionToEliminate(options, eliminated) {
  let minCount = Number.POSITIVE_INFINITY;
  let optionToEliminate = null;
  for(const option of options) {
    if(option.count < minCount && !eliminated.includes(option.id)) {
      optionToEliminate = option;
    }
  }
  return optionToEliminate;
}

function calculateRanks(options, ballots) {

  options.forEach(option => {
    option.count = 0;
  });

  ballots.forEach(ballot => {
    ballot.votes.sort((a, b) => {
      return a.rating - b.rating;
    });
    const topChoice = ballot.votes[0].poll_option_id;
    incrementOptionCount(topChoice, options);
    ballot.assignment = topChoice;
  });

  const eliminated = [];

  while(eliminated.length < options.length - 2) {
    const lowest = getOptionToEliminate(options, eliminated);
    eliminated.push(lowest.id);
    ballots.forEach(ballot => {
      if(ballot.assignment === lowest.id) {
        const newAssignment = getHighestVoteNotEliminated(ballot, eliminated);
        if(newAssignment) {
          ballot.assignment = newAssignment;
          incrementOptionCount(newAssignment, options);
        }
      }
    });
  }

  options.sort((a, b) => {
    return b.count - a.count;
  });

  options.forEach((option, index) => {
    option.rank = index + 1;
  });
  return options;
}

module.exports = { calculateRanks };