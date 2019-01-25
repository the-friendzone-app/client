import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchForum, fetchTopic, postComment, fetchComments, deleteComment, deleteCommentReset } from '../actions/community';
import './comment.css';
import { removeReplyTo } from '../actions/comment';
import Comment from './comment';

export class Thread extends React.Component{
  componentDidMount(){
    this.props.dispatch(fetchForum());
    this.props.dispatch(fetchTopic(this.props.match.params.communityId));
    this.props.dispatch(fetchComments(this.props.match.params.topicId));
  }

  
  onSubmit(e){
    let reply;
    if(this.props.replyTo){
      reply = this.props.replyTo;
    }

    const newComment = {
      comment: e.target.commentInput.value,
      topic: this.props.match.params.topicId,
      community: this.props.match.params.communityId,
      replyTo: reply
    }
    e.target.commentInput.value = '';
    this.props.dispatch(removeReplyTo());
    this.props.dispatch(postComment(newComment))
    .then(() => this.props.dispatch(fetchComments(this.props.match.params.topicId)));
  }
  
  
  onDeleteSubmit(commentId){
    const deletionRequest = {
      _id: commentId,
      comment: '[[  This comment has been deleted  :(  ]]',
      topic: this.props.match.params.topicId,
      community: this.props.match.params.communityId,
    }
    this.props.dispatch(deleteComment(deletionRequest))
    .then(() => this.props.dispatch(fetchComments(this.props.match.params.topicId)));
  }


  render(){
    const communityId = this.props.match.params.communityId;
    const community = this.props.community.find(community => community.id === communityId);
    const topicId = this.props.match.params.topicId;
    const topic = this.props.topics.find(topic => topic.id === topicId);
    
    const comments = this.props.comments.map((comment, index) => {
      return(<Comment comment={comment} commentIndex={index} communityId={communityId} topicId={topicId}/>);
    });


    let replyingTo;
    if(this.props.replyTo){
      replyingTo = (<h5>Replying to >>
        <a href={'#comment-'+this.props.replyTo}>{this.props.replyTo}</a>
        <button onClick={this.handleClicked}>X</button>
        </h5>);
    }

    let thread;
    if(this.props.loading === true){
      thread = (
        <div className='loading'>
          <img className='loading-img' src={process.env.PUBLIC_URL + '/resources/loading-thread.png'} alt='Loading Thread...'></img>
          <p className='thread-status'>Loading Thread...</p>
        </div>);
    } else{
      thread = (
        <div>
          <ul className='comments'>{comments}</ul>
          <form id='add-comment-form' className='add-comment-form' onSubmit={e => {
          e.preventDefault();
          this.onSubmit(e);
          }}>
            <section className='add-comment'>
              <label htmlFor='commentInput' className='commentInput-label'>Post a Comment:</label>
              {replyingTo}
              <textarea cols='80' rows='10'name='commentInput'></textarea>
              <button>Submit Comment</button>
            </section>
          </form>
      </div>);
    }

    let notification;
    if(this.props.deletion === true){
      notification = (
        <div className='comment-notification'>
          <p className='message'>**Your comment has been deleted!**</p>
          <button className='delete-reset' onClick={() => this.props.dispatch(deleteCommentReset())}>X</button>
        </div>);
    }

    return (
      <section className="thread">
        <div className='topic'>
          <Link to={'/community/'+communityId}><button className='back-button'>Back to {community ? community.mainTitle : '...'}</button></Link>
          <div className='topic-plate'>
            <h3 className='topic-name'>{topic ? topic.topicName : '...' }</h3>
            <p className='topic-creator'>Created by: {topic ? topic.creator.username : '...'}</p>
          </div>
          <p>{topic ? topic.description : '...'}</p>
          {notification}
        </div>
        {thread}
      </section>
    )
  }

}

function mapStateToProps(state){
  return{
    loading: state.community.loading,
    community: state.community.community,
    topics: state.community.topics,
    comments: state.community.comments,
    currentUser: state.auth.currentUser,
    deletion: state.community.deletion,
    editing: state.community.editing,
    editComment: state.community.editComment,
    replyTo: state.comment.replyTo
  }
}

export default requiresLogin()(connect(mapStateToProps)(Thread));