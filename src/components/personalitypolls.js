import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { fetchActivePolls } from '../actions/questions';

export class PersonalityPolls extends React.Component {
//active and if active map to props
//activeQuestions create links with category
//
componentDidMount() {
  return this.props.dispatch(fetchActivePolls());
}
  render() {
  
    const activePolls = this.props.polls.map((poll, i) => {
      return (
    <li key={`poll-${i}`}><Link className="red-square" to={`/personality-polls/${poll.category}`}>{poll.question}</Link></li>
      )})
    return (
   
      <section className="p-poll">

        <p>Please click on a link to polls below</p>
     <ul>{activePolls ? activePolls : 'Loading.....'}</ul>
      </section>
    )
  }
}
const mapStateToProps = state => {
  return{
  polls: state.questions.activePolls
  }
};

export default requiresLogin()(connect(mapStateToProps)(PersonalityPolls));