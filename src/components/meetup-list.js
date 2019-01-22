import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchAllMeetups, joinMeetup, fetchMeetupAttendence, meetupDisplayFilter } from '../actions/meetups';
import './meetup-list.css';
import { Link } from 'react-router-dom';
let moment = require('moment');

export class MeetupsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllMeetups());
    this.props.dispatch(fetchMeetupAttendence());
  }

  onClick(e) {
    const { meetupAttendence } = this.props;
    console.log(e.currentTarget);
    let username = e.currentTarget.value;
    let meetupId = e.currentTarget.id;
    let userInfo = {username, meetupId}
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

  handleDisplayFilter(e) {
    console.log(e.currentTarget.value);
    this.props.dispatch(meetupDisplayFilter(e.currentTarget.value));
  }

  render() {
    const { meetups, username, meetupDisplayFilter, meetupAttendence } = this.props;

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

    // filter to pull all instances of meetups where current user has joined.
    let userJoined = meetupAttendence.filter(meetup => meetup.username === username);
    // create an array with all of the meetupId's for all of the user joined meetups
    userJoined = userJoined.map(meetup => meetup.meetupId);
    
    // filter for meetups user by 'all' 'joined' 'created'
    let filteredMeetups;
    if (meetupDisplayFilter === 'all') {
      filteredMeetups = meetups;
    } else if (meetupDisplayFilter === 'joined') {
      filteredMeetups = meetups.filter(meetup => userJoined.includes(meetup.id));
    } else if (meetupDisplayFilter === 'created') {
      filteredMeetups = meetups.filter(meetup => meetup.createdBy === username);
    }

    const  meetupsList = filteredMeetups.map((meetup, index) => {
      // convert time to users local time
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
      let linkTo = `/meetups-${meetup.name}`

      return (
      <li key={index} id={meetup.id} className="meetup-list-results">
        <button className="join-meetup-btn" id={meetup.id} value={username} onClick={e => this.onClick(e)}>Join Meetup</button>
        <ul>
          <Link to ={linkTo}><li><b>{meetup.name}</b></li></Link>
          <li>created by {meetup.createdBy}</li>
          <li><b>Location:</b> {meetup.location}</li>
          <li><b>Description:</b> {meetup.description}</li>
          <li><b>Start Time:</b> {formattedStartTime}</li>
          <li><b>End Time:</b> {formattedEndTime}</li>
          <li><b>Duration:</b> {hours} hours {minutes} minutes</li>
        </ul>
      </li>
      )
    })
    
    return (
      <section className="meetups-list-page-container">
        <h2 className="meetups-list-page-title">FriendZone Meetups!</h2>
        <h3 className="meetups-h3">Browse a list of FriendZone Meetups below created by our members!</h3>
        <p>Click on the meetup name to see more details about the event. If you find a 
          event that you would like to attend click the 'Join Meetup' button to let other 
          members know you'll be there!</p>
          <div>
          <span>filter display: </span>
          <select onChange={e => this.handleDisplayFilter(e)}>
            <option value="all">All Meetups</option>
            <option value="joined">Joined Meetups</option>
            <option value="created">Created Meetups</option>
          </select>
          </div>
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
      meetupAttendence: state.meetups.meetupAttendence,
      meetupDisplayFilter: state.meetups.meetupDisplayFilter,
  };
};

export default requiresLogin()(connect(mapStateToProps)(MeetupsList));