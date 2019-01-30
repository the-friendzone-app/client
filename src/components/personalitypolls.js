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
    <li key={`poll-${i}`}><Link className="red-square" to={`/personality-polls/${poll.category}`}>{poll.questionText}</Link></li>
      )})
    return (
   <div className="outerdiv">
      <div className="p-poll">
<h1> Personality Polls</h1>
<p>Welcome to the Personality Polls section. We here at the Friend Zone wanted to give everyone an 
  opportunity to have their opinions count. The questions will change every month, so be sure to participate when you can!
</p><br />
<h3>January 2019 Questions</h3>
        <p>Please click on a link to polls below</p>
     <ul className='.topic-plate'>{activePolls ? activePolls : 'Loading.....'}</ul>
      </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return{
  polls: state.questions.activePolls
  }
};

export default requiresLogin()(connect(mapStateToProps)(PersonalityPolls));