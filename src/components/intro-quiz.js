import React from 'react';
import {connect} from 'react-redux';
import {Link, 
    // Redirect
} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';

export class IntroQuiz extends React.Component {


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
    
    // if (props.loggedIn) {
    //     return <Redirect to="/dashboard" />;
    // }
//we are going to give the questions to the user and each question has a 'completed' that gets marked with each submit
//that way we guarantee all 3 questions have been completed before we mark 'introquizcompleted' as true
    return (
        <div className="home">
            <h2>Hello from intro quiz</h2>
            <p>Hello and welcome to The Friend Zone!
                We are so excited to welcome you to our community.
                Before we get started we require all users take this short 3 question quiz to 
                personalize your experience here!
                Please complete the quiz or your data won't be saved and you'll have to start over.
                Also, as a reminder we have a strict 'Friendz Only' Policy! Meaning that
                you are here to make friends! Not with any romantic or any malicious intent.
                For more information: Check out our <Link to="/community-guide">Community Guidelines</Link>
            </p>
            <Link to="/intro-quiz"><button>Get Started!</button></Link>
            {logOutButton}
        </div>
    );
}
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(IntroQuiz);
