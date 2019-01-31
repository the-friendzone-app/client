import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import EventSearchForm from './event-search-form';
import SetLocationForm from './set-location-form';
import './event-search.css';
import { toggleShowEventSearchForm } from '../actions/event-search';
import EventSearchResults from './event-search-results';
import NavBar from './nav-bar';

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
      <React.Fragment>
      <NavBar/>
      <div className="outer-div">
      <div className="header-section">
        <h1>Eventbrite Search</h1>
        <p>Looking for things already set up in your Area? Or maybe you just moved somewhere? Check out our <div className="eb-logo"></div> search!<br/><span className="side-note">You can change your current location at any time.</span>
        </p>
        </div>
        <SetLocationForm userId={this.props.userId} currentLocation={this.props.currentLocation} />
        <button className="solar-button" onClick={() => this.handleClick()}>{searchFormBtnDescription}</button>
        {eventSearchForm}
        <div>
          {this.props.loading ? 'Loading event search results...' : ''}
        </div>
        <EventSearchResults />
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