import React from 'react';
import ReactDOM from 'react-dom';
import {Route} from 'react-router';
import App from './components/App';
import Voting from './components/Voting';

const pair = ['Trainspotting', '28 Days Later'];

// Router comes with the React component called Route
// which can be used to declaratively define a routing table.
const routes = <Route component={App}>
					<Route path="/results" component={Results} />
					<Route path="/" component={Voting} />
				</Route>;

ReactDOM.render(
	<Router>{routes}</Router>,
	document.getElementById('app')
);