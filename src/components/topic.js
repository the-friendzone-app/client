import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import Comment from './comment';
import { fetchTopic } from '../actions/community';

export class Topic extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchTopic());
  }

  render() {
    const communityId = this.props.match.params.communityId;
    const community = this.props.community.find(community => community.id == communityId);
    
    const topics= community.topics.map(topic => {
      let topicId = `/community/${communityId}/${topic.id}`;
      return (
        <li>
          <Link to={topicId}>
            <section>
              <div>{topic.title}</div>
              <div>Created By: {topic.creatorUser}</div>
              <div>Total Comments:{topic.comments.length}</div>
            </section>
          </Link>
        </li>
      );
    });

    return (
      <section className="Topics">
        <h3>{community.mainTitle}</h3>
        <ul>{topics}</ul>
      </section>
    )
  }
}

function mapStateToProps(state, props){
  return{
    community: state.community.community
  }
}

export default requiresLogin()(connect(mapStateToProps)(Topic));