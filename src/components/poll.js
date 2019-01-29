

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import requiresLogin from './requires-login';
import PollForm from './pollform';

import { fetchQuestion } from '../actions/questions';




// import './nameofcss.css';

export class Poll extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchQuestion(this.props.match.params.category));
    }
   

    render() {

    
        return (
            <div>
                <div className="card-question">
                   
        <PollForm currentQuestion={this.props.currentQuestion} options={this.props.options} {...this.props}/>
                    
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
