import React from "react";
import io from "socket.io-client";
import { API_BASE_URL } from '../config';
import { connect } from 'react-redux';

class Chat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      socket: io(API_BASE_URL),
      username: '',
      message: '',
      messages: []
    };

    // when clicking send message, sends message to server every time then message input is cleared so another message can be sent
    this.sendMessage = ev => {
      ev.preventDefault();
      this.state.socket.emit('SEND_MESSAGE', {
        author: this.state.username,
        message: this.state.message
      });
      this.setState({ message: '' });
    };


    this.state.socket.on('RECEIVE_MESSAGE', function (data) {
      addMessage(data);
    });

    const addMessage = data => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
      console.log(this.state.messages);
    };
  }
  componentWillUnmount() {
    this.state.socket.disconnect();
  };

  render() {

    const username = this.props.user ? this.props.user.username : '';

    return (
      <div className="container">
        <div className="row">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <div className="card-title">CHAT BOX</div>
                <hr />
                <div className="messages">
                  {this.state.messages.map(message => { //loops through all messages and will display author's name and message
                    return (
                      <div key={message.message}>{message.author}: {message.message}</div>
                    )
                  })}
                  <div className="footer">
                    <input type="text" placeholder="Username" value={username} onChange={ev => this.setState({ username: ev.target.value })} className="form-control" />
                    <br />
                    <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({ message: ev.target.value })} />
                    <br />
                    <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  user: state.auth.currentUser,
  authToken: state.auth.authToken
})
export default connect(mapStateToProps)(Chat);