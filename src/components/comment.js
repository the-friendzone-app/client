import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';
import {postComment, fetchComments, deleteComment, deleteCommentReset, editingCommentTrue, editingCommentFalse, editComment} from '../actions/community';
import './comment.css';
import { addReplyTo, removeReplyTo } from '../actions/comment';

export class Comment extends React.Component{
  
  onSubmit(e){
    let reply;
    if(this.props.replyTo){
      reply = this.props.replyTo;
    }

    const newComment = {
      comment: e.target.commentInput.value,
      topic: this.props.topicId,
      community: this.props.communityId,
      replyTo: reply
    }
    e.target.commentInput.value = '';
    this.props.dispatch(removeReplyTo());
    this.props.dispatch(postComment(newComment))
    .then(() => this.props.dispatch(fetchComments(this.props.topicId)));
  }
  
  onEditSubmit(e, commentId){ 
    const editedComment = {
      _id: commentId,
      comment: e.target.editComment.value,
      topic: this.props.topicId,
      community: this.props.communityId,
      edited: true
    }
    this.props.dispatch(editingCommentFalse());
    this.props.dispatch(editComment(editedComment))
    .then(() => this.props.dispatch(fetchComments(this.props.topicId)));
  }

  onDeleteSubmit(commentId){
    const deletionRequest = {
      _id: commentId,
      comment: '[[  This comment has been deleted  :(  ]]',
      topic: this.props.topicId,
      community: this.props.communityId,
    }
    this.props.dispatch(deleteComment(deletionRequest))
    .then(() => this.props.dispatch(fetchComments(this.props.topicId)));
  }


  render(){
    let timestamp = new Date(this.props.comment.updatedAt);
    let fixedTimestamp = timestamp.toString().slice(0,25);
    let userControls;
    let commentId = this.props.comment._id;
    if(this.props.comment.user === null){
      userControls = (<div></div>);
    } 
    else if (this.props.currentUser._id === this.props.comment.user._id && this.props.comment.user._id !== null) {
        userControls = ( 
          <div className='comment-controls'>
            <button class='comment-button'>
              <img src={process.env.PUBLIC_URL + '/resources/edit-icon.png'} alt='Edit Your Post' onClick={ e => {
                e.preventDefault();
                this.props.dispatch(editingCommentTrue(this.props.comment._id));
              }} />
            </button>
            <button class='comment-button'>
              <img src={process.env.PUBLIC_URL + '/resources/trash-icon.png'} alt='Delete Your Post' onClick={ e => {
                e.preventDefault();
                this.onDeleteSubmit(this.props.comment._id);
              }}/>
            </button> 
          </div>);
    }
    
    let userName;
    if(this.props.comment.user === null){
      userName = (<p className='comment-status'>deleted</p>)
    } else {
      userName = this.props.comment.user.username;
    }

    let commentText;
    if(this.props.editing === true && this.props.editComment === this.props.comment._id){
      commentText = (<form className='edit-user-comment-form' onSubmit={(e) => {
        e.preventDefault();
        this.onEditSubmit(e, this.props.comment._id);
      }}><textarea name='editComment' className='edit-user-comment' defaultValue={this.props.comment.comment}></textarea><button>Submit Edit</button></form>); 
    } else {
      commentText = (<p className='user-comment'>{this.props.comment.comment}</p>);
    }

    let edited;
    if(this.props.comment.edited === true){
      edited = (<p className='comment-status'>edited</p>);
    }

    let replyTo;
    if(this.props.comment.replyTo){
      replyTo = (<a className='replyCommentId'href={'#comment-'+this.props.comment.replyTo}>Replying To>>{this.props.comment.replyTo}</a>);
    }
    
    const responses = this.props.comment.responses.map(response => {
      return(
        <li className='response' key={'response'+response}><a href={'#comment-'+response}>>>{response}</a></li>
        );
    });
    
    
    let responseList;
    if(this.props.comment.responses.length > 0){
      responseList = (<div className='response-list'>Responses:<ul className='responses'>{responses}</ul></div>);
    }
    
    
    return(
      <li id={'comment-'+this.props.comment._id} className='comment' key={this.props.commentIndex}>
        <section className='comment-card'>
            <a className='commentID' href='#add-comment-form' onClick={() => this.props.dispatch(addReplyTo(this.props.comment._id))}>>>{this.props.comment._id}</a>
            <div className='user-plate'>
              User: {userName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Posted At: {fixedTimestamp}&nbsp;&nbsp;&nbsp;{edited}
              {userControls}
            </div>
            {replyTo}     
            {commentText}
            {responseList}
        </section>
      </li>
    );
  };
  

}

function mapStateToProps(state){
  return{
    loading: state.community.loading,
    community: state.community.community,
    topics: state.community.topics,
    currentUser: state.auth.currentUser,
    deletion: state.community.deletion,
    editing: state.community.editing,
    editComment: state.community.editComment,
    replyTo: state.comment.replyTo
  }
}

export default requiresLogin()(connect(mapStateToProps)(Comment));