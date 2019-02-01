import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { fetchFeedback } from '../actions/auth';
// import IntroQuizForm from './intro-quiz-form';
// import { sendVerification } from '../actions/questions';



export class Feedback extends React.Component {

    constructor(props){
        super(props);
        
    }

    componentDidMount(){
        this.getFeedback();
    }
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    getFeedback() {
        this.props.dispatch(fetchFeedback());
    }
    render() {
        //if fail
        if (this.props.User.introQuizCompleted && this.props.User.marked) {
            let logOutButton;
            logOutButton = (<Link to='/' onClick={() => this.logOut()}><button className="intro-button-inverse">Thank You</button></Link>);
            return (

                    <div className="intro-div"><span className="intro-icon"><h1>Thank You For Taking The Quiz</h1></span>
                    <span className="About">
                     Hello! Thank you for taking our Intro Quiz. At this time it doesn't appear that you would be a good fit for our community.<br/>
                     We take our <Link to='/community-guide'>Community Guidelines</Link> very seriously, and want to make sure that everyone who joins
                     a part of The Friend Zone is willing to help make it a fun, safe, and caring space for all users.<br/>
                     If you believe there has been an error, email TheFriendZoneDev@gmail.com
                    </span>
            {logOutButton}</div>
            )
        }
        //if succeed
        if (this.props.User.introQuizCompleted && !this.props.User.marked) {
            return (
                <div className="intro-div"><span className="intro-icon"><h1>YOU PASSED!</h1></span>
                <span className="About">
                Congratulations! Thank you for taking our quiz. You may now go to your Dashboard and enjoy The Friend Zone!
                Please remember that we have given you a unique "Friend Zone username" that way, when you are chatting with people you can remain anonymous!
                <br/> Only people you choose to share your "real" username with will be able to add you and chat with you anytime.
                <br/> If you experience any form of harrassment or bullying in The Friend Zone, please report it to us right away, as we want to make sure everyone in our community
                has a safe and fun time!
                </span>
         <Link to="/dashboard"><button className="intro-button">Go To Dashboard</button></Link>
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
                    Checking your results now....
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
