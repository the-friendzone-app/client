import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { withRouter } from 'react-router'
import { fetchCurrentUser2, fetchFriended, deleteFriend } from '../actions/users';
import Chat from './chat';
import NavBar from './nav-bar';

export class Friends extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchCurrentUser2())
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
        } else {
          return console.log('no chatroom');
        }
      })
    }
    return (
      <React.Fragment>
        <NavBar/>
      <div className="outer-div">
        <div className="header-section">
          <h1><i className="fas fa-user-friends"></i> Friends List</h1>
          </div>
          <div className="main-div">
          <div className="friend-div">
          <button className="friend-list-button" onClick={() => this.props.history.go(-1)}>
          <i className="far fa-lightbulb"></i> Suggested List</button>
          <section className="About">Here is where your list of Friends are kept.
          <span className="tooltip">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        <span class="tooltiptext">
                            Please note: If you add Friends they will be able to see your real username
                            and can chat with you any time. </span>
                    </span></section>
          
          
          <ul>
            {chats}
            {deleteIt}
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
    friended: state.user.friended,
    authToken: state.auth.authToken
  };
};

export default withRouter(requiresLogin()(connect(mapStateToProps)(Friends)));