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
    if(this.props.db){
      this.props.db.child(cardId).set(val);
    // }else{
      // let state = JSON.parse(window.localStorage[pageId]);
      // state[cardId] = val;
      // window.localStorage[pageId] = JSON.stringify(state);
    }
  }
  onAdd(){
    const newItem = {question: '', answer: ''};
    if(this.props.db){
      this.props.db.push(newItem);
    // }else{
      // let state = JSON.parse(window.localStorage[pageId]);
      // state.push(newItem);
      // window.localStorage[pageId] = JSON.stringify(state);
    }
  }
  onDestroy(cardId){
    if(this.props.db){
      this.props.db.child(cardId).remove();
    }else{
      let state = JSON.parse(window.localStorage[pageId]);
      state[cardId] = undefined;
      window.localStorage[pageId] = JSON.stringify(state);
    }
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

let pageId = window.location.pathname.substring(1); //.hash.substring(1);

if(pageId.length < 1){
  pageId = (new Date()).getTime().toString();
  window.location.pathname = pageId; //.hash = pageId;
}

const fb = new Firebase('https://pgflashcards.firebaseio.com');

fb.child('.info/connected').on('value', snapshot => {
  if(!snapshot.val()){
    console.warn('No connection, falling back to local storage');
    const state = window.localStorage[pageId];
    if(state){
      render(JSON.parse(state));
    }else{
      render([]);
    }
  }else{
    console.log('connected to Firebase');
  }
});

const db = fb.child(pageId);

function render(cards){
  ReactDOM.render(<ViewCardApp db={db} cards={cards || []} />, document.getElementById('container'));
}

db.once('value', firstSnapshot => {
  let firstCards = firstSnapshot.val();
  if(firstCards === null){
    defaultQuestions.forEach(q => {
      db.push({question: q, answer: ''});
    });
  }
  db.on('value', snapshot => {
    const cards = snapshot.val();
    localStorage[pageId] = JSON.stringify(cards);
    render(cards);
  });
});
