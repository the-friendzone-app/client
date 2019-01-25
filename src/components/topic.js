import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchForum, fetchTopic, postTopic, addTopicTrue, addTopicFalse } from '../actions/community';

export class Topic extends React.Component{
   
  componentDidMount(){
    let communityLocation = this.props.location.pathname.slice(-24);
    console.log(communityLocation);
    this.props.dispatch(fetchForum())
    .then(() => this.props.dispatch(fetchTopic(this.props.match.params.communityId)));
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
    const community = this.props.community.find(community => community.id == communityId);
    
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
      topicList = (<ul>{topics}</ul>);
    }

    let topicAdd;
    if(this.props.topicAdd === false){
      topicAdd = (
        <div>
        <h4>Is there something you'd like to discuss but don't see it on the topic list?</h4>
        <button onClick={() => this.props.dispatch(addTopicTrue())}>Want to add a topic?</button>  
        </div>)
    } else{
     topicAdd = ( <form className='topic-post' onSubmit={e =>{
        e.preventDefault();
        this.onSubmit(e);
      }}>
        <label htmlFor='topicInput'>Topic:</label>
        <input className='topicInput' name='topicInput' type='text' placeholder='Give the people something to talk about ...'></input>
        <label htmlFor='topicDescription'>Description:</label>
        <textarea name='topicDescription' rows='4' cols='30'></textarea>
        <button>Submit Topic</button>
        <button onClick={() => this.props.dispatch(addTopicFalse())}>Cancel</button> 
      </form>)
    }

    return (
      <section className="Topics">
        <Link to='/community'><button> Back to Communities</button></Link>
        <h3>{community ? community.mainTitle : 'Loading...'}</h3>
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