import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchAllMeetups } from '../actions/meetups';

export class MeetupsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllMeetups());
  }

  render() {
    const { meetups } = this.props;

    if (!meetups) {
      return null;
    }

    if (meetups.length === 0) {
      return(
        <div>
          <p>There are currently no FriendZone Meetups!</p>
          <p>This is a great opportunity for you to create a meetup for others to join!</p>
        </div>
      )
    } 
    
      const  meetupsList = meetups.map((meetup, index) => {
        return (
        <li key={index} id={meetup.id} className="meetup-list-results">
            <ul>
              <li><b>Meetup Name:</b> {meetup.name}</li>
              <li><b>Location:</b> {meetup.location}</li>
              <li><b>Description:</b> {meetup.description}</li>
              <li><b>Start Time:</b> {meetup.startTime}</li>
              <li><b>End Time:</b> {meetup.endTime}</li>
            </ul>
        </li>
        )
      })
    
    return (
      <section className="meetups">
        <h1>FriendZone Meetups!</h1>
        <div className="meetups-list-container">
          {meetupsList}
        </div>
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

export default requiresLogin()(connect(mapStateToProps)(MeetupsList));