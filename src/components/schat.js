import React from "react";
import io from "socket.io-client";
import { API_BASE_URL } from '../config';
import { connect } from 'react-redux';
import { fetchSmessageRequest, fetchSmessageSuccess, fetchSmessageFailure, putSmessages } from '../actions/users';
import Modal from 'react-modal';

Modal.setAppElement('body');
class Schat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: io(API_BASE_URL),
      message: '',
      messages: [],
      hashedUser: '',
      person: '',
      chatroom: '',
      modalIsOpen: false
    };

    this.state.socket.on('CHAT', data => {
      // console.log(data);
      this.setState({
        messages: [...this.state.messages, data]
      });
      this.props.dispatch(putSmessages(this.state.chatroom, this.state.messages));
      // console.log(this.state.messages);
    });
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }
  //Modal
  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    console.log('modal open');
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  // when clicking send message, sends message to server every time then message input is cleared so another message can be sent
  onClick() {
    this.state.socket.emit('CHAT', {
      handle: this.props.hashedUsername,
      message: this.state.message,
      room: this.state.chatroom
    });
    this.setState({
      message: ''
    });
  }

  onChange(ev) {
    this.setState({
      message: ev.target.value
    });
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  componentDidMount() {
    //console.log(this.props.friended);
    const schat = this.props.schat;
    // console.log(schat);
    let user;
    let room;
    if (schat) {
      user = schat._id;
      room = schat.chatroom;
    }
    // console.log('SCHAT', schat);
    let person;
    let hashedUser;
    let chatroom;

    if (schat) {
      person = user ? user.username : '';
      hashedUser = user ? user.hashedUsername : '';
      chatroom = room ? room._id : '';
    }

    this.setState({
      person, chatroom, hashedUser
    });
    this.state.socket.emit('subscribe', chatroom);
    if (chatroom !== '') {
      this.fetchSmessages(chatroom);
    }
  }

  componentWillUnmount() {
    this.state.socket.disconnect();
  }

  fetchSmessages(chatroomId) {
    this.props.dispatch(fetchSmessageRequest());
    const authToken = this.props.authToken;
    return fetch(`${API_BASE_URL}/messages/suggested/${chatroomId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authToken}`
      }
    })
      .then(res => res.json())
      .then(res => {
        // console.log(res);
        this.props.dispatch(fetchSmessageSuccess(res));
        this.setState({
          messages: res.messages
        });
      })
      .catch(err => this.props.dispatch(fetchSmessageFailure(err)));
  };

  render() {
    //loops through all messages and will display author's handle(username) and message
    // console.log(this.state.messages);
    let messages;
    // console.log('AUTH', this.props.authToken);
    if (this.state.messages) {
      messages = this.state.messages.map((data, i) => {
        // console.log(data);
        return <div key={i}>{data.handle} : {data.message}</div>
      });
    }
    return (
      <div className="container">
        <p>{this.state.hashedUser}</p>
        <button onClick={this.openModal}>CHAT</button>
        <div className="chat-modal">
          <Modal
            isOpen={this.state.modalIsOpen}
            onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
          >
            <div className="card-title">Connected to: {this.state.hashedUser}</div>
            <button onClick={this.closeModal}>CLOSE CHAT</button>
            <div className="messages">
              {messages}
            </div>
            <div>
              <input id="message" type="text" placeholder="Message" value={this.state.message} onChange={ev => this.onChange(ev)} />
              <button onClick={ev => this.onClick(ev)}>Send</button>
            </div>
          </Modal>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  username: state.auth.currentUser.username,
  hashedUsername: state.auth.currentUser.hashedUsername,
  authToken: state.auth.authToken
})
export default connect(mapStateToProps)(Schat);