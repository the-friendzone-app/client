import React from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Footer from './footer';


export function LandingPage(props) {
    if (props.loggedIn) {
        return <Redirect to="/dashboard" />;
    }

    return (
        <div className="outer-div">
         <div className="header">
        <div className="header-container">
          <div className="header-row">
          <Link to="/login"><button className="login-button">Login</button></Link>
          </div>
        </div>
      </div>
          <div className="blue-logo"> </div>
            <div className="main-div">
                <h2>Welcome to The Friend Zone!</h2>

              <div className="About">
              <h3>The Friend Zone is made by friends, for friends!</h3><br/>
              <i className="far fa-check-square"></i>    Looking for an escape from the self-centered "reality" of Social Media?<br/><br/>
              <i className="far fa-check-square"></i>    Hoping to make some friends but finding it hard with such a busy schedule?<br/><br/>
              <i className="far fa-check-square"></i>    How about just finding some people with similar interested to hang out with?<br/><br/>
                  <h3>We Got You.</h3> The Friend Zone is here to help you connect with online, in-person, down the street, or from all over the world on a much deeper level!
                  We allow you to be anonymous, and have a safe and friendly environment to connect with others.
                  <p className="warning">*Please be aware: We are very strict with our community guidelines, and moderate all user activity to make sure all users have a private, safe, & fun experience.</p>
              </div>
              <div className="button-box">
                 <Link to="/login"><button className="login-button">Login</button></Link>
                <Link to="/register"><button className="register-button">Register</button></Link>
            </div>
            </div>
          <Footer/>
    </div>
      
    );
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(LandingPage);
