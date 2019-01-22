

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import requiresLogin from './requires-login';
import {
    // goToAnswerPage,
    fetchQuestion
} from '../actions/questions';




// import './nameofcss.css';

export class Poll extends React.Component {

    componentDidMount() {

        this.props.dispatch(fetchQuestion(this.props.match.params.category));
    }
    handleOptionChange = changeEvent => {
        // this.props.dispatch(selectedOption(changeEvent.target.value))
        console.log('console.log',changeEvent.target.value)
    }
handleFormSubmit() {
    // return this.props.dispatch(goToAnswerPage(this.props.history))

}

    render() {

        const questionOptions = this.props.options.map((option, i) => {
            return (
                <div><input key={`option-${i}`} type="radio" name='option' value={`${option._id}`} onChange={this.handleOptionChange} />{option.text}</div>
            )
        }
        );
        const currentQuestion = this.props.currentQuestion;

        return (
            <div>
                <div className="card-question">
                   
                    <p className="question-text">
                        {currentQuestion !== undefined
                            ? currentQuestion
                            : 'Loading.......'}
                    </p>

                </div>
                <div>
                    <p className="your-answer"> Answer What You Would Do</p>
                    <form onSubmit={this.handleFormSubmit}>
                  
                        {questionOptions}
                   
                    </form>
                </div>
                <div className="position-button">
                    <button className="answer-button" onClick={() => this.answerSubmit()} type="submit">
                        Submit
                </button>
                </div>
            </div>

        );
    }




}


const mapStateToProps = state => {
    return {
        currentQuestion: state.questions.currentQuestion,
        questionID: state.questions.questionID,
        options: state.questions.options
    };
};

export default withRouter(
    requiresLogin()(connect(mapStateToProps)(Poll))
);
