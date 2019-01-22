import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchTopic, fetchComments } from '../actions/community';

export class Topic extends React.Component{
  componentDidMount(){
    console.log( this.props.match.params.communityId);
    this.props.dispatch(fetchTopic(this.props.match.params.communityId));
  }

  render() {
    const communityId = this.props.match.params.communityId;
    const community = this.props.community.find(community => community.id == communityId);
    
    const topics= this.props.topics.map((topic, index) => {
      let topicId = `${this.props.match.url}/${topic.id}`;
      return (
        <li className={'topic-'+topic.title} key={index}>
          <Link to={topicId}>
            <section>
              <div>{topic.title}</div>
              <div>Created By: {topic.creator.username}</div>
              <div>Total Comments:{topic.comments.length}</div>
            </section>
          </Link>
        </li>
      );
    });

    return (
      <section className="Topics">
        <Link to='/community'><button> Back to Communities</button></Link>
        <h3>{community.mainTitle}</h3>
        <ul>{topics}</ul>
      </section>
    )
  }
}

function mapStateToProps(state){
  return{
    community: state.community.community,
    topics: state.community.topics
  }
}

export default requiresLogin()(connect(mapStateToProps)(Topic));