import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';

export class Dashboard extends React.Component {
    componentDidMount() {
    }
    render() {

        return (
            <React.Fragment>

                <div className="dashboard">
                    <div className="dashboard-username">
                        <h1>The Friend Zone</h1>
                        Welcome to The Friend Zone!<br />
                        Your Username is '{this.props.username}'<br />
                        Your Hashed Username is: {this.props.hashedUsername}!
              <br />

                        <Link to='/suggested'><div className="dashboard-friends">Friends</div></Link>
                        <Link to='/meetups'><div className="dashboard-meetups">Meetups</div></Link>
                        <Link to='/personality-polls'><div className="dashboard-polls">Personality Polls</div></Link>
                        <Link to='/community'><div className="dashboard-communities">Community</div></Link>
                    </div>

                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        hashedUsername: state.auth.currentUser.hashedUsername,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        loggedIn: state.auth.currentUser !== null,
    };
};
export default requiresLogin()(connect(mapStateToProps)(Dashboard));
