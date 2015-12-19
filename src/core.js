
import {List, Map} from 'immutable';

export function setEntries(state, entries){
	return state.set('entries', List(entries));
}

export function next(state){

	const entries = state.get('entries');
	return state.merge({
		vote: Map({pair: entries.take(2)}),
		entries: entries.skip(2)
	});

}

export function vote(state, winner){

	// This works, but is hideous! :)
	// return state.merge({
	// 	vote: state.get('vote').merge({
	// 		tally: state.get('vote').get('tally', Map()).merge( Map(
	// 				[[winner, state.get('vote').get('tally', Map()).get(winner, 0) + 1]]
	// 			)
	// 		)
	// 	})
	// });

	return state.updateIn(
		['vote', 'tally', winner],
		0,
		count => count + 1
	);

}