import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import requiresLogin from './requires-login';

export class Dashboard extends React.Component {
    componentDidMount() {

    }

    render() {

        if (!this.props.loggedIn) {
            return (
                <Redirect to='/landing-page' />
            )
        }

        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Welcome to The Friend Zone!<br />
                    Your Username is '{this.props.username}'<br />
                    Your Hashed Username is: {this.props.hashedUsername}!
                </div>
                <section className='dashboard-menu'>
                    <Link to='/friends'><div className="dashboard-friends">Friends</div></Link>
                    <Link to='/meetups'><div className="dashboard-meetups">Meetups</div></Link>
                    <Link to='/personality-polls'><div className="dashboard-polls">Personality Polls</div></Link>
                    <Link to='/community'><div className="dashboard-communities">Community</div></Link>

                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        hashedUsername: state.auth.currentUser.hashedUsername,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        loggedIn: state.auth.currentUser !== null
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
