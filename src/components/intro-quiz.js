import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { fetchIntroQuestions } from '../actions/questions';
import IntroQuizForm from './intro-quiz-form';
import Feedback from './feedback-page';
import { fetchCurrentUser } from '../actions/users';


export class IntroQuiz extends React.Component {
   componentDidMount(){
        this.props.dispatch(fetchCurrentUser(this.props.User));
    }
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    handleClick() {
        this.props.dispatch(fetchIntroQuestions());
    }
    render() {
  
        if ((this.props.hasOwnProperty('Questions') && this.props.Questions.length && this.props.Questions !== null && this.props.Questions.length === this.props.userAnswers.length) || 
        (this.props.User!== null && this.props.User.introQuizCompleted && this.props.loggedIn)) {
            return (
                <div>
                    <Feedback {...this.props} />
                </div>
            )
        }
        if (this.props.hasOwnProperty('Questions') && this.props.Questions.length && this.props.Questions !== null) {
            return (
                <div>
                     <div className="gray-logo"></div>
                    <div className="intro-quiz-container">
                        <h1><span className="intro-icon">Intro Quiz</span></h1>
                        <section>Please answer truthfully :) Thank you for participating in our Intro Quiz!</section>
                       <br/><br/> <IntroQuizForm {...this.props} />

                    </div>
                </div>

            );
        }
        else {
            let logOutButton;
            logOutButton = (<Link to='/' onClick={() => this.logOut()}><button className="intro-button-inverse">Log out</button></Link>);


            return (
                
                <div className="intro-div">
                <div className="gray-logo"></div>
                    <h1><span className="intro-icon"><i className="fas fa-user-graduate"></i> Intro Quiz</span></h1>
                    <div className="About">Hello and Welcome to The Friend Zone! <br/><br/>We are so happy that you've decided to join us.<br/> As part of joining we require that all our new members
                    take our short but sweet Intro Quiz so that we can get to know you a little better, and tailor your experience at The Friend Zone.<br/>
                    After you complete the quiz you'll be able to access the rest of the app!
                    <br/><br/>Thank you for joining our community!<br/><br/>
                    <span className="intro-icon">-The Friend Zone Dev Team.</span><br/><br/>
                    <span className="side-note">Please note that by participating in our quiz and signing up for The Friend Zone, you are agreeing that
                    you do not have any malicious or romantic intent, and are joining to seek platonic friendships. For any other information
                    please review our <Link to='/community-guide'>Community Guidelines</Link></span></div>
                    <button className="intro-button" onClick={() => this.handleClick()}>Get Started!</button>
                    {logOutButton}
                </div>
                
            );
        }
    }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    Questions: state.questions.introQuiz,
    userAnswers: state.questions.usersIntroAnswers,
    User: state.user.currentUser,
    authToken: state.auth.authToken
});

export default connect(mapStateToProps)(IntroQuiz);
