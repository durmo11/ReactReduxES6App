import {List, Map} from 'immutable';

function setState(state, newState) {
  return state.merge(newState);
}

function vote(state, entry) {
  const currentPair = state.getIn(['vote', 'pair']);
  if (currentPair && currentPair.includes(entry)) {
    return state.set('hasVoted', entry);
  } else {
    return state;
  }
}

function resetVote(state) {
  const currentPair = state.getIn(['vote', 'pair'], List());
  const hasVoted = state.get('hasVoted');
  if (hasVoted && !currentPair.includes(hasVoted)) {
    return state.remove('hasVoted');
  } else {
    return state;
  }
}

function next(state) {
  console.log("Client state on next"+state);
  const currentPair = state.getIn(['vote', 'pair'], List());
  console.log("Current Pair"+currentPair);
  const hasVoted = state.get('hasVoted');
  if (hasVoted && currentPair.includes(hasVoted)) {
    console.log("Passing through the loop"+'hasVoted');
    return state.remove('hasVoted');
  } else {
    return state;
  }
}

export default function(state = Map(), action) {
  switch (action.type) {
  case 'SET_STATE':
    return resetVote(setState(state, action.state));
  case 'VOTE':
    return vote(state, action.entry);
  case 'NEXT':
    return next(setState(vote(state,action.entry)));
  }
  return state;
}
