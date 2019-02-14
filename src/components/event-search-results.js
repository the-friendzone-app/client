import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { createUserMeetup } from '../actions/meetups';
let moment = require('moment');

export class EventSearchResults extends React.Component {

  onClick(eventInfo) {
    // console.log('eventInfo ---> ', eventInfo);

    let createdBy = this.props.username;
    const { name, venueData, description, startTime, endTime } = eventInfo;
    // add url, lat, long to meetup model
    let location = venueData.address;

    const newMeetup = { name, location, description, startTime, endTime, createdBy };
    this.props.dispatch(createUserMeetup(newMeetup));
    // console.log('new meetup ---> ', newMeetup);
    alert('Friend Zone meetup created!');

  }

  render() {
    const { events } = this.props;

    let searchResults;
    if (events === null) {
      searchResults = <p>No search results to display.</p>
    }
    if (events !== null) {
      searchResults = events.events.map((event, index) => {

        let startTime = event.start;
        startTime = moment(startTime);
        let formattedStartTime = startTime.format('llll');

        let endTime = event.end;
        endTime = moment(endTime);
        // let formattedEndTime = endTime.format('llll');

        // duration - diff between start and end times
        let elapsed = endTime.diff(startTime, 'minutes');
        // breakdown into hours and minutes for display e.g. 1 hour 30 mins
        let hours = Math.floor(elapsed / 60);
        let minutes = (elapsed % 60);

        let eventInfo = { name: event.name, startTime: event.start, endTime: event.end, description: event.description, url: event.url, venueData: event.venueData };
        return (
          <div key={index}>
            <ul>
              <li><a href={event.url} target="_blank" rel="noopener noreferrer">{event.name}</a></li>
              <li><b>Start Time:</b> {formattedStartTime}</li>
              <li><b>Duration:</b> {hours} hours {minutes} minutes</li>
              <li><b>Address:</b> {event.venueData.address}</li>
            </ul>
            <button className="create-event-button" id={event.id} value={event.name} onClick={() => this.onClick(eventInfo)}>Create Meetup</button>
          </div>
        )
      })
    }
    if (events !== null && events.events.length === 0) {
      searchResults = <p>The search has returned no results. Try searching with different inputs.</p>
    }


    return (
      <section className="event-search-results">
        <h1 className="event-search-results-page-title">Event Search Results!</h1>
        {searchResults}
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
    currentLocation: state.meetups.currentLocation,
    userId: state.auth.currentUser._id,
    events: state.event.searchResultsVenue,
  };
};

export default requiresLogin()(connect(mapStateToProps)(EventSearchResults));