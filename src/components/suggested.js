import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';
import { fetchCurrentUser, fetchFriends, fetchSuggested, addFriendToUser } from '../actions/users';
// import Chat from './chat';

export class Suggested extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser())
      .then(() => this.props.dispatch(fetchFriends()))
      .then(() => this.props.dispatch(fetchSuggested()));
  }
  addFriend(id) {
    return (
      this.props.dispatch(addFriendToUser(id)),
      this.props.dispatch(fetchSuggested())
    );
  }
  render() {
    // let chats;
    // // console.log(this.props);
    // console.log(this.props.suggested);
    // if (this.props.suggested.suggested) {
    //   chats = this.props.suggested.suggested.map(friend => {
    //     return (<Chat key={friend.chatroom._id} suggested={friend} />);
    //   });
    // }
    //console.log(this.props.suggested.friended);
    // console.log(this.props.authToken);
    let suggests;
    let suggestedList = [];
    let suggested = this.props.suggested;
    // console.log(suggested);
    for (let user of suggested) {
      //console.log(user);
      // console.log(user.username);
      suggestedList.push(user);
    }
    //console.log(suggestedList);

    if (suggestedList) {
      suggests = suggestedList.map((suggest, key) => {
        // console.log(suggest);
        return <div key={key}>
          {suggest.hashedUsername}
          <ul>
            <li>SELF: {suggest.profile.selfType}</li>
            <li>PREFERENCE: {suggest.profile.preferenceType}</li>
          </ul>
          <button onClick={() => {
            this.addFriend(suggest._id)
          }}>Add Suggested</button>
        </div>;
      })
    }
    return (
      <div className="dashboard">
        <section className="friends-list">
          <h1>Suggested List</h1>
          <button><Link to='/friends'>Friends List</Link></button>
          <div>
            {suggests}
          </div>
        </section>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    username: state.auth.currentUser.username,
    suggested: state.user.suggested,
    authToken: state.auth.authToken
  };
};

export default requiresLogin()(connect(mapStateToProps)(Suggested));