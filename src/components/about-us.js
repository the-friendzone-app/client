import React from 'react';
import { connect } from 'react-redux';

import NavBar from './nav-bar';


export class AboutUs extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar /><div className="outer-div">
                    <div className="header-section">
                        <h1><i className="fas fa-hat-wizard"></i> About Us</h1>
                        <p>The Friend Zone Dev Team!</p>
                        </div>
                        <div className="new-div">
                        <div className="about-box">
                        <div className="mary"></div>
                        <b>Mary <a href="https://www.linkedin.com/in/mary-conley-desu/">
                        <i className="fab fa-linkedin"></i></a> 
                        <a href="https://github.com/mkcnly"> <i className="fab fa-github"></i> </a>
                        <a href="https://twitter.com/mkconley"> <i className="fab fa-twitter"></i> </a>
                        </b><br/>
                        I came up with the idea of The Friend Zone when I realized that as connected as we are through technology, 
                        we are somehow also more disconnected than ever. Modern Social Media
                        gives us wonderful platforms of self expression. But the keyword here is self. It's all about ourselves,
                         and I think we've gotten away from the best parts of our society:
                        Communication, Connections, Uplifting one another, and Understanding.
                        I wanted to create an actually social form of Social Media that could allow for 
                        users to become friends on a deeper level. <br/> I worked on the copyrighting for the entire app, the graphic design, and the front and back end for our users, personality polls, and intro-quiz! Feedback? Questions? Hit me up! :]
                        </div>
                        <div className="about-box">
                            <div className="thomas"></div>
                            <b>Thomas <a href="https://www.linkedin.com/in/thomas-chun-99385a95/">
                            <i className="fab fa-linkedin"></i></a>
                            <a href="https://github.com/ThomasChun"> <i className="fab fa-github"></i> </a></b><br/>
                            As a member of The Friend Zone Dev Team, I worked on the meetups feature with the hope
of providing members with a way to connect with users through in person meetups. Users have
the freedom to create their own hosted event or have the option to search the integrated
Eventbrite API to create meetups from scheduled events (concerts, conventions, etc.)
in their local area. I hope you enjoy using the meetups feature and if you have any feedback
or suggestions please feel free to contact me.
                        </div>
                        <div className="about-box">
                            <div className="alex"></div>
                            <b>Alex <a href="https://www.linkedin.com/in/t-alexander-crowell-01885b162/">
                            <i className="fab fa-linkedin"></i></a> 
                            <a href="https://github.com/talexcrowell"> <i className="fab fa-github"></i> </a></b><br/>
                            Taking on the challenge of creating a forum from scratch, the construction
                             of the Community forums has developed into an appreciation and awareness 
                             of how many functions are necessary to create a functional forum space. 
                             The Friend Zone's Community forum is an ever-evolving project with new problems 
                             to solve and features to be added. I'm excited for the opportunity to improve my 
                             skills, learn more to progress the forum, and to make the forum a great place to 
                             have discussions for the Friend Zone Community! If you are interested in 
                             my other projects, please visit my GitHub!
                        </div>
                        <div className="about-box">
                            <div className="logan"></div>
                            <b>Logan <a href="https://www.linkedin.com/in/logan-wang/">
                            <i className="fab fa-linkedin"></i></a>
                            <a href="https://github.com/Logan-WangLW"> <i className="fab fa-github"></i> </a></b><br/>
My main feature was the Friends feature and chat functions.
The suggested list, works by suggesting users via matching profiles and gives the ability to stay anonymous and chat.
I'm excited to continue working on this project. Feel free to contact me if there's any feedback or questions.
                        </div>
                    </div>
                    </div>

            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(AboutUs);
