import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';

export class AnswerPage extends React.Component {
    componentDidMount() {

    }

    render() {

        
        return (

            <div className="answerpage">
            <h1>Poll Pro & Con</h1>
                <div className="answerpage-head">
                🗳️ Thank you for participating! For each answer there is a Pro, and a Con. Please feel free to go back and evaluate other approaches! :)<br /><br />
                </div>
                <section className='answerpage-body'>
                   <p>Your Answer: I'd confront them about it<br /><br />
                   😊 Pro: They would know exactly how you feel. The key to relationships is communication! They would know what lines they might have crossed
                   in what you consider to be important in the friendship, and you've now put your foot down, and they are able to respond.<br />
                   🤔 Con: Depending on your approach, and who they are as a person --they might not respond well to confrontation. They might close up and not
                   give you the closure you're hoping for, and they might get defensive. Try to be open for misunderstanding, and give room for dialogue, rather than a monologue.
                   </p>
                </section>
                <Link to="/personality-polls">Go Back To Personality Polls!</Link>
            </div>
        );
    }
}


export default requiresLogin()(connect()(AnswerPage));