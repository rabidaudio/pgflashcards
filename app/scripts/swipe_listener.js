import React from 'react';

export default class SwipeListener extends React.Component {
  constructor(props) {
    super(props);
    this.swiping = false;

    this.onTouchStart = this.onTouchStart.bind(this);
    this.onTouchMove = this.onTouchMove.bind(this);
    this.onTouchEnd = this.onTouchEnd.bind(this);
  }
  onTouchStart(e){
    this.swiping = true;
    this.startx = e.touches[0].pageX;
    this.starty = e.touches[0].pageY;
  }
  onTouchMove(e){
    this.swiping = true;
    this.dx = e.touches[0].pageX - this.startx;
    this.dy = e.touches[0].pageY - this.starty;
  }
  onTouchEnd(e){
    this.swiping = false;
    if(Math.abs(this.dx) > Math.abs(this.dy)){
      // horizontal
      if(this.dx > this.minDistance()){
        this.call('onSwipeRight');
      }else if (this.dx < -1*this.minDistance()){
        this.call('onSwipeLeft');
      }
    } else {
      // vertical
      if(this.dy > this.minDistance()){
        this.call('onSwipeDown');
      }else if(this.dy < -1*this.minDistance()){
        this.call('onSwipeUp');
      }
    }
  }
  minDistance(){
    return this.props.minDistance || 10;
  }
  call(method){
    console.log("call", method);
    if(this.props[method]) {
      this.props[method]();
    }
  }
  render() {
    return (
      <div onTouchStart={this.onTouchStart} onTouchMove={this.onTouchMove} onTouchEnd={this.onTouchEnd}>
        {this.props.children}
      </div>
    );
  }
}
