import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { fetchFeedback } from '../actions/auth';
import IntroQuizForm from './intro-quiz-form';
import { sendVerification } from '../actions/questions';



export class Feedback extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    getFeedback() {
        this.props.dispatch(fetchFeedback());
    }
    loadVerifiedPage(){
        this.props.dispatch(sendVerification());
    }
    render() {
        //if fail
        if (this.props.User.introQuizCompleted && this.props.User.marked) {
            return (
                <div>YOU FAILED</div>
            )
        }
        //if succeed
        if (this.props.User.introQuizCompleted && !this.props.User.marked) {
            return (
                <div>YOU PASSED!
         <button onClick={() => this.loadVerifiedPage()}>Load Verification Page</button>
                </div>
            )
        }
        //if verified on state
        if (this.props.VerifiedPage===true) {
            return(
            <div><h1>Verification Page</h1>
            Please check your email for your verification code. Enter your verification code:
                <input placeholder="Enter your 7 digit verification code..." />
                <button>ok</button>
            </div>
            )
        }

        else {
            return (
                <div>
                    <h1>Thanks for taking the quiz!</h1>
                    Click to see your results!
                    
                    <button onClick={() => this.getFeedback()}>Get Started!</button>
                </div>
            )
        }
    }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    Questions: state.questions.introQuiz,
    userAnswers: state.questions.usersIntroAnswers,
    User: state.auth.currentUser,
    VerifiedPage: state.questions.VerifiedPage 
});

export default connect(mapStateToProps)(Feedback);
