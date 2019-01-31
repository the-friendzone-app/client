import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

import LoginForm from './login-form';

export function LoginPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="outer-div">
            <div className="header">
                <div className="header-container">
                    <div className="header-row">
                        <Link to="/"><button className="register-button"><i class="fa fa-home" aria-hidden="true"></i> Home</button></Link>
                    </div>
                </div>
            </div>
            <div className="main-div">
                <h2><i class="fas fa-user-astronaut"></i> Login Page</h2>
                <LoginForm />
                <Link className="text" to="/register">Go To Registration?</Link>
            </div>
        </div>
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LoginPage);
