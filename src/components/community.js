import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchForum } from '../actions/community';
// import './comment.css';
import NavBar from './nav-bar';

export class Community extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchForum());
  }

  render() {

    const communities = this.props.community.map((community, index) => {
      let communityId = `/community/${community.id}`;
      let timestamp = new Date(community.createdAt);
      let fixedTimestamp = timestamp.toString().slice(0, 25);
      return (

        <li className={'community-' + community.mainTitle} key={index} >
          <Link to={communityId}>
            <div className='community'>
              <h3>{community.mainTitle}</h3>
              <p>{community.description}</p>
              <div>Total Topics: {community.topics.length}</div>
              <div>Created At: {fixedTimestamp}</div>
            </div>
          </Link>
        </li>


      )
    });

    return (
      <React.Fragment>
        <NavBar />
        <div className="outer-div">
          <div className="header-section">
            <section className="community-intro" >
              <h1 className='community-title'>Welcome to Community!</h1>
              <p className='community-info'>
                Looking to join an online community or take part in discussions about one of your interests?<br />
                The Friend Zone’s Community provides members with a place to engage in discussion across a variety of topics. Find people that share similar passions and build a community together. Join in discussions across a broad range of categories or create a topic of your own to discuss! The Community will have a rotating set of featured categories that members are encouraged to check out and participate in. Stop wasting time and connect with the community!<br />
                Please remember to follow the <Link to='/communityguidelines'>Community Guidelines</Link> when participating in discussions
              </p>
              <section className='communities'>
                <ul className='communities-list'>
                  {communities}
                </ul>
              </section>
            </section>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

function mapStateToProps(state) {
  return {
    community: state.community.community
  }
}

export default requiresLogin()(connect(mapStateToProps)(Community));