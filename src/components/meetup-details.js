import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchAllMeetups, joinMeetup, fetchMeetupAttendence } from '../actions/meetups';
import './meetup-details.css';

let moment = require('moment');

export class MeetupsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllMeetups());
    this.props.dispatch(fetchMeetupAttendence());
  }

  onClick(e) {
    const { meetupAttendence } = this.props;
    let username = e.currentTarget.value;
    let meetupId = e.currentTarget.id;
    let userInfo = { username, meetupId }
    // if user is already joined meetup they can't join again.
    if (meetupAttendence.length !== 0) {
      for (let i = 0; i < meetupAttendence.length; i++) {
        if (meetupAttendence[i].username === username && meetupAttendence[i].meetupId === meetupId) {
          return alert('You have already joined this meetup!');
        }
      }
      return this.props.dispatch(joinMeetup(userInfo));
    }
    return this.props.dispatch(joinMeetup(userInfo));
  }

  render() {
    const { meetup } = this.props.location.state;
    const { username, meetupAttendence } = this.props;

    // convert time to users local time
    let createdAtTime = meetup.createdAt;
    createdAtTime = moment(createdAtTime);
    let formattedCreatedAtTime = createdAtTime.format('llll');

    let startTime = meetup.startTime;
    startTime = moment(startTime);
    let formattedStartTime = startTime.format('llll');

    let endTime = meetup.endTime;
    endTime = moment(endTime);
    let formattedEndTime = endTime.format('llll');

    // duration - diff between start and end times
    let elapsed = endTime.diff(startTime, 'minutes');
    // breakdown into hours and minutes for display e.g. 1 hour 30 mins
    let hours = Math.floor(elapsed / 60);
    let minutes = (elapsed % 60);

    // get list of members for meetup -- filter through list of member attendence to find all matching meetupId's
    let membersJoinedList = meetupAttendence.filter(e => e.meetupId === meetup.id);
    membersJoinedList = membersJoinedList.map((e, index) => {
      return (
        <li key={index}>{e.username}</li>
      )
    });

    let joinedList = meetupAttendence.filter(e => e.meetupId === meetup.id);
    joinedList = joinedList.map(e => e.username);
    let displayJoinBtn;
    if (joinedList.includes(username)) {
      displayJoinBtn = <button disabled>Meetup Joined!</button>
    } else {
      displayJoinBtn = <button className="join-meetup-button" id={meetup.id} value={username} onClick={e => this.onClick(e)}>Join Meetup</button>
    }

    return (
      <div>
        <section className="meetups-details-container">
          <h1>{meetup.name}</h1>
          <li>created by {meetup.createdBy} at {formattedCreatedAtTime}</li>
          <li><b>Location:</b> {meetup.location}</li>
          <li><b>Description:</b> {meetup.description}</li>
          <li><b>Start Time:</b> {formattedStartTime}</li>
          <li><b>End Time:</b> {formattedEndTime}</li>
          <li><b>Duration:</b> {hours} hours {minutes} minutes</li>
          {displayJoinBtn}
        </section>
        <section className="meetup-members-list">
          <div>Meetup Members: {membersJoinedList.length}</div>
          <ul>
            {membersJoinedList}
          </ul>
        </section>
        <section className="meetup-chat">
          <div>COMING SOON: MEETUP CHAT!</div>
        </section>
      </div>
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
    meetupAttendence: state.meetups.meetupAttendence,
    meetupDisplayFilter: state.meetups.meetupDisplayFilter,
  };
};

export default requiresLogin()(connect(mapStateToProps)(MeetupsList));