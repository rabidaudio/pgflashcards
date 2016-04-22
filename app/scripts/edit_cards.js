import React from 'react';

class EditCard extends React.Component {
  constructor(props){
    super(props);
    this.state = {rows: 4};
    this.onQuestionChange = this.onQuestionChange.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);
  }
  onQuestionChange(e){
    this.props.onUpdate(this.props.cardId, {question: e.target.value, answer: this.props.answer});
  }
  onAnswerChange(e){
    this.setState({rows: Math.max(e.target.value.split('\n').length + 2, 4) });
    this.props.onUpdate(this.props.cardId, {question: this.props.question, answer: e.target.value});
  }
  render(){
    return (
      <div className='edit'>
      <div><a onClick={() => this.props.onDestroy(this.props.cardId)} >Delete</a></div>
      <p>
      <input type='text' className='question' value={this.props.question} onChange={this.onQuestionChange}/>
      <br/>
      <textarea className='answer' rows={this.state.rows} value={this.props.answer} onChange={this.onAnswerChange}/>
      </p>
     </div>
    );
  }
}

export default class EditCards extends React.Component {
  constructor(props){
    super(props);
    this.deleteAll = this.deleteAll.bind(this);
  }
  deleteAll(){
    Object.keys(this.props.cards).forEach(k => {
      this.props.onDestroy(k);
    });
  }
  render(){
    return (
      <div>
        <div><a onClick={this.deleteAll}>Delete All</a></div>
        {Object.keys(this.props.cards).map(k => {
          const card = this.props.cards[k];
          return (<EditCard {...card} key={k} cardId={k} onUpdate={this.props.onUpdate} onDestroy={this.props.onDestroy} />);
        })}
        <div><a onClick={this.props.onAdd}>Add</a></div>
      </div>
    );
  }
}
