import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { withRouter } from 'react-router'
import { fetchCurrentUser, fetchFriends, fetchFriended, deleteFriend } from '../actions/users';
import Chat from './chat';

export class Friends extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser())
      .then(() => this.props.dispatch(fetchFriends()))
      .then(() => this.props.dispatch(fetchFriended()));
  }
  render() {
    let chats;
    let deleteIt;
    // console.log(this.props);
    if (this.props.friended.friended) {
      // console.log(this.props.friended.friended);
      deleteIt = this.props.friended.friended.map((friend, i) => {
        if (friend.chatroom) {
          return <button key={friend._id._id} onClick={() => this.props.dispatch(deleteFriend(friend.chatroom._id))}>DELETE</button>
        }
        return <p key={i}>No friends :(</p>
      })

      chats = this.props.friended.friended.map(friend => {
        console.log(friend);
        if (friend.chatroom) {
          return (<Chat key={friend.chatroom._id} friended={friend} />);
        }
      })
    }
    return (
      <div className="dashboard">
        <section className="friends-list">
          <h1>Friends List</h1>
          <button onClick={() => this.props.history.go(-1)}>Suggested List</button>
          <ul>
            {chats}
            {deleteIt}
          </ul>

        </section>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    friends: state.user.friends,
    friended: state.user.friended,
    authToken: state.auth.authToken
  };
};

export default withRouter(requiresLogin()(connect(mapStateToProps)(Friends)));