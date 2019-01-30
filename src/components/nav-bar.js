import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import requiresLogin from './requires-login';


export class NavBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        if (!this.props.loggedIn) {
            return (
                <div></div>
            )
        }
        // Only render the log out button if we are logged in
        let logOutButton;
        logOutButton = (<Link to='/' onClick={() => this.logOut()}><div className='navbar-logout'>Log out</div></Link>);
        return (
            <div className="nav-bar">
                <div className="gray-logo"> </div>
                <div className="nav-menu">
                    <ul>
                        <li>Account: {this.props.currentUser.username}</li>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/suggested'>Friends List</Link></li>
                        <li><Link to='/meetups'>My Meetups</Link></li>
                        <li><Link to='/community'>Community Guidelines</Link></li>
                        <li>Report</li>
                        <li>Settings</li>
                        <li>About Us</li>
                        <li>{logOutButton}</li>
                    </ul>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    currentUser: state.auth.currentUser
});

export default requiresLogin()(connect(mapStateToProps)(NavBar));
