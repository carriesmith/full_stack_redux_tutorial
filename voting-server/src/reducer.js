import {setEntries, next, vote, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action){
	switch (action.type){
		case 'SET_ENTRIES':
			return setEntries(state, action.entries);
		case 'NEXT':
			return next(state);
		case 'VOTE':
			// The main reducer function only hands parts of the state 
			// to lower-level reducer functions.

			// TODO: look this up
			return state.update('vote',
				voteState => vote(voteState, action.entry));
	}
	return state;
}