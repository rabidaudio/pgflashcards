import React from 'react';
import ReactDOM from 'react-dom';

import Flashcard from './flashcard';
import EditCards from './edit_cards';
import data from './data';

class ViewCardApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home' // or 'edit'
    };
  }
  setPage(name){
    this.setState({page: name});
  }

  render() {
    var cards = data;
    // var cards = [
    //   // {question: 'What is your name?', answer: 'Sir Lancelot of Camelot'},
    //   // {question: 'What is your quest?', answer: 'To seek the Holy Grail'},
    //   // {question: 'What is your favorite color?', answer: 'Blue'},
    // ];
    return (
      <div className="container">
        <div className="header">
          <ul className="nav nav-pills pull-right">
            <li className={this.state.page === 'home' ? 'active' : null}>
              <a onClick={()=> this.setPage('home')} href="#">Home</a>
            </li>
            <li className={this.state.page === 'edit' ? 'active' : null}>
              <a onClick={()=> this.setPage('edit')} href="#">Edit Cards</a>
            </li>
          </ul>
          <h3 className="text-muted">Paul Graham Flashcards</h3>
        </div>

        {
          this.state.page === 'home'
            ? <Flashcard cards={cards} />
            : <EditCards cards={cards} />
        }

        <div className="footer">
          <p>
            <a href="https://twitter.com/charlesjuliank"><code>@charlesjuliank</code></a>
          </p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ViewCardApp />, document.getElementById('container'));
