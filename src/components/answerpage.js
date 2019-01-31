
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
export class AnswerPage extends React.Component {
    render() {
        const selectedAnswer = this.props.selectedAnswer;
        return (
            <div className="outer-div">
                <div className="header-section">
                       <h3> 🗳️ Thank you for participating!</h3> Remember, for every action there is an equal and opposite reaction!<div className="side-note">Please feel free to go back and evaluate other approaches! :)</div><br /><br />
                </div>
                <section className='main-div'>
                    <div className="your-answer">Your Answer: {selectedAnswer.text}</div><br /><br />
                    <p className="pro">😊 Pro:</p><p className="response"> {selectedAnswer.pros}</p><br />
                    <p className="con">🤔 Con:</p><p className="response"> {selectedAnswer.cons}</p>
                </section>
                <Link className="text" to="/personality-polls">Go Back To Personality Polls!</Link>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        selectedAnswer: state.questions.options[state.questions.optionIndex]
    };
};
export default withRouter(
    requiresLogin()(connect(mapStateToProps)(AnswerPage))
);

