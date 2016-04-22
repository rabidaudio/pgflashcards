import React from 'react';

class EditCard extends React.Component {
  constructor(props){
    super(props);
    this.onQuestionChange = this.onQuestionChange.bind(this);
    this.onAnswerChange = this.onAnswerChange.bind(this);
  }
  onQuestionChange(e){
    this.props.onUpdate(this.props.cardId, {question: e.target.value, answer: this.props.answer});
  }
  onAnswerChange(e){
    this.props.onUpdate(this.props.cardId, {question: this.props.question, answer: e.target.value});
  }
  render(){
    return (
      <div className='edit'>
        <p>
       <input type='text' className='question' value={this.props.question} onChange={this.onQuestionChange}/>
       <br/>
       <input type='text' className='answer' value={this.props.answer} onChange={this.onAnswerChange}/>
       </p>
     </div>
    );
  }
}

export default class EditCards extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div>
        {Object.keys(this.props.cards).map(k => {
          const card = this.props.cards[k];
          return <EditCard {...card} key={k} cardId={k} onUpdate={this.props.onUpdate} />
        })}
      </div>
    );
  }
}
