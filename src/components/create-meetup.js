import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import MeetupForm from './meetup-form';
import './meetups.css';
import NavBar from './nav-bar';

export class CreateMeetup extends React.Component {

  render() {
    return (
      <React.Fragment>
      <NavBar/>
      <div className="outer-div">
      <div className="header-section">
        <h2 className="solar"><i className="fas fa-paint-brush"></i> Create a FriendZone Meetup!</h2>
        <ul>
        <li>Looking for people to go see a movie with?</li> 
        <li>Maybe you heard about a new band you wanted to check out.</li>
        <li>Want to create your own LAN party?</li>
          </ul> 
        <h3 className="solar">You're in the right place!</h3>
        Here we allow The Friend Zone users to create your own for your area.
       
        <MeetupForm currentUsername={this.props.username} />
      </div>
      </div>
      </React.Fragment>
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