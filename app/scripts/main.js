import React from 'react';
import ReactDOM from 'react-dom';

import Flashcard from './flashcard';

class ViewCardApp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var cards = [
      {question: 'What is your name?', answer: 'Sir Lancelot of Camelot'},
      {question: 'What is your quest?', answer: 'To seek the Holy Grail'},
      {question: 'What is your favorite color?', answer: 'Blue'},
    ];
    return (<Flashcard cards={cards} />);
  }
}

ReactDOM.render(<ViewCardApp />, document.getElementById('content'));