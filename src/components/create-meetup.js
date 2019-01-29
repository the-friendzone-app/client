import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import MeetupForm from './meetup-form';
import './meetups.css';

export class CreateMeetup extends React.Component {

  render() {
    return (
      <section className="meetups">
        <h1 className ="create-meetups-title">Create a FriendZone Meetup!</h1>
        <MeetupForm currentUsername={this.props.username} />
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

export default requiresLogin()(connect(mapStateToProps)(CreateMeetup));