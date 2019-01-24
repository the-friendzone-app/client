import React from 'react';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchForum } from '../actions/community';

export class Community extends React.Component {
  componentDidMount(){
    this.props.dispatch(fetchForum());
  }

  render() {
    const communities = this.props.community.map((community, index) => {
      let communityId = `/community/${community.id}`;
      return (
        <li className={'community-'+community.mainTitle} key={index} >
        <Link to ={communityId}>
          <div>
            <h3>{community.mainTitle}</h3>
            <div>Total Topics: {community.topics.length}</div>
          </div>
        </Link>
        </li>);
    }); 

    return (
      <div className="dashboard">
      <section className="community">
        <h1>Community</h1>
        <section>
          <ul>
            {communities}
          </ul>
        </section>
      </section>
      </div>
    )
  }
}

function mapStateToProps(state){
  return{
    community: state.community.community
  }
}

export default requiresLogin()(connect(mapStateToProps)(Community));