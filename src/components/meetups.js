import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import MeetupForm from './meetup-form';
import MeetupsList from './meetup-list';

export class Meetups extends React.Component {

  render() {
    return (
      <section className="meetups">
        <h1>Meetups!!</h1>
        <MeetupForm />
        <MeetupsList />
      </section>
    )
  }
}

export default requiresLogin()(connect()(Meetups));