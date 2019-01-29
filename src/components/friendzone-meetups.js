import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import MeetupsList from './meetup-list';
import './meetups.css';

export class FriendZoneMeetups extends React.Component {

  render() {
    return (
      <section className="meetups">
        <MeetupsList />
      </section>
    )
  }
}

const mapStateToProps = state => {
  const { currentUser } = state.auth;
  return {
    username: state.auth.currentUser.username,
    name: `${currentUser.firstName} ${currentUser.lastName}`,
    loggedIn: state.auth.currentUser !== null,
    meetups: state.meetups.meetups,
  };
};

export default requiresLogin()(connect(mapStateToProps)(FriendZoneMeetups));