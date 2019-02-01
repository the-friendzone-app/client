import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { fetchCurrentUser2, addFriendToUser, ignoreUser, fetchSchat } from '../actions/users';
import Chat from './schat';
import NavBar from './nav-bar';
export class Suggested extends React.Component {
  state = {
    addedFriend: ''
  }

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
    let addedFriend = this.state.addedFriend;
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

                <Chat key={suggest.chatroom._id} schat={suggest} />
                <button
                  className="add-friend-button"
                  key={suggest._id._id} onClick={() => {
                    this.addFriend(suggest._id._id)
              this.setState({ addedFriend: `Sent friend request to ${suggest._id.hashedUsername}` });
                  }
                  }>
                  <i className="fas fa-plus-square"></i>
                </button>
                <button
                  className="ignore-button"
                  key={suggest._id.username} onClick={() => {

               
                    this.ignoreUser(suggest._id._id);
                    this.resetState();
                  }
                  }>
                  <i className="fas fa-user-times"></i>
                </button>
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

      <React.Fragment>
      <NavBar/>
      <div className="outer-div">
        <div className="header-section">
          <h1><i className="far fa-lightbulb"></i> Suggested List</h1>
        </div>
        <div className="main-div">
          <div className="friend-div">
            <button className="friend-list-button"><Link to='/friends'><i className="fas fa-user-friends"></i> Friends List</Link></button>
            <section className="About">
              If we have found any users we think you're
             compatible with they will appear here.<br />
             <b>
               Key:
              <ul>
                <li><i className="far fa-comment"></i> - Chat</li>
                <li> <i className="fas fa-plus-square"></i> - Add Friend</li>
               <li><i className="fas fa-user-times"></i>- Remove User</li>
              </ul>
              </b>
            </section>
      <h3>{addedFriend}</h3>
            <ul>
              {suggests}
            </ul>
          </div>
        </div>

      </div>
      </React.Fragment>
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