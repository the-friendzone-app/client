import React from 'react';
import { connect } from 'react-redux';

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

export default connect()(Friends);