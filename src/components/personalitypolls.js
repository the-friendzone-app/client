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
    //variable here for the maps
    const activePolls = this.props.polls.map((poll, i) =>
    <Link className="red-square" to={`/personality-polls/${poll.category}`}>poll.question</Link><br/>;

    return (
      <section className="p-poll">

        <p>Please click on a link to polls below</p>
     {activePolls}
      </section>
    )
  }
}

export default requiresLogin()(connect()(PersonalityPolls));