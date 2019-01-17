import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Link} from 'react-router-dom';
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
                    <Link to ='/friends'><div className="dashboard-friends">Friends</div></Link>
                    <Link to ='/meetups'><div className="dashboard-meetups">Meetups</div></Link>
                    <Link to ='/perosonality-polls'><div className="dashboard-polls">Personality Polls</div></Link>
                    <Link to ='/communities'></Link><div className="dashboard-communities">Community</div>
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
