import React from 'react';
import { connect } from 'react-redux';

export class Community extends React.Component {

  render() {
    return (
      <section className="community">
        <h1>Community</h1>
      </section>
    )
  }
}

export default connect()(Community);