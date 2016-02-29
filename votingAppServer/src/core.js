import {List, Map} from 'immutable';
import Combinatorics from 'js-combinatorics';
export const INITIAL_STATE = Map();

export function setEntries(state, entries) {
  console.log("Set Entries is:"+state);
  const list = List(entries);
  return state.set('entries', list)
}

export function next(state, round = state.getIn(['vote', 'round'], 0)) {
  const entries = state.get('entries');
  const tally=state.getIn(['vote', 'tally']);
  let entriesArray=entries.toArray();
  let cmb = Combinatorics.combination(entriesArray, 2);
  let pairsAll=cmb.toArray();
  console.log("All pairs length: "+pairsAll.length);
  if (round==pairsAll.length) {
    return state.remove('vote')
                .remove('entries')
                .set('winner', entries.first());
  } else {
  let nextState=state.merge({
    vote: Map({
      round: round + 1,
      pair: pairsAll[round]
    })
  });
    console.log("Next state is: "+nextState);
    return nextState
  }
}

export function restart(state) {
  const round = state.getIn(['vote', 'round'], 0);
  console.log("Restarted state is: ", state);
  return next(
    state.set('entries', state.get('entries'))
         .remove('vote')
         .remove('winner'),
    round
  );
}

export function vote(voteState, entry) {
  if (voteState.getIn(['vote','pair']).includes(entry)) {
    let updatedVoteState=voteState.updateIn(['tally', entry], 0, t => t + 1);
    console.log("Vote State is: "+updatedVoteState);
    return updatedVoteState
  } else {
    console.log("Unupdated vote state is: ", voteState);
    return voteState;
  }
}
