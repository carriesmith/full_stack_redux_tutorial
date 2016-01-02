import React from 'react';
import ReactDOM from 'react-dom';
import Router, {Route} from 'react-router';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results'

const store = createStore(reducer);

const socket = io(`${location.protocol}//${location.hostname}:8090`);
socket.on('state', state =>
  store.dispatch(setState(state))
);

// Router comes with the React component called Route
// which can be used to declaratively define a routing table.
const routes = <Route component={App}>
					<Route path="/results" component={ResultsContainer} />
					<Route path="/" component={VotingContainer} />
				</Route>;

ReactDOM.render(
	// wrap top-level application component inside a react-redux Provider component
	// this connects the component tree to a Redux store
	// enabling mappings for individual components
	// Provider ancestor to all application components
	<Provider store={store}>
		<Router>{routes}</Router>
	</Provider>,
	document.getElementById('app')
);