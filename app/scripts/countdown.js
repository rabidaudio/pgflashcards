import React from 'react';

export default class Countdown extends React.Component {
  constructor(props){
    super(props);
    this.reset();
    this.tick = this.tick.bind(this);
  }
  tick(){
    if(this.props.running){
      this.setState({secondsElapsed: this.state.secondsElapsed + 1});
    }else{
      this.reset();
    }
  }
  reset(){
    this.state = {secondsElapsed: 0};
  }
  componentDidMount(){
    this.interval = setInterval(this.tick, 1000);
  }
  componentWillUnmount(){
    clearInterval(this.interval);
  }
  render(){
    if(!this.props.running){
      return null;
    }
    const remaining = this.props.start - this.state.secondsElapsed;
    if(remaining < 0){
      return (
        <div className="timer overtime">Over time by {-1*remaining}!</div>
      );
    }else if(remaining <= 5){
      return (
        <div className="timer closetime">Remaining: {remaining}</div>
      );
    }else {
      return (
        <div className="timer">Remaining: {remaining}</div>
      );
    }
  }
}