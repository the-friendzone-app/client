
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import requiresLogin from './requires-login';
import IntroQuizForm from './intro-quiz-form';

import { fetchIntroQuestions } from '../actions/questions';




// import './nameofcss.css';

export class IntroQuizPage extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchIntroQuestions());
    }
   

    render() {

    
        return (
            <div>
                <div className="card-question">
                <h1>Intro Quiz Page</h1>
            <section>Welcome to the Quiz. Please complete the quiz to use the app! If you close before finishing your 
                answers will not be saved and you will have to start over from the beginning! :)</section>
        <IntroQuizForm Questions={this.props.currentQuestion} {...this.props}/>
                    
                </div>
            </div>

        );
    }




}


const mapStateToProps = state => {
    return {
        Questions: state.questions.introQuiz,
    };
};


export default withRouter(
    requiresLogin()(connect(mapStateToProps)(IntroQuizPage))
);