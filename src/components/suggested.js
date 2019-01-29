import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { fetchCurrentUser, fetchSuggested, addFriendToUser, ignoreUser, fetchSchat } from '../actions/users';
import Chat from './schat';
export class Suggested extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser())
      .then(() => this.props.dispatch(fetchSchat()))
      .then(() => this.props.dispatch(fetchSuggested()))
      ;
  }
  addFriend(id) {
    return (
      this.props.dispatch(addFriendToUser(id)),
      this.props.dispatch(fetchSchat()),
      this.props.dispatch(fetchSuggested())
    );
  }
  ignoreUser(id) {
    this.props.dispatch(ignoreUser(id))
      .then(() => this.props.dispatch(fetchSchat()))
      .then(() => this.props.dispatch(fetchSuggested()));
  }
  render() {

    // let suggested = this.props.suggested;
    let suggests;
    let schat = this.props.schat;
    // console.log(suggested);
    // console.log(schat);
    if (schat.suggested) {
      suggests = schat.suggested.map((suggest, i) => {
        console.log(suggest);
        if (suggest.chatroom) {
          return (
            <div key={suggest._id.hashedUsername}>
              <div>
                <Chat key={suggest.chatroom._id} schat={suggest} />
              </div>
              <div>
                <button key={suggest._id._id} onClick={() => {
                  this.addFriend(suggest._id._id)
                }}>Add to friends</button>
                <button key={suggest._id.username} onClick={() => {
                  this.ignoreUser(suggest._id._id)
                }}>Pass</button>
              </div>
            </div>
          )
        }
      })
    }
    return (
      <div className="dashboard">
        <section className="friends-list">
          <h1>Suggested List</h1>
          <button><Link to='/friends'>Friends List</Link></button>
          <ul>
            {suggests}
          </ul>
        </section>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    authToken: state.auth.authToken,
    schat: state.user.schat
  };
};

export default requiresLogin()(connect(mapStateToProps)(Suggested));