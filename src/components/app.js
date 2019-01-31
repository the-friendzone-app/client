import React from 'react';
import { connect } from 'react-redux';
import { Route, withRouter, Switch } from 'react-router-dom';

import LoginPage from './login-page';
import LandingPage from './landing-page';
import Dashboard from './dashboard';

import Community from './community';
import Friends from './friends';
import Suggested from './suggested';
import Meetups from './meetups';
import Chat from './chat';
import Poll from './poll';
import AnswerPage from './answerpage';

import Chat from './chat';
import MeetupDetails from './meetup-details';
import PersonalityPolls from './personalitypolls';
import IntroQuiz from './intro-quiz';
import Topic from './topic';
import Thread from './thread';


import RegistrationPage from './registration-page';
import { refreshAuthToken } from '../actions/auth';
import EventSearch from './event-search';
import CreateMeetup from './create-meetup';
import FriendZoneMeetups from './friendzone-meetups';

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
                {/* <Route path="/" component={NavBar} /> */}
                <Switch>
                    <Route exact path="/" component={LandingPage} />
                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/login" component={LoginPage} />
                    <Route exact path="/register" component={RegistrationPage} />
                    <Route exact path="/friends" component={Friends} />
                    <Route exact path="/suggested" component={Suggested} />
                    <Route exact path="/community" component={Community} />
                    <Route exact path="/community/:communityId" component={Topic} />
                    <Route exact path="/community/:communityId/:topicId" component={Thread} />
                    <Route exact path="/personality-polls" component={PersonalityPolls} />
                    <Route exact path="/personality-polls/:category" component={Poll} />
                    <Route exact path="/meetups" component={Meetups} />
                    <Route exact path="/meetups/friendzone-meetups" component={FriendZoneMeetups} />
                    <Route exact path="/meetups/create-meetup" component={CreateMeetup} />
                    <Route exact path="/meetups/event-search" component={EventSearch} />
                    <Route exact path="/meetups/:meetupName" component={MeetupDetails} />
                    <Route exact path="/chat" component={Chat} />
                    <Route exact path="/answerpage" component={AnswerPage} />
                    <Route exact path="/intro-quiz" component={IntroQuiz} />
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
