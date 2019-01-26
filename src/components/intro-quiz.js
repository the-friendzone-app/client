import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {clearAuth} from '../actions/auth';
import {clearAuthToken} from '../local-storage';
import { fetchIntroQuestions } from '../actions/questions';
import IntroQuizForm from './intro-quiz-form';



export class IntroQuiz extends React.Component {
    logOut() {
        this.props.dispatch(clearAuth());
        clearAuthToken();
    }
    handleClick(){
    this.props.dispatch(fetchIntroQuestions());
    }
    render() {
        if(this.props.hasOwnProperty('Questions') && this.props.Questions.length && this.props.Questions !== null){
            return (
                <div>
                    <div className="card-question">
                    <h1>Intro Quiz Page</h1>
                <section>Welcome to the Quiz. Please complete the quiz to use the app! If you close before finishing your 
                    answers will not be saved and you will have to start over from the beginning! :)</section>
            <IntroQuizForm {...this.props}/>
                        
                    </div>
                </div>
    
            );
        }
        else{
        let logOutButton;
            logOutButton = ( <Link to='/' onClick={() => this.logOut()}><div className='navbar-logout'>Log out</div></Link>);
    

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
