import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchCurrentUser, fetchFriends, fetchFriended } from '../actions/users';
import Chat from './chat';

export class Friends extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser())
      .then(() => this.props.dispatch(fetchFriends()))
      .then(() => this.props.dispatch(fetchFriended()));
  }
  render() {
    let friends;
    //friends
    friends = this.props.friends.map((friend) => {
      return (
        <li key={friend.username}>
          <p>{friend.username}</p>
        </li>
      )
    })
    let chats;
    console.log(this.props);
    if (this.props.friended.friended) {
      chats = this.props.friended.friended.map(friend => {
        return (<Chat key={friend.chatroom._id} friended={friend} />);
      })
    }
    return (
      <section className="friends-list">
        <h1>Friends List</h1>
        <ul>
          <div>{friends}</div>
        </ul>
        {chats}
        <div>
          <Chat />
        </div>
      </section>
    )
  }
}
const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    friends: state.user.friends,
    friended: state.user.friended
  };
};

export default requiresLogin()(connect(mapStateToProps)(Friends));