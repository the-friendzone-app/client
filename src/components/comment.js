import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';
import requiresLogin from './requires-login';
import {postComment, fetchComments, deleteComment} from '../actions/community';
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
  
  onDeleteSubmit(commentId){
    const deletionRequest = {
      _id: commentId,
      comment: 'This comment has been deleted',
      topic: this.props.match.params.topicId,
      community: this.props.match.params.communityId,
    }
    console.log(deletionRequest);
    this.props.dispatch(deleteComment(deletionRequest))
    .then(() => this.props.dispatch(fetchComments(this.props.match.params.topicId)));
  }

  render(){
    const communityId = this.props.match.params.communityId;
    const community = this.props.community.find(community => community.id == communityId);
    const topicId = this.props.match.params.topicId;
    const topic = this.props.topics.find(topic => topic.id == topicId);
    
    const comments = this.props.comments.map((comment, index) => {
      let timestamp = new Date(comment.createdAt);
      let fixedTimestamp = timestamp.toString().slice(0,25);
      let userControls;
      if(comment.user === null){
        userControls = (<div></div>)
      }
       else if (this.props.currentUser._id === comment.user._id && comment.user._id !== null){
          userControls = ( 
            <div className='comment-controls'>
              <button>
                <img src={process.env.PUBLIC_URL + '/resources/edit-icon.png'} alt='Edit Your Post' />
              </button>
              <button>
                <img src={process.env.PUBLIC_URL + '/resources/trash-icon.png'} alt='Delete Your Post' onClick={ e => {
                  e.preventDefault();
                  this.onDeleteSubmit(comment._id);
                }}/>
              </button> 
            </div>)
      } else {
        userControls = (<div></div>)
      }
      
      let userName;
      if(comment.user === null){
        userName = 'deleted';
      } else {
       userName = comment.user.username;
      }

      return(
        <li className={'comment-'+comment._id} key={index}>
          <section className='comment-card'>
              <div className='commentID'>>>{comment._id}</div>
              <div className='user-plate'>
                User: {userName}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Posted At: {fixedTimestamp}
                {userControls}
              </div>     
              <p className='user-comment'>{comment.comment}</p>
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
        <Link to={'/community/'+communityId}><button className='back-button'>Back to {community.mainTitle}</button></Link>
        <div className='topic'>
          <div className='topic-plate'>
            <h3 className='topic-name'>{topic.topicName}</h3>
            <p className='topic-creator'>Created by: {topic.creator.username}</p>
          </div>
          <p>{topic.description}</p>
        </div>
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
    currentUser: state.auth.currentUser
  }
}

export default requiresLogin()(connect(mapStateToProps)(Comment));