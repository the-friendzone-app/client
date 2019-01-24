import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';
import {postComment, fetchComments, deleteComment, deleteCommentReset, editingCommentTrue, editingCommentFalse, editComment} from '../actions/community';
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
  
  onEditSubmit(e, commentId){ 
    const editedComment = {
      _id: commentId,
      comment: e.target.editComment.value,
      topic: this.props.match.params.topicId,
      community: this.props.match.params.communityId,
      edited: true
    }
    this.props.dispatch(editingCommentFalse());
    this.props.dispatch(editComment(editedComment))
    .then(() => this.props.dispatch(fetchComments(this.props.match.params.topicId)));
  }

  onDeleteSubmit(commentId){
    const deletionRequest = {
      _id: commentId,
      comment: '[[This comment has been deleted]]',
      topic: this.props.match.params.topicId,
      community: this.props.match.params.communityId,
    }
    this.props.dispatch(deleteComment(deletionRequest))
    .then(() => this.props.dispatch(fetchComments(this.props.match.params.topicId)));
  }


  render(){
    const communityId = this.props.match.params.communityId;
    const community = this.props.community.find(community => community.id == communityId);
    const topicId = this.props.match.params.topicId;
    const topic = this.props.topics.find(topic => topic.id == topicId);
    
    const comments = this.props.comments.map((comment, index) => {
      let timestamp = new Date(comment.updatedAt);
      let fixedTimestamp = timestamp.toString().slice(0,25);
      let userControls;
      if(comment.user === null){
        userControls = (<div></div>)
      }
       else if (this.props.currentUser._id === comment.user._id && comment.user._id !== null){
          userControls = ( 
            <div className='comment-controls'>
              <button>
                <img src={process.env.PUBLIC_URL + '/resources/edit-icon.png'} alt='Edit Your Post' onClick={ e => {
                  e.preventDefault();
                  this.props.dispatch(editingCommentTrue(comment._id));
                }} />
              </button>
              <button>
                <img src={process.env.PUBLIC_URL + '/resources/trash-icon.png'} alt='Delete Your Post' onClick={ e => {
                  e.preventDefault();
                  this.onDeleteSubmit(comment._id);
                }}/>
              </button> 
            </div>)
      }
      
      let userName;
      if(comment.user === null){
        userName = (<p className='comment-status'>deleted</p>)
      } else {
       userName = comment.user.username;
      }

      let commentText;
      if(this.props.editing === true && this.props.editComment === comment._id){
        commentText = (<form className='edit-user-comment-form' onSubmit={(e) => {
          e.preventDefault();
          this.onEditSubmit(e, comment._id);
        }}><textarea name='editComment' className='edit-user-comment' defaultValue={comment.comment}></textarea><button>Submit Edit</button></form>); 
      } else {
        commentText = (<p className='user-comment'>{comment.comment}</p>);
      }

      let edited;
      if(comment.edited === true){
        edited = (<p className='comment-status'>edited</p>);
      }

      return(
        <li className={'comment-'+comment._id} key={index}>
          <section className='comment-card'>
              <div className='commentID'>>>{comment._id}</div>
              <div className='user-plate'>
                User: {userName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Posted At: {fixedTimestamp}&nbsp;&nbsp;&nbsp;{edited}
                {userControls}
              </div>     
              {commentText}
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
    
    let notification;
    if(this.props.deletion === true){
      notification = (
        <div className='comment-notification'>
          <p className='message'>**Your comment has been deleted!**</p>
          <button onClick={()=> this.props.dispatch(deleteCommentReset())}>X</button>
        </div>);
    }


    return (
      <section className="thread">
        <Link to={'/community/'+communityId}><button className='back-button'>Back to {community.mainTitle}</button></Link>
        <div className='topic'>
          <div className='topic-plate'>
            <h3 className='topic-name'>{topic.topicName}</h3>
            <p className='topic-creator'>Created by: {topic.creator.username}</p>
          </div>
          <p>{topic.description}</p>
        </div>
        {notification}
        {thread}
        <form className='add-comment-form' onSubmit={e => {
          e.preventDefault();
          this.onSubmit(e);
        }}>
          <section className='add-comment'>
            <label htmlFor='commentInput' className='commentInput-label'>Post a Comment:</label>
            <textarea cols='80' rows='10'name='commentInput'></textarea>
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
    comments: state.community.comments,
    currentUser: state.auth.currentUser,
    deletion: state.community.deletion,
    editing: state.community.editing,
    editComment: state.community.editComment
  }
}

export default requiresLogin()(connect(mapStateToProps)(Comment));