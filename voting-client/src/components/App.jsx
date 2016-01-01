import React from 'react';
import {List, Map} from 'immutable';

// the purpose of the root route component is to render all the markup
// that is common across all routes.
export default React.createClass({
	render: function(){
		return this.props.children;
	}
});