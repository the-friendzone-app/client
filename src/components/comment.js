import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';
import {postComment, fetchComments} from '../actions/community';
import './comment.css';

export class Comment extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchComments(this.props.match.params.topicId));
  }
  
  onSubmit(e){
    const newComment = {
      comment: e.target.commentInput.value,
      topic: this.props.match.params.topicId,
      community: this.props.match.params.communityId
    }
    e.target.commentInput.value = '';
    this.props.dispatch(postComment(newComment))
    .then(() => this.props.dispatch(fetchComments(this.props.match.params.topicId)));
  }

  render(){
    const communityId = this.props.match.params.communityId;
    const community = this.props.community.find(community => community.id == communityId);
    const topicId = this.props.match.params.topicId;
    const topic = this.props.topics.find(topic => topic.id == topicId);
    
    const comments = this.props.comments.map((comment, index) => {
      let timestamp = new Date(comment.createdAt);
      console.log(timestamp)
      return(
        <li className={'comment-'+comment.id} key={index}>
          <section className='comment-card'>
            <div>{comment.user.username}</div>
            <div>{comment.createdAt}</div>
            <p>{comment.comment}</p>
          </section>
        </li>
      );
    });

    let thread;
    if(this.props.loading === true){
      thread = (<div className='loading'>Loading Thread...</div>);
    } else{
      thread = (<ul className='comments'>{comments}</ul>);
    }

    return (
      <section className="thread">
        <Link to={'/community/'+communityId}><button>Back to {community.mainTitle}</button></Link>
        <div>
          <h3>Discussion: {topic.topicName}</h3>
          <p>{topic.description}</p>
          <p>Created by: {topic.creator.username}</p>
        </div>
        {thread}
        <form className='add-comment-form' onSubmit={e => {
          e.preventDefault();
          this.onSubmit(e);
        }}>
          <section className='add-comment'>
            <label htmlFor='commentInput'>Post a Comment:</label>
            <textarea name='commentInput'></textarea>
            <button>Submit Comment</button>
          </section>
        </form>
      </section>
    )
  }

}

function mapStateToProps(state){
  return{
    loading: state.community.loading,
    community: state.community.community,
    topics: state.community.topics,
    comments: state.community.comments
  }
}

export default requiresLogin()(connect(mapStateToProps)(Comment));