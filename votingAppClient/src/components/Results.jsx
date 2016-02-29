import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {connect} from 'react-redux';
import Winner from './Winner';
import * as actionCreators from '../action_creators';

export const Results = React.createClass({
  mixins: [PureRenderMixin],
  getEntries: function() {
    return this.props.entries || [];
  },
  getVotes: function(entry) {
    if (this.props.tally && this.props.tally.has(entry)) {
      return this.props.tally.get(entry);
    }
    return 0;
  },
  render: function() {
    return this.props.winner ?
      <Winner ref="winner" winner={this.props.winner} /> :
      <div className="results">
        <div className="tally">
          {this.getEntries().map(entry =>
            <div key={entry} className="entry">
            <h1 className="entry">{entry}</h1>
            <div className="voteCount">
              {this.getVotes(entry)}
            </div>
          </div>
          )}
        </div>
      </div>;
  }
});

function mapStateToProps(state) {
  return {
    entries:state.get('entries'),
    tally: state.get('tally'),
    winner: state.get('winner')
  }
}

export const ResultsContainer = connect(
  mapStateToProps,
  actionCreators
)(Results);
