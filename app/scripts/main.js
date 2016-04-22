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
    this.onAdd = this.onAdd.bind(this);
    this.onDestroy = this.onDestroy.bind(this);
  }
  setPage(name){
    this.setState({page: name});
  }
  onEdit(cardId, val){
    this.props.db.child(cardId).set(val);
  }
  onAdd(){
    this.props.db.push({question: '', answer: ''});
  }
  onDestroy(cardId){
    this.props.db.child(cardId).remove();
  }

  render() {
    const cardsArray = Object.keys(this.props.cards).map( k => { return this.props.cards[k]; });
    return (
      <div className="container">
        <div className="header">
          <ul className="nav nav-pills pull-right">
            <li className={this.state.page === 'home' ? 'active' : null}>
              <a onClick={()=> this.setPage('home')}>Home</a>
            </li>
            <li className={this.state.page === 'edit' ? 'active' : null}>
              <a onClick={()=> this.setPage('edit')}>Edit Cards</a>
            </li>
          </ul>
          <h4 className="text-muted">PG Flashcards</h4>
        </div>

        {
          this.state.page === 'home'
            ? <Flashcard cards={cardsArray} />
            : <EditCards cards={this.props.cards} onUpdate={this.onEdit} onAdd={this.onAdd} onDestroy={this.onDestroy} />
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
    ReactDOM.render(<ViewCardApp db={db} cards={snapshot.val() || []} />, document.getElementById('container'));
  });
});
