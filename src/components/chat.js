import React from "react";
import io from "socket.io-client";
import { API_BASE_URL } from '../config';
import { connect } from 'react-redux';
import { fetchMessageRequest, fetchMessageSuccess, fetchMessageFailure, putMessages } from '../actions/users';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: io(API_BASE_URL),
      message: '',
      messages: [],
      friend: '',
      chatroom: ''
    };

    this.state.socket.on('CHAT', data => {
      console.log(data);
      this.setState({
        messages: [...this.state.messages, data]
      });
      // this.props.dispatch(putMessages(this.state.chatroom, this.state.messages));
      // console.log(this.state.messages);
    });
  }
  // when clicking send message, sends message to server every time then message input is cleared so another message can be sent
  onClick(ev) {
    this.setState({ message: '' });
    this.state.socket.emit('CHAT', {
      handle: this.props.username,
      message: this.state.message,
      room: this.state.chatroom
    });

  }
  onChange(ev) {
    this.setState({
      message: ev.target.value
    });
  }

  // fetchMessages(chatroomId) {
  //   this.props.dispatch(fetchMessageRequest());
  //   return fetch(`${API_BASE_URL}/messages/${chatroomId}`, {
  //     method: 'GET'
  //   })
  //     .then(res => res.json())
  //     .then(res => {
  //       this.props.dispatch(fetchMessageSuccess(res));
  //       this.setState({
  //         messages: res.messages
  //       });
  //     })
  //     .catch(err => this.props.dispatch(fetchMessageFailure(err)));
  // };

  componentDidMount() {
    console.log(this.props.friended);
    const friended = this.props.friended;
    let user;
    let room;
    if (friended) {
      user = friended._id;
      room = friended.chatroom;
    }
    const friend = user ? user.username : 'Global chat';
    const chatroom = room ? room._id : 'Global chat';
    this.setState({
      friend, chatroom
    });
    this.state.socket.emit('subscribe', chatroom);
    if (chatroom !== 'Global chat') {
      // this.fetchMessages(chatroom);
    }
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="card-title">Connected to: {this.state.friend}</div>
          <div className="messages">
            {this.state.messages.map((data, i) => { //loops through all messages and will display author's handle(username) and message
              return (
                <div key={i}>{data.handle}: {data.message}</div>
              )
            })}
            <div>
              <input id="message" type="text" placeholder="Message" onChange={ev => this.onChange(ev)} />
              <button onClick={ev => this.onClick(ev)}>Send</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  username: state.auth.currentUser.username
})
export default connect(mapStateToProps)(Chat);