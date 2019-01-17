import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class Friends extends React.Component {

  render() {
    return (
      <section className="friends-list">
        <h1>Friends List</h1>
        <p>friendships below</p>
      </section>
    )
  }
}

export default requiresLogin()(connect()(Friends));