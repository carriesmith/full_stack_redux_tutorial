import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import Vote from './Vote';
import * as actionCreators from '../action_creators';

// pure ("dumb") component Voting
// fully driven by the props it is given
export const Voting = React.createClass({
	mixins: [PureRenderMixin],
	
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
		pair: state.getIn(['vote', 'pair']),
		hasVoted: state.get('hasVoted'),
		winner: state.get('winner')
	}
}

// connected ("smart") component VotingContainer
// wraps the pure version with some logic that will keep it in
// sync with the changing state of the Redux Store.
export const VotingContainer = connect(
	mapStateToProps,
	actionCreators)(Voting);

export default Voting;