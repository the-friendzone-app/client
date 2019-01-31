import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import requiresLogin from './requires-login';
import PollForm from './pollform';
import { Link, Redirect } from 'react-router-dom';

import { fetchQuestion } from '../actions/questions';




export class Poll extends React.Component {

    componentDidMount() {
        this.props.dispatch(fetchQuestion(this.props.match.params.category));
    }


    render() {


        return (

            <div className="outer-div-polls">
                <div className="header">
                    <div className="header-container">
                        <div className="header-row">
                            <Link to="/"><button className="register-button"><i className="fa fa-home" aria-hidden="true"></i> Home</button></Link>
                        </div>
                    </div>
                </div>
                <PollForm currentQuestion={this.props.currentQuestion} options={this.props.options} {...this.props} />

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
