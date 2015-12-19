import makeStore from './src/store';
import startServer from './src/server'

export const store = makeStore();
startServer(store);

// Load items to vote on.
store.dispatch({
	type: 'SET_ENTRIES',
	entries: require('data/entries.json')
});
// Initiate voting after items loaded by calling NEXT action
store.dispatch({type: 'NEXT'});