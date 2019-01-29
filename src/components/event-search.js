import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import EventSearchForm from './event-search-form';
import SetLocationForm from './set-location-form';
import './event-search.css';
import { toggleShowEventSearchForm } from '../actions/event-search';
import EventSearchResults from './event-search-results';

export class EventSearch extends React.Component {

  // set toggle for search here -- or use a react modal to popup the search form on button click.
  handleClick() {
    this.props.dispatch(toggleShowEventSearchForm());
  };

  render() {

    let eventSearchForm;
    let searchFormBtnDescription;
    // toggles showing event search form on click.
    if (this.props.event.showEventSearchForm) {
      eventSearchForm = <EventSearchForm currentUsername={this.props.username} currentLocation={this.props.currentLocation} searchResults={this.props.searchResults} />
      searchFormBtnDescription = 'Close Event Search Form';
    } else {
      searchFormBtnDescription = 'Open Event Search Form';
    }

    return (
      <section className="event-search-page">
        <h1 className="event-search-page-title">Event Search!</h1>
        <p>Please use the event search form below to find available events in your area. Your search area is based off the
          current location you have set. You can change your current location at any time.
        </p>
        <SetLocationForm userId={this.props.userId} currentLocation={this.props.currentLocation} />
        <button onClick={() => this.handleClick()}>{searchFormBtnDescription}</button>
        {eventSearchForm}
        <div>
          {this.props.loading ? 'Loading event search results...' : ''}
        </div>
        <EventSearchResults />
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
    meetupAttendence: state.meetups.meetupAttendence,
    meetupDisplayFilter: state.meetups.meetupDisplayFilter,
    currentLocation: state.meetups.currentLocation,
    userId: state.auth.currentUser._id,
    event: state.event,
    searchResults: state.event.searchResults,
    loading: state.event.loading,
  };
};

export default requiresLogin()(connect(mapStateToProps)(EventSearch));