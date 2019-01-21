import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import MeetupForm from './meetup-form';
import MeetupsList from './meetup-list';
import './meetups.css';

export class Meetups extends React.Component {

  render() {
    return (
      <section className="meetups">
        <h1 className="meetups-page-title">FriendZone Meetups!</h1>
        <p>Schedule meetups, get lunch, plan a picnic, meet new FriendZ!</p>
        <p>Welcome to the FriendZone Meetup section. As a FriendZone member, you can create your 
          own event or use our built in event search to find upcoming events in your area. The event 
          search will return results based on your location and search criteria. Want to find FriendZ 
          to attend the next big concert or sporting event with you? Simply run a search and hit the 
          ‘Create Event’ button once you’ve found the result you're looking for. The event will then 
          be made available for other FriendZone members to join and attend the event with you. Never 
          attend another concert or event alone!</p>
        <h1 className ="create-meetups-title">Create a FriendZone Meetup!</h1>
        <MeetupForm currentUsername={this.props.username} />
        <MeetupsList />
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
  };
};

export default requiresLogin()(connect(mapStateToProps)(Meetups));