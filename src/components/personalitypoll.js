import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class PersonalityPoll extends React.Component {

  render() {
    return (
      <section className="p-poll">
        <p>Insert poll here</p>
      </section>
    )
  }
}

export default requiresLogin()(connect()(PersonalityPoll));