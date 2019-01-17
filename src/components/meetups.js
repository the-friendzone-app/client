import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class Meetups extends React.Component {

  render() {
    return (
      <section className="meetups">
        <h1>Meetups!!</h1>
      </section>
    )
  }
}

export default requiresLogin()(connect()(Meetups));