import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
export class PersonalityPolls extends React.Component {

  render() {
    return (
      <section className="p-poll">
        <p>Welcome to Personality Polls Page
          please click below to take one of the polls
          <Link to="/personality-polls/mvp1">
               MVP Question 1
              </Link>
              <Link to="/personality-polls/mvp2">
               MVP Question 2
              </Link>
              <Link to="/personality-polls/mvp3">
               MVP Question 3
              </Link>
        </p>
      </section>
    )
  }
}

export default requiresLogin()(connect()(PersonalityPolls));