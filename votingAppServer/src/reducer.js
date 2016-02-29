import {setEntries, next, restart, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_ENTRIES':
    return setEntries(state, action.entries);
  case 'VOTE':
     return vote(state, action.entry);
  case 'NEXT':
    return next(state);
  case 'RESTART':
    return restart(state);

  }
  return state;
}
