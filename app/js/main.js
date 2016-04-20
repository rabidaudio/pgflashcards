var React = require('react');
var ReactDOM = require('react-dom');

var Flashcard = require('./flashcard')

var ViewCardApp = React.createClass({
  getInitialState: function() {
    return {cards: [
        {question: "Where are the coconuts?", "answer": "idk"}
      ], index: 0}
  },

  onNext: function(e) {
    this.setState({index: this.state.index+1});
  },


  render: function() {
    var card = this.state.cards[this.state.index];
    return (
      <div>
        <Flashcard {...card} />
      </div>
    );
  }
});


ReactDOM.render(<ViewCardApp />, document.getElementById('content'));