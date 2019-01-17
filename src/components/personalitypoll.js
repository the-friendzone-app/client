import React from 'react';
import { connect } from 'react-redux';

export class PersonalityPoll extends React.Component {

  render() {
    return (
      <section className="p-poll">
        <p>Insert poll here</p>
      </section>
    )
  }
}

export default connect()(PersonalityPoll);