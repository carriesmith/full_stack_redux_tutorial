import React from 'react';
import {List} from 'immutable';

const pair = List.of('Trainspotting', '28 Days Later');

// the purpose of the root route component is to render all the markup
// that is common across all routes.
export default React.createClass({
	render: function(){
		return React.cloneElement(this.props.children, {pair: pair});
	}
});