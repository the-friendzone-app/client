
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';


export class AnswerPage extends React.Component {

    render() {

        const selectedAnswer = this.props.selectedAnswer;

        console.log(selectedAnswer)
        return (

            <div>
                <div className="dashboard">
                    <div className="dashboard-username">
                        🗳️ Thank you for participating! For each answer there is a Pro, and a Con.
                 Please feel free to go back and evaluate other approaches! :)<br /><br />
                    </div>
                </div>
                <section className='dashboard-menu'>
                    Your Answer: {selectedAnswer.text}<br /><br />
                    😊 Pro: {selectedAnswer.pros}<br />
                    🤔 Con: {selectedAnswer.cons}

                </section>
                <Link to="/personality-polls">Go Back To Personality Polls!</Link>
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

