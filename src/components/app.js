import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';

import HeaderBar from './header-bar';
import LandingPage from './landing-page';
import Dashboard from './dashboard';

import Community from './community';
import Friends from './friends';
import Meetups from './meetups';
import MeetupDetails from './meetup-details';
import PersonalityPolls from './personalitypolls';
import Topic from './topic';
import Comment from './comment';
import Chat from './chat';


import RegistrationPage from './registration-page';
import { refreshAuthToken } from '../actions/auth';

export class App extends React.Component {
    componentDidUpdate(prevProps) {
        if (!prevProps.loggedIn && this.props.loggedIn) {
            // When we are logged in, refresh the auth token periodically
            this.startPeriodicRefresh();
        } else if (prevProps.loggedIn && !this.props.loggedIn) {
            // Stop refreshing when we log out
            this.stopPeriodicRefresh();
        }
    }

    componentWillUnmount() {
        this.stopPeriodicRefresh();
    }

    startPeriodicRefresh() {
        this.refreshInterval = setInterval(
            () => this.props.dispatch(refreshAuthToken()),
            60 * 60 * 1000 // One hour
        );
    }

    stopPeriodicRefresh() {
        if (!this.refreshInterval) {
            return;
        }

        clearInterval(this.refreshInterval);
    }

    render() {
        return (
            <div className="app">
                <Route path="/" component={HeaderBar} />
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/register" component={RegistrationPage} />
                    <Route exact path="/friends" component={Friends} />
                    <Route exact path="/community" component={Community} />
                    <Route exact path="/community/:communityId" component={Topic} />
                    <Route exact path="/community/:communityId/:topicId" component={Comment} />
                    <Route exact path="/personality-polls" component={PersonalityPolls} />

                    <Route exact path="/meetups" component={Meetups} />
                    <Route exact path="/meetups/:meetupName" component ={MeetupDetails} />
                    <Route exact path="/chat" component={Chat} />
                </Switch>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    hasAuthToken: state.auth.authToken !== null,
    loggedIn: state.auth.currentUser !== null
});

// Deal with update blocking - https://reacttraining.com/react-router/web/guides/dealing-with-update-blocking
export default withRouter(connect(mapStateToProps)(App));
