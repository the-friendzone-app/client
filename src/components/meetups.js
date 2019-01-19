import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import MeetupForm from './meetup-form';
import MeetupsList from './meetup-list';
import './meetups.css';

export class Meetups extends React.Component {

  render() {
    return (
      <section className="meetups">
        <h1 className="meetups-page-title">Meetups!!</h1>
        <MeetupForm currentUsername={this.props.username}/>
        <MeetupsList />
      </section>
    )
  }
}

const mapStateToProps = state => {
  const {currentUser} = state.auth;
  return {
      username: state.auth.currentUser.username,
      name: `${currentUser.firstName} ${currentUser.lastName}`,
      loggedIn: state.auth.currentUser !== null,
      meetups: state.meetups.meetups,
  };
};

export default requiresLogin()(connect(mapStateToProps)(Meetups));