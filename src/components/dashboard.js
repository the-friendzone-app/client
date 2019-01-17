import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';
import requiresLogin from './requires-login';

export class Dashboard extends React.Component {
    componentDidMount() {

    }

    render() {
        
        if(!this.props.loggedIn){
            return(
              <Redirect to='/landing-page' />
            )
        }
        
        return (
            <div className="dashboard">
                <div className="dashboard-username">
                    Welcome to FriendZone {this.props.username}!
                </div>
                <section className='dashboard-menu'>
                    <div className="dashboard-friends">Friends</div>
                    <div className="dashboard-meetups">Meetups</div>
                    <div className="dashboard-polls">Personality Polls</div>
                    <div className="dashboard-communities">Community</div>
                </section>
            </div>
        );
    }
}

const mapStateToProps = state => {
    const {currentUser} = state.auth;
    return {
        username: state.auth.currentUser.username,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        loggedIn: state.auth.currentUser !== null
    };
};

export default requiresLogin()(connect(mapStateToProps)(Dashboard));
