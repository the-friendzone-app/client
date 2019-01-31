import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { fetchActivePolls } from '../actions/questions';
import NavBar from './nav-bar';

export class PersonalityPolls extends React.Component {
  componentDidMount() {
    return this.props.dispatch(fetchActivePolls());
  }
  render() {

    const activePolls = this.props.polls.map((poll, i) => {
      return (
        <li className="tiger-box-gradient" key={`poll-${i}`}><Link className="a-box-2" to={`/personality-polls/${poll.category}`}>{poll.questionText}</Link></li>
      )
    })

    return (
      <React.Fragment>
      <NavBar />
      <div className="outer-div">
        <div className="header-section">
          <h1><i class="fas fa-poll"></i> Personality Polls</h1>
          <p>Welcome to the Personality Polls section<br />
            February 2019 Questions are Live! <span className="tooltip">
              <i className="fa fa-info-circle" aria-hidden="true"></i>
              <span class="tooltiptext">We here at the Friend Zone
              wanted to give everyone an opportunity to have their
              opinions count. The questions will change every month,
                           so be sure to participate when you can!</span></span></p>
        </div>
        <div className="main-div">
          <section className="foursquares">
            <ul>
              {activePolls ? activePolls : 'Loading.....'}
            </ul>
          </section>
        </div>
      </div>
   </React.Fragment >
        );
  }
}

const mapStateToProps = state => {
  return {
    polls: state.questions.activePolls
  }
};

export default requiresLogin()(connect(mapStateToProps)(PersonalityPolls));