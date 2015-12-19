
import {List, Map} from 'immutable';

export const INITIAL_STATE = Map();

export function setEntries(state, entries){
	return state.set('entries', List(entries));
}

function getWinners(vote){
	if (!vote) return [];
	const [a,b] = vote.get('pair');
	const aVotes = vote.getIn(['tally', a], 0);
	const bVotes = vote.getIn(['tally', b], 0);
	if (aVotes > bVotes)
		return [a];
	else if (aVotes < bVotes)
		return [b];
	else
		return [a,b];
}

export function next(state){

	const entries = state.get('entries')
				.concat(getWinners(state.get('vote')));
	if (entries.size === 1)
		// // Could simply return what is desired now
		// // but to 'future proof' (e.g. in case later
		// // decide to maintain additional data in state)
		// // instead morph state to the desired return value.
		// return Map({
		// 	winner: entries.first()
		// });
		return state.remove('vote')
					.remove('entries')
					.set('winner', entries.first());
	return state.merge({
		vote: Map({pair: entries.take(2)}),
		entries: entries.skip(2)
	});

}

export function vote(voteState, choice){

	// This works, but is hideous! :)
	// return state.merge({
	// 	vote: state.get('vote').merge({
	// 		tally: state.get('vote').get('tally', Map()).merge( Map(
	// 				[[winner, state.get('vote').get('tally', Map()).get(winner, 0) + 1]]
	// 			)
	// 		)
	// 	})
	// });

	return voteState.updateIn(
		['tally', choice],
		0,
		count => count + 1
	);

}