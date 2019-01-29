import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchForum, fetchTopic, postTopic, addTopicTrue, addTopicFalse } from '../actions/community';

export class Topic extends React.Component{
   
  componentDidMount(){
    this.props.dispatch(fetchForum())
    .then(() => this.props.dispatch(fetchTopic(this.props.location.pathname.slice(-24))));
  }


  onSubmit(e){
    const newTopic = {
      topicName: e.target.topicInput.value,
      description: e.target.topicDescription.value,
      community: this.props.match.params.communityId
    }
    e.target.topicInput.value = '';
    e.target.topicDescription.value = '';
    this.props.dispatch(postTopic(newTopic))
    .then(() => this.props.dispatch(fetchTopic(this.props.match.params.communityId)));    
  }

  render() {
    const communityId = this.props.match.params.communityId;
    const community = this.props.community.find(community => community.id === communityId);
    const topics= this.props.topics.map((topic, index) => {
      let topicId = `${this.props.match.url}/${topic.id}`;
      return (
        <li className={'topic-'+topic.title} key={index}>
          <Link to={topicId}>
            <section className= 'topic-card'>
              <h4>{topic.topicName}</h4>
              <div>Created By: {topic.creator.username}</div>
              <p>{topic.description}</p>
              <div>Total Comments:{topic.comments.length}</div>
            </section>
          </Link>
        </li>
      );
    });

    let topicList;
    if(this.props.loading === true){
      topicList = (<div className='loading'>Loading Topics...</div>);
    } else {
      topicList = (<ul className='topics-list'>{topics}</ul>);
    }

    let topicAdd;
    if(this.props.topicAdd === false){
      topicAdd = (
        <div>
        <h4>Is there something you'd like to discuss but don't see it on the topic list?</h4>
        <button onClick={() => this.props.dispatch(addTopicTrue())}>Want to add a topic?</button>  
        </div>)
    } else{
     topicAdd = ( <form className='add-topic-form' onSubmit={e =>{
        e.preventDefault();
        this.onSubmit(e);
      }}>
        <div className='topic-title-input'>
          <label htmlFor='topicInput'>Topic:  </label>
          <input className='topicInput' name='topicInput' type='text' placeholder='Enter a topic!'></input>
        </div>
        <div className='topic-description-input'>
          <label htmlFor='topicDescription'>Description:  </label>
          <textarea name='topicDescription' className='topicDescription' placeholder='Describe your topic!'></textarea>
        </div>
        <button>Submit Topic</button>
        <button onClick={() => this.props.dispatch(addTopicFalse())}>Cancel</button> 
      </form>)
    }

    return (
      <section className="topics">
        <Link to='/community'><button> Back to Communities</button></Link>
        <h3 className='community-title'>{community ? community.mainTitle : 'Loading...'}</h3>
        <div className='community-description'>
          <p>{community ? community.description : 'Loading...'}</p>
        </div>
        {topicList}
        {topicAdd}
      </section>
    )
  }
}

function mapStateToProps(state){
  return{
    community: state.community.community,
    topics: state.community.topics,
    loading: state.community.loading,
    topicAdd: state.community.topicAdd
  }
}

export default requiresLogin()(connect(mapStateToProps)(Topic));