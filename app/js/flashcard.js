'use strict';
var React = require('react');

var Flashcard = React.createClass({
  getInitialState: function() {
    return {front: true}
  },
  flip: function() {
    this.setState({front: !this.state.front});
  },
  componentDidMount: function(){
    key('space', this.flip);
  },
  componentWillUnmount: function(){
    key.unbind('space');
  },
  render: function() {
    return (
      <h1 onClick={this.flip}>
          {this.state.front ? this.props.question : this.props.answer}
      </h1>
    );
  }
});

module.exports = Flashcard;