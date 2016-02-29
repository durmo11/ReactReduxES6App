import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Button from 'react-bootstrap/lib/Button';
export default React.createClass({
  mixins: [PureRenderMixin],
  getPair: function() {
    return this.props.pair || [];
  },
  isDisabled: function() {
    return !!this.props.hasVoted;
  },
  hasVotedFor: function(entry) {
    return this.props.hasVoted === entry;
  },

  render: function() {
    return <div className="voting">
      <h1>Pick your favorite movie</h1>
      {this.getPair().map(entry =>
        <Button bsStyle="default" block key={entry}
        onClick={() => this.props.vote(entry)}>
        <h1>{entry}</h1>
        {this.hasVotedFor(entry) ?
          <div className="label">Voted</div> :
        null}
      </Button>
      )}
      <div className="management">
        <Button bsStyle="danger" block ref="next"
          className="next"
          onClick={this.props.next}>
          Next Pair
        </Button>
      </div>
      <a href="/#/results">SEE RESULTS</a>
    </div>;

  }
});
