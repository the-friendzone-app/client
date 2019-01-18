import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export class Community extends React.Component {

  render() {
    const communities = this.props.community.map((community, index) => {
      let communityId = `/community/${community.id}`;
      return (
        <li className={'community-'+community.mainTitle}>
        <Link to ={communityId}>
          <div>
            <h3>{community.mainTitle}</h3>
            <div>Total Topics: {community.topics.length}</div>
          </div>
        </Link>
        </li>);
    }); 

    return (
      <section className="community">
        <h1>Community</h1>
        <section>
          <ul>
            {communities}
          </ul>
        </section>
      </section>
    )
  }
}

function mapStateToProps(state){
  return{
    community: state.community.community
  }
}

export default requiresLogin()(connect(mapStateToProps)(Community));