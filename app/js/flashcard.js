'use strict';
const React = require('react');

class Flashcard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {front: true}
    this.flip = this.flip.bind(this);
  }
  flip() {
    this.setState({front: !this.state.front});
  }
  componentDidMount(){
    key('space', this.flip);
  }
  componentWillUnmount(){
    key.unbind('space');
  }
  render() {
    return (
      <h1 onClick={this.flip}>
          {this.state.front ? this.props.question : this.props.answer}
      </h1>
    );
  }
}

module.exports = Flashcard