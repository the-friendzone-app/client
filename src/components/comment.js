import React from 'react';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';

export function Comment (props){
  const communityId = props.match.params.communityId;
  const topicId = props.match.params.topicId;
  const topic = props.topics.find(topic => topic.id == topicId);
  
  const comments = topic.comments.map(comment => {
    return(
      <li className={'comment-'+comment.id}>
        <p>{comment.comment}</p>
        <div>{comment.user}</div>
      </li>
    );
  });

  return (
    <section className="thread">
      <div>
        <h3>Discussion: {topic.title}</h3>
        <p>{topic.description}</p>
        <p>Created by: {topic.creatorUser}</p>
      </div>
      <ul className='comments'>{comments}</ul>
    </section>
  )
  
}

function mapStateToProps(state){
  return{
    community: state.community.community,
    topics: state.community.topics
  }
}

export default requiresLogin()(connect(mapStateToProps)(Comment));