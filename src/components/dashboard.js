import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchSuggested } from '../actions/users';
import NavBar from './nav-bar';
// import Footer from './footer';


export class Dashboard extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchSuggested());
    }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="outer-div">
                    <div className="header-section">
                        <h1><i className="fa fa-home"></i>Home</h1>
                        <p>Welcome to your Dashboard<br />
                            Your Username is '{this.props.username}'<span className="tooltip"> <i className="fa fa-info-circle" aria-hidden="true"></i><span className="tooltiptext">Your username will be kept private. We will provide you a Friend Zone username to use inside The Friend Zone!</span></span><br />
                            Your Friend Zone Username is: {this.props.hashedUsername}!</p>
                    </div>
                    <div className="main-div">
                        <section className="foursquares">
                            <ul>
                                <li className="solar-box"><Link className="a-box" to='/meetups'>Meetups<br/><span className="sub-text">A Place to Meet Friends</span></Link></li>
                                <li className="tiger-box"><Link className="a-box" to='/personality-polls'>Personality <br/>Polls<br/><span className="sub-text">Your Opinion Counts</span></Link></li>
                                <li className="mustard-box"><Link className="a-box" to='/suggested'>Friends<br/><span className="sub-text">Match with New Friends & Chat</span></Link></li>
                                <li className="ocean-box"><Link className="a-box" to='/community'>Community<br/><span className="sub-text">Come Discuss Ideas</span></Link></li>
                            </ul>
                        </section>
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
