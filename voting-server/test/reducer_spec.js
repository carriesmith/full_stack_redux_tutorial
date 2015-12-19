import {Map, fromJS} from 'immutable';
import {expect} from 'chai';

import reducer from '../src/reducer';

describe('reducer', () => {

	it('handles SET_ENTRIES', () => {
		const initialState = Map();
		const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			entries: ['Trainspotting']
		}));
	}); // end handles SET_ENTRIES test

	it('handles NEXT', () => {
		const initialState = fromJS({
			entries: ['Trainspotting', '28 Days Later']
		});
		const action = {type: 'NEXT'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later']
			},
			entries: []
		}));
	}); // end handles NEXT

	it('handles VOTE', () => {
		const initialState = fromJS({
			vote: {
				pair: ['Trainspotting', '28 Days Later']
			},
			entries: []
		});
		const action = {type: 'VOTE', choice: 'Trainspotting'};
		const nextState = reducer(initialState, action);

		expect(nextState).to.equal(fromJS({
			vote:{
				pair: ['Trainspotting', '28 Days Later'],
				tally: {Trainspotting: 1}
			},
			entries: []
		}));
	}); // end handles VOTE

	it('has an initial state', () => {
		const action = {type: 'SET_ENTRIES', entries: ['Trainspotting']};
		const nextState = reducer(undefined, action);
		expect(nextState).to.equal(fromJS({
			entries: ['Trainspotting']
		}));
	}); // end it has an initial state

	it('can be used with reduce', () => {
		const actions = [
			{type: 'SET_ENTRIES', entries: ['Trainspotting', '28 Days Later']},
			{type: 'NEXT'},
			{type: 'VOTE', choice: 'Trainspotting'},
			{type: 'VOTE', choice: '28 Days Later'},
			{type: 'VOTE', choice: 'Trainspotting'},
			{type: 'NEXT'}
		];
		const finalState = actions.reduce(reducer, Map());

		expect(finalState).to.equal(fromJS({
			winner: 'Trainspotting'
		}));
	}); // end it can be used with reduce

}); // end describe reducer