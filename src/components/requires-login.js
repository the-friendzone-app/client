import React from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

export default () => Component => {
    function RequiresLogin(props) {
        
        const {authenticating, loggedIn, error, user, ...passThroughProps} = props;
        if (authenticating) {
            return <div>Logging in...</div>;
        } else if (!loggedIn || error) {
            return <Redirect to="/" />;
        // }
        // else if (user!==null && loggedIn && !user.introQuizCompleted) {
        //     return <Redirect to="/intro-quiz" />;
        }
        return <Component {...passThroughProps} />;
    }

    const displayName = Component.displayName || Component.name || 'Component';
    RequiresLogin.displayName = `RequiresLogin(${displayName})`;

    const mapStateToProps = (state, props) => ({
        authenticating: state.auth.loading,
        loggedIn: state.auth.currentUser !== null,
        error: state.auth.error,
        user: state.auth.currentUser
        
    });

    return connect(mapStateToProps)(RequiresLogin);
};
