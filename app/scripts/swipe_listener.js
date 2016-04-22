import React from 'react';
// import ReactDOM from 'react-dom';

export default class SwipeListener extends React.Component {
  constructor(props) {
    super(props);
    this.swiping = false;
    this.dx = null;
    this.dy = null;
    this.startx = null;
    this.starty = null;

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
  onTouchEnd(){
    this.swiping = false;
    if(this.dx === null || this.dy === null){
      this.call('onTap');
    }else{
      const absDistX = Math.abs(this.dx);
      const absDistY = Math.abs(this.dy);
      if(absDistX > absDistY){
        // horizontal
        if(this.dx > 0){
          this.call('onSwipeRight');
        }else{
          this.call('onSwipeLeft');
        }
      } else {
        // vertical
        if(this.dy > 0){
          this.call('onSwipeDown');
        }else{
          this.call('onSwipeUp');
        }
      }
    }
    this.dx = null;
    this.dy = null;
    this.startx = null;
    this.starty = null;
  }
  call(method){
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
