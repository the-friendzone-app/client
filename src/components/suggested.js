import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { fetchCurrentUser2, addFriendToUser, ignoreUser, fetchSchat } from '../actions/users';
import Chat from './schat';
export class Suggested extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser2()).
      then(() => this.props.dispatch(fetchSchat()));
  }
  addFriend(id) {
    return (
      this.props.dispatch(addFriendToUser(id))
    );
  }
  ignoreUser(id) {
    this.props.dispatch(ignoreUser(id))
      .then(() => this.props.dispatch(fetchCurrentUser2()))
      .then(() => this.props.dispatch(fetchSchat()));
  }
  resetState() {
    // window.location.reload();
  }
  render() {

    // let suggested = this.props.suggested;
    // let suggests;
    // let suggestsChats;
    let suggests;
    let schat = this.props.schat;
    let ignoreList = [];
    if (this.props.currentUser.user2) {
      ignoreList = this.props.currentUser.user2.ignored;
    }

    if (schat.suggested) {
      let size = 5;
      suggests = schat.suggested.slice(0, size).map((suggest, i) => {
        if (ignoreList.includes(suggest._id._id)) {
          console.log('ignored user');
          return;
        } else {
          if (suggest) {
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
                    this.ignoreUser(suggest._id._id);
                    this.resetState();
                  }}>Pass</button>
                </div>
              </div>
            )
          } else {
            return console.log('no suggested chatrooms');
          }
        }
      })
    }
    // console.log(suggests);
    return (
      <div className="dashboard" >
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
    currentUser: state.user.currentUser2,
    authToken: state.auth.authToken,
    schat: state.user.schat
  };
};

export default requiresLogin()(connect(mapStateToProps)(Suggested));