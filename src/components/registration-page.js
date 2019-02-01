import React from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import RegistrationForm from './registration-form';

export function RegistrationPage(props) {
    // If we are logged in (which happens automatically when registration
    // is successful) redirect to the user's dashboard
    if (props.loggedIn && props.introQuizCompleted) {
        return <Redirect to="/dashboard" />;
    } else if (props.loggedIn) {
        return <Redirect to="/intro-quiz" />;
    }
    return (
        <div className="outer-div">
           <div className="header">
                <div className="header-container">
                    <div className="header-row">
                        <Link to="/"><button className="register-button">
                        <i className="fa fa-home" aria-hidden="true"></i> Home</button></Link>
                    </div>
                </div>
            </div>
            <div className="main-div2">
                <h2><i className="fas fa-address-card"></i> Registration Page</h2>
                <RegistrationForm />
                <Link className="text" to="/login">Go To Login?</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    introQuizCompleted: (state.auth.currentUser !== null) ? state.auth.currentUser.introQuizCompleted : false
});

export default connect(mapStateToProps)(RegistrationPage);
