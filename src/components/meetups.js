import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import EventForm from './event-form';

export class Meetups extends React.Component {

  render() {
    return (
      <section className="meetups">
        <h1>Meetups!!</h1>
        <EventForm />
      </section>
    )
  }
}

export default requiresLogin()(connect()(Meetups));