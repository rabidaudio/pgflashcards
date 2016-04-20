'use strict';
const React = require('react');
const ReactDOM = require('react-dom');

const Flashcard = require('./flashcard');

class ViewCardApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {cards: [
        {question: "Where are the coconuts?", "answer": "idk"}
      ], index: 0};
      this.onNext.bind(this);
  }
  onNext(e) {
    this.setState({index: this.state.index+1});
  }
  getCard(){
    return this.state.cards[this.state.index];
  }
  render() {
    return (
      <div>
        <Flashcard {...this.getCard()} />
      </div>
    );
  }
}


ReactDOM.render(<ViewCardApp />, document.getElementById('content'));