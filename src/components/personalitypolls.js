import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';

export class PersonalityPolls extends React.Component {

  render() {
    return (
      <section className="p-poll">

        <p>Please click on a link to polls below</p>
        <Link className="red-square" to="/personality-polls/mvp1">MVP Question 1</Link><br/>
        <Link className="red-square" to="/personality-polls/mvp2">MVP Question 2</Link><br/>
        <Link className="red-square" to="/personality-polls/mvp3">MVP Question 3</Link><br/>

      </section>
    )
  }
}

export default requiresLogin()(connect()(PersonalityPolls));