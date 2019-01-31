import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearAuth } from '../actions/auth';
import { clearAuthToken } from '../local-storage';
import { fetchIntroQuestions } from '../actions/questions';
import IntroQuizForm from './intro-quiz-form';
import Feedback from './feedback-page';


export class IntroQuiz extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    handleClick() {
        this.props.dispatch(fetchIntroQuestions());
    }
    render() {
        //have some sort of user marked for deletion that renders 2 different
        //pages? one that says you're not a fit and another that says thank you and that button
        //sends off the verification code to the email?
        if (this.props.hasOwnProperty('Questions') && this.props.Questions.length && this.props.Questions !== null && this.props.Questions.length === this.props.userAnswers.length) {
            return (
                <div>
                    <Feedback {...this.props} />
                </div>
            )
        }
        if (this.props.hasOwnProperty('Questions') && this.props.Questions.length && this.props.Questions !== null) {
            return (
                <div>
                    <div className="card-question">
                        <h1>Intro Quiz Page</h1>
                        <section>Welcome to the Quiz. Please complete the quiz to use the app! If you close before finishing your
                    answers will not be saved and you will have to start over from the beginning! :)</section>
                        <IntroQuizForm {...this.props} />

                    </div>
                </div>

            );
        }
        else {
            let logOutButton;
            logOutButton = (<Link to='/' onClick={() => this.logOut()}><div className='navbar-logout'>Log out</div></Link>);


            return (
                <div className="intro-div">
                    <h1><i class="fas fa-user-graduate"></i> Intro Quiz</h1>
                    <div className="About">Hello and Welcome to The Friend Zone!</div>
                    <button onClick={() => this.handleClick()}>Get Started!</button>
                    {logOutButton}
                </div>
                
            );
        }
    }
}
const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null,
    Questions: state.questions.introQuiz,
    userAnswers: state.questions.usersIntroAnswers
});

export default connect(mapStateToProps)(IntroQuiz);
