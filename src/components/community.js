import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import requiresLogin from './requires-login';
import { fetchForum } from '../actions/community';

import NavBar from './nav-bar';
import './comment.css';


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
              <h1><i className="far fa-list-alt"></i> Community</h1>
              <p className='main-div'>
                The Friend Zone’s Community provides members with a place to engage in discussion across a variety of topics. Come share your ideas, rant, or lurk!
                <br/>
                <h3>Our February 2019 Topics are Live!<span className="tooltip"><br/><br/>
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        <span class="tooltiptext">
                           The Friend Zone provides new Topics to discuss every even month.</span>
                    </span></h3><br />
               <span className="side-note">Please remember to follow the <Link className="text" to='/community-guide'>Community Guidelines</Link> when participating in discussions</span> 
              </p><br/><br/>
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