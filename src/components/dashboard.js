import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchSuggested } from '../actions/users';
import NavBar from './nav-bar';

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
                        <h1><i class="fa fa-home"></i>Home</h1>
                        <p>Welcome to The Friend Zone!<br />
                            Your Username is '{this.props.username}'<br />
                            Your Hashed Username is: {this.props.hashedUsername}!</p>
                    </div>
                    <div className="main-div">
                        <section className="foursquares">
                            <dl>
                                <dt className="solar-box"><Link to='/meetups'>Meetups<br/><span className="sub-text">A Place to Meet Friends!</span></Link></dt>
                                <dt className="tiger-box"><Link to='/personality-polls'>Personality <br/>Polls</Link></dt>
                                <dt className="mustard-box"><Link to='/suggested'>Friends</Link></dt>
                                <dt className="ocean-box"><Link to='/community'>Community</Link></dt>
                            </dl>
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
