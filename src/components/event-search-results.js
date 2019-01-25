import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class EventSearchResults extends React.Component {

  render() {
    const {events} = this.props;
    // console.log('e.e', events);

    let searchResults;
    if (events === null) {
      searchResults = <p>No search results to display.</p>
    }
    if (events !== null) {
      searchResults = events.events.map((event, index) => {
        return (
          <ul key={index}>
            <li>Name: {event.name}</li>
            <li>URL: {event.url}</li>
            <li>Start: {event.start}</li>
            <li>End: {event.end}</li>
            <li>Venue ID: {event.venueId}</li>
          </ul>
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
    events: state.event.searchResults,
  };
};

export default requiresLogin()(connect(mapStateToProps)(EventSearchResults));