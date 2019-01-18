import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { Link } from 'react-router-dom';

export class Friends extends React.Component {

  render() {
    return (
      <section className="friends-list">
        <h1>Friends List</h1>
        <p>friendships below</p>
        <Link to='/chat'><div>Chat</div></Link>
      </section>
    )
  }
}

export default requiresLogin()(connect()(Friends));