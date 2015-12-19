import {List, Map} from 'immutable';
import {expect} from 'chai';
import {setEntries, next, vote} from '../src/core';

describe('application logic', () => {

	describe('setEntries', () => {

		it('adds the entries to the state', () => {
			const state = Map();
			const entries = List.of('Trainspotting', '28 Days Later');
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));
		});

		it('converts to immutable', () => {
			const state = Map();
			const entries = ['Trainspotting', '28 Days Later'];
			const nextState = setEntries(state, entries);

			expect(nextState).to.equal(Map({
				entries: List.of('Trainspotting', '28 Days Later')
			}));		
		});

	});

	describe('next', () => {

		it('takes the next two entries under vote', () => {

			const state = Map({
				entries: List.of('Trainspotting', '28 Days Later', 'Sunshine')
			});
			const nextState = next(state);

			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List.of('Sunshine')
			}));

		});

		it('puts winner of current vote back to entries', () => {

			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later':2
						})
					}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
				});
			const nextState = next(state);

			expect(nextState).to.equal(
					Map({
						vote: Map({
							pair: List.of('Sunshine', 'Millions')
						}),
						entries: List.of('127 Hours', 'Trainspotting')
					})
				); // end expect

		});

		it('puts both entries of a tied vote back to entries', () => {

			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 4
						})
					}),
				entries: List.of('Sunshine', 'Millions', '127 Hours')
				});
			const nextState = next(state);

			expect(nextState).to.equal(
					Map({
						vote: Map({
							pair: List.of('Sunshine', 'Millions')
						}),
						entries: List.of('127 Hours', 'Trainspotting', '28 Days Later')
					})
				); // end expect

		});

		it('marks winner when just one entry is left', () => {
			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 4,
						'28 Days Later': 2
					})
				}),
				entries: List()
			}); // end state
			const nextState = next(state);
			expect(nextState).to.equal(Map({
				winner: 'Trainspotting'
			}));

		}); // end test

	});

	describe('vote', () =>  {

		it('creates a tally for the voted entry', () => {

			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later')
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Trainspotting': 1
					})
				}),
				entries: List()
			}));

		});

		it('adds one to tally for existing voted entry', () => {

			const state = Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Sunshine': 4,
						'Trainspotting': 1
					})
				}),
				entries: List()
			});
			const nextState = vote(state, 'Trainspotting');
			expect(nextState).to.equal(Map({
				vote: Map({
					pair: List.of('Trainspotting', '28 Days Later'),
					tally: Map({
						'Sunshine': 4,
						'Trainspotting': 2
					})
				}),
				entries: List()
			}));

		});

	});

});