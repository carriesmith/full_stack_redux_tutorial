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

});