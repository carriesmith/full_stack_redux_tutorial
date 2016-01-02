import {List, Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

	it('handles SET_STATE', () => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({Trainspotting: 1})
				})
			})
		}; // close action

		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		})); // close expect

	}); // close it('handles SET_STATE'...

	it('handles SET_STATE with plain JS payload',() => {
		const initialState = Map();
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: {Trainspotting: 1}
				}
			}
		}; // close action
		const nextState = reducer(initialState, action)

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		})); // close expect

	}); // close it('handles SET_STATE with plain JS payload'...

	it('handles SET_STATE without initial state', () => {
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Trainspotting', '28 Days Later'],
					tally: {Trainspotting: 1}
				}
			}
		}; // close action
		const nextState = reducer(undefined, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		})); // close expect

	}); // close it('handles SET_STATE without initial state'...

	it('handles VOTE by setting hasVoted', () => {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		});
		const action = {type: 'VOTE', entry: 'Trainspotting'};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			},
			hasVoted: 'Trainspotting'
		}));
	}); // close it('handles VOTE by setting hasVoted'...

	it('does not set hasVoted for VOTE on invalid entry', () => {
		const state = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		});
		const action = {type: 'VOTE', entry: 'Sunshine'};
		const nextState = reducer(state, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			}
		}));

	}); // close it('does not set hasVoted for VOTE on invalid entry'...

	it('removes hasVoted on SET_STATE if pair changes', () => {
		const initialState = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			},
			hasVoted: 'Trainspotting'
		});
		const action = {
			type: 'SET_STATE',
			state: {
				vote: {
					pair: ['Sunshine', 'Slumdog Millionaire']
				}
			}
		};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Sunshine', 'Slumdog Millionaire']
			}
		}));
	}); // close it('removes hasVoted on SET_STATE if pair changes'...

});