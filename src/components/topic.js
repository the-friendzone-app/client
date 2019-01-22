import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchTopic, fetchComments, postTopic } from '../actions/community';

export class Topic extends React.Component{
  onSubmit(e){
    const newTopic = {
      topicName: e.target.topicInput.value,
      description: e.target.topicDescription.value,
      community: this.props.match.params.communityId
    }
    e.target.topicInput.value = '';
    e.target.topicDescription.value = '';
    this.props.dispatch(postTopic(newTopic));
    this.props.dispatch(fetchTopic(this.props.match.params.communityId));    
  }

  
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
              <h4>{topic.topicName}</h4>
              <p>{topic.description}</p>
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
        <form className='topic-post' onSubmit={e =>{
          e.preventDefault();
          this.onSubmit(e);
        }}>
          <h4>Want to add a topic?</h4>
          <label htmlFor='topicInput'>Topic:</label>
          <input className='topicInput' name='topicInput' type='text' placeholder='Give the people something to talk about ...'></input>
          <label htmlFor='topicDescription'>Description:</label>
          <textarea name='topicDescription' rows='4' cols='30'></textarea>
          <button>Submit Topic</button>
        </form>
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