import React from 'react';
import key from 'keyboard-shortcut';

import SwipeListener from './swipe_listener';

// A mod that respects negative numbers
function mod(n, m) {
  return ((n % m) + m) % m;
}

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {front: true, index: 0};
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.flip = this.flip.bind(this);
  }
  componentWillMount(){
    key('space', this.flip);
    key('left', this.prev);
    key('right', this.next);
  }
  componentWillUnmount(){
    key('space', null);
    key('left', null);
    key('right', null);
  }

  getCard(){
    return this.props.cards[this.state.index];
  }
  flip(){
    this.setState({front: !this.state.front});
  }
  cycleBy(amount){
    this.setState({front: true, index: mod(this.state.index + amount, this.props.cards.length)});
  }
  next(){
    this.cycleBy(1);
  }
  prev(){
    this.cycleBy(-1);
  }

  render() {
    const card = this.getCard();
    let classes = "flashcard";
    if(!this.state.front){
      classes += " back";
    }
    return (
      <SwipeListener onSwipeLeft={this.next} onSwipeRight={this.prev} onClick={this.flip}>
        <div className={classes}>
          <h1>{this.state.front ? card.question : card.answer}</h1>
        </div>
      </SwipeListener>
    );
  }
}
