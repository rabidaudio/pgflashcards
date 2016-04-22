import React from 'react';
import Keypress from 'keypress.js'

import SwipeListener from './swipe_listener';
import Countdown from './countdown';

// A mod that respects negative numbers
function mod(n, m) {
  return ((n % m) + m) % m;
}

export default class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {front: true, index: 0};
    this.keyListener = new Keypress.Listener();
    this.next = this.next.bind(this);
    this.prev = this.prev.bind(this);
    this.flip = this.flip.bind(this);
  }
  componentDidMount(){
    this.keyListener.simple_combo('space', this.flip);
    this.keyListener.simple_combo('left',  this.prev);
    this.keyListener.simple_combo('right', this.next);
  }
  componentWillUnmount(){
    this.keyListener.reset();
  }

  getCard(){
    return this.props.cards[this.state.index];
  }
  flip(){
    this.setState({front: !this.state.front});
  }
  cycleBy(amount){
    const newIndex = mod(this.state.index + amount, this.props.cards.length);
    this.setState({front: true, index: newIndex});
  }
  next(){
    this.cycleBy(1);
  }
  prev(){
    this.cycleBy(-1);
  }

  render() {
    const card = this.getCard();
    return (
      <SwipeListener onSwipeLeft={this.next} onSwipeRight={this.prev} onTap={this.flip}>
        <div className={this.state.front ? 'flashcard' : 'flashcard back'}>
          <h1>{this.state.front ? card.question : card.answer}</h1>
          <Countdown start={15} running={this.state.front} />
        </div>
      </SwipeListener>
    );
  }
}
