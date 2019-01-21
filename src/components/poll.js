'use strict';

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import requiresLogin from './requires-login';
import { userAnswer, fetchQuestions } from '../actions/personalitypolls';




// import './nameofcss.css';

export class Poll extends React.Component {
    componentDidMount() {
        this.props.dispatch(fetchQuestions());
    }
    answerSubmit() {
        const answer = this.refs.userguess.value;

        return this.props.dispatch(
            userAnswer(answer)
        );
    }
    createPoll() {
        const currentQuestion = this.props.currentQuestion;

        return (
            <div className="card-question">
                <h3 className="question-number-text">Question
                </h3>
                <p className="question-text">
                    {currentQuestion.userQuestion
                        ? currentQuestion.userQuestion
                        : 'Loading.......'}
                </p>
                <hr />
            </div>
            <p className="your-answer">Answer What You Would Do
            </p>

            <div className="position-button">
                <button className="answer-button" onClick={() => this.guessSubmit()} type="input">
                    Submit
                </button>
            </div>
              
    );
    }

    rerender() {
        const questionOptions = this.props.options.map((option, i) =>
        <input key={i} type="radio" value={`${option.text}`}>{option.text}</input>
    );

        return (<div className="x">{this.createPoll()}</div>);
    }

    render() {
        if (this.props.loading) {
            return <h2>Loading...</h2>;
        } else {
            return this.rerender();
        }
    }
}


const mapStateToProps = state => {
    return {
        currentQuestion: state.questionReducer,
        questionID: state.questionReducer.questionID
    };
};

export default withRouter(
    requiresLogin()(connect(mapStateToProps)(Poll))
);
