import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
// import MeetupForm from './meetup-form';
// import MeetupsList from './meetup-list';
import { Link } from 'react-router-dom';
// import './meetups.css';
import NavBar from './nav-bar'

export class Meetups extends React.Component {

  // <h1 className ="create-meetups-title">Create a FriendZone Meetup!</h1>
  // <MeetupForm currentUsername={this.props.username} />
  // <MeetupsList />

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <div className="outer-div">
          <div className="header-section">
            <h1><i className="fas fa-map-marker-alt"></i> Meetups</h1>
            <p className="community-welcome">Welcome to the FriendZone Meetup section!
            Here we have created a space for people who want to get out there and do fun stuff, meet new cool friends,
        or finally go to that new restaurant that just opened up!<br />
              We have partnered up with <div className="eb-logo"></div> to bring you events in your area!
        </p>
            <div className="link-box">
              <Link className="view-details-link" to='/meetups/friendzone-meetups'><button className="solar-button">FriendZone Meetups List</button></Link>
              <Link className="view-details-link" to='/meetups/create-meetup'><button className="solar-button">Create a FriendZone Meetup</button></Link>
              <Link className="view-details-link" to='/meetups/event-search'><button className="solar-button">Eventbrite Search</button></Link>
            </div>
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

export default requiresLogin()(connect(mapStateToProps)(Meetups));