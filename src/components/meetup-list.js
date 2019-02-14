import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchAllMeetups, fetchMeetupAttendence, meetupDisplayFilter, fetchUserLocation } from '../actions/meetups';
import './meetup-list.css';
import NavBar from './nav-bar';
import { Link } from 'react-router-dom';
import SetLocationForm from './set-location-form';
let moment = require('moment');

export class MeetupsList extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchAllMeetups());
    this.props.dispatch(fetchMeetupAttendence());
    this.props.dispatch(fetchUserLocation());
  }

  handleDisplayFilter(e) {
    this.props.dispatch(meetupDisplayFilter(e.currentTarget.value));
  }

  render() {
    const { meetups, username, meetupDisplayFilter, meetupAttendence, currentLocation, userId } = this.props;

    if (!meetups) {
      return null;
    }

    if (meetups.length === 0) {
      return (
        <div>
          <p>There are currently no Friend Zone Meetups!</p>
          <p>This is a great opportunity for you to create a meetup for others to join!</p>
        </div>
      )
    }

    // filter to pull all instances of meetups where current user has joined.
    let userJoined = meetupAttendence.filter(meetup => meetup.username === username);
    // create an array with all of the meetupId's for all of the user joined meetups
    userJoined = userJoined.map(meetup => meetup.meetupId);

    // filter for meetups user by 'all' 'joined' 'unjoined 'created'
    let filteredMeetups;
    if (meetupDisplayFilter === 'all') {
      filteredMeetups = meetups;
    } else if (meetupDisplayFilter === 'joined') {
      filteredMeetups = meetups.filter(meetup => userJoined.includes(meetup.id));
    } else if (meetupDisplayFilter === 'unjoined') {
      filteredMeetups = meetups.filter(meetup => !userJoined.includes(meetup.id));
    } else if (meetupDisplayFilter === 'created') {
      filteredMeetups = meetups.filter(meetup => meetup.createdBy === username);
    }

    let meetupsList;
    if (filteredMeetups.length === 0) {
      meetupsList = <p className="no-meetups-display">No meetups meet your selected display criteria!</p>
    } else {
      meetupsList = filteredMeetups.map((meetup, index) => {
        // convert time to users local time
        let startTime = meetup.startTime;
        startTime = moment(startTime);
        let formattedStartTime = startTime.format('llll');

        let endTime = meetup.endTime;
        endTime = moment(endTime);
        // let formattedEndTime = endTime.format('llll');

        // duration - diff between start and end times
        let elapsed = endTime.diff(startTime, 'minutes');
        // breakdown into hours and minutes for display e.g. 1 hour 30 mins
        let hours = Math.floor(elapsed / 60);
        let minutes = (elapsed % 60);

        return (
          <div className="meetup-box">
            <li key={index} id={meetup.id} className="meetup-list-results">
              <Link className="view-details-link2" to={{ pathname: `/meetups/${meetup.name}`, state: { meetup: meetup } }}><b>View Details</b></Link>
              <ul>
                <Link className="meetup-name-link" to={{ pathname: `/meetups/${meetup.name}`, state: { meetup: meetup } }}><li className="meetup-name"><b>{meetup.name}</b></li></Link>
                <li><b>Location:</b> {meetup.location}</li>
                <li><b>Start Time:</b> {formattedStartTime}</li>
                <li><b>Duration:</b> {hours} hours {minutes} minutes</li>
              </ul>
            </li>
          </div>
        )
      })
    }

    return (
      <React.Fragment>

        <section className="meetups-list-page-container">
          <Link to="/meetups"><button className="solar-button">Back To Meetups</button></Link>
          <h2 className="meetups-list-page-title">Friend Zone Meetups!</h2>
          <h3 className="meetups-h3">Browse a list of Friend Zone Meetups below created by our members!</h3>
          <p className="meetups-list-info">Click on the meetup name to see more details about the event. If you find a
            event that you would like to attend click the 'Join Meetup' button to let other
          members know you'll be there!</p>
          <SetLocationForm userId={userId} currentLocation={currentLocation} />
          <div className="meetups-list-dropdown">
            <span><b>Filter Display: </b></span>
            <select onChange={e => this.handleDisplayFilter(e)}>
              <option value="all">All Meetups</option>
              <option value="joined">Joined Meetups</option>
              <option value="unjoined">Unjoined Meetups</option>
              <option value="created">Created Meetups</option>
            </select>
          </div>
          <div className="meetups-list-container">
            {meetupsList}
          </div>
        </section>
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
    meetupAttendence: state.meetups.meetupAttendence,
    meetupDisplayFilter: state.meetups.meetupDisplayFilter,
    currentLocation: state.meetups.currentLocation,
    userId: state.auth.currentUser._id,
  };
};

export default requiresLogin()(connect(mapStateToProps)(MeetupsList));