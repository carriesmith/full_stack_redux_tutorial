import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';

// pure ("dumb") component Voting
// fully driven by the props it is given
export const Voting = React.createClass({
	mixins: [PureRenderMixin],
	
	// getPair: function(){
	// 	return this.props.pair || [];
	// },
	// isDisabled: function(){
	// 	return !!this.props.hasVoted;
	// },
	// hasVotedFor: function(entry){
	// 	return this.props.hasVoted === entry;
	// },
	render: function(){
		return <div className='voting'>
			{this.props.winner ? 
				 <Winner ref="winner" winner={this.props.winner} /> :
				 <Vote {...this.props} />}
			</div>;
	}
});

function mapStateToProps(state){
	return {
		pair: state.getIn(['vote', pair]),
		winner: state.get('winner')
	}
}

// connected ("smart") component VotingContainer
// wraps the pure version with some logic that will keep it in
// sync with the changing state of the Redux Store.
export const VotingContainer = connect(mapStateToProps)(Voting);

export default Voting;