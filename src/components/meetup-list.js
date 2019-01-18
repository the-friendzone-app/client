import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchAllMeetups } from '../actions/meetups';
import './meetup-list.css';

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
        // convert time to users local time
        let startTime = meetup.startTime;
        startTime = new Date(startTime).toString();
        // console.log('startime',startTime);

        return (
        <li key={index} id={meetup.id} className="meetup-list-results">
          <button className="join-meetup-btn">Join Meetup</button>
          <ul>
            <li><h3>{meetup.name}</h3></li>
            <li><b>Location:</b> {meetup.location}</li>
            <li><b>Description:</b> {meetup.description}</li>
            <li><b>Start Time:</b> {startTime}</li>
            <li><b>End Time:</b> {meetup.endTime}</li>
            <li><b>Created By:</b> {meetup.createdBy}</li>
            <li><b>Attendee Count:</b> currently in development!</li>
          </ul>
        </li>
        )
      })
    
    return (
      <section className="meetups">
        <h2>FriendZone Meetups!</h2>
        <h3>Browse a list of FriendZone Meetups below created by our members!</h3>
        <p>Click on the meetup name to see more details about the event. If you find a 
          event that you would like to attend click the 'Join Meetup' button to let other 
          members know you'll be there!</p>
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