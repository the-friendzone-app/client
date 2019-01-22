import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import requiresLogin from './requires-login';


export class HeaderBar extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }

    render() {
        if(!this.props.loggedIn){
            return(
                <div></div>
            )
        }
        // Only render the log out button if we are logged in
        let logOutButton;
            logOutButton = ( <Link to='/' onClick={() => this.logOut()}><div className='navbar-logout'>Log out</div></Link>);
        return (
            <div className="header-bar">
                <h1>The FriendZone</h1>
                <Link to ='/'><div className='navbar-tab'>Home</div></Link>
                <Link to ='/friends'><div className='navbar-tab'>Friends List</div></Link>
                <Link to ='/meetups'><div className='navbar-tab'>My Meetups</div></Link>
                <Link to ='/community'><div className='navbar-tab'>Community Guidelines</div></Link>
                <div className='navbar-tab'>Report</div>
                <div className='navbar-tab'>Settings</div>
                {logOutButton}
                <br/>
                <br/>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default requiresLogin()(connect(mapStateToProps)(HeaderBar));
