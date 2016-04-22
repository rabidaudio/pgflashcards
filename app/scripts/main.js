import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';

import Flashcard from './flashcard';
import EditCards from './edit_cards';
import defaultQuestions from './default_questions';

class ViewCardApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 'home' // or 'edit'
    };
    this.onEdit = this.onEdit.bind(this);
  }
  setPage(name){
    this.setState({page: name});
  }
  onEdit(cardId, val){
    this.props.db.child(cardId).set(val);
  }

  render() {
    const cardsArray = Object.keys(this.props.cards).map( k => { return this.props.cards[k]; });
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
            ? <Flashcard cards={cardsArray} />
            : <EditCards cards={this.props.cards} onUpdate={this.onEdit} />
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

let pageId = window.location.hash.substring(1);

if(pageId.length < 1){
  pageId = (new Date()).getTime().toString();
  window.location.hash = pageId;
}

const db = new Firebase('https://pgflashcards.firebaseio.com').child(pageId);

db.once('value', snapshot => {
  let cards = snapshot.val();
  if(cards === null){
    defaultQuestions.forEach(q => {
      db.push({question: q, answer: ''});
    });
  }
  db.on('value', snapshot => {
    ReactDOM.render(<ViewCardApp db={db} cards={snapshot.val()} />, document.getElementById('container'));
  });
});
