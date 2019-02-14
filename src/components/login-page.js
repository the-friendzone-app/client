import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';

export function LoginPage(props) {
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
                        <Link to="/"><button className="register-button"><i className="fa fa-home" aria-hidden="true"></i> Home</button></Link>
                    </div>
                </div>
            </div>
            <div className="main-div">
                <h2><i className="fas fa-user-astronaut"></i> Login Page</h2>
                <h3>Demo account:</h3>
                <h3>Username: frodo</h3>
                <h3>Password: qwerty54321</h3>
                <LoginForm />
                <Link className="text" to="/register">Go To Registration?</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    introQuizCompleted: (state.auth.currentUser !== null) ? state.auth.currentUser.introQuizCompleted : false,
});

export default connect(mapStateToProps)(LoginPage);
