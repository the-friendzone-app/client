import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import requiresLogin from './requires-login';
import { fetchSuggested } from '../actions/users';
import NavBar from './nav-bar';

export class CommunityGuidelines extends React.Component {
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <div className="outer-div">
                <h1><i className="fas fa-jedi"></i> Community Guidelines</h1>
                <div className="dotted-line"></div>
                <span className="side-note">
                    <p className='community-guidelines-text'>Thank you for being a member of the Friend Zone! Please review our Community Guidelines to understand the rules of using The Friend Zone</p>
                    <ul className='community-guidelines'>
                    <li className='community-guideline'><i className="far fa-circle"></i> The Friend Zone is not a therapy website. None of it's users nor mods are qualified to give guidance or emotional support. Please seek professional help if you are in need.</li>
                      <li className='community-guideline'><i className="far fa-circle"></i> Friendships through The Friend Zone are strictly platonic. This is not a dating app.</li>
                      <li className='community-guideline'><i className="far fa-circle"></i> No harassment or active bullying of Friend Zone members. We're here to make friends, not to chase people away. </li>
                      <li className='community-guideline'><i className="far fa-circle"></i> No violent language, threats, or self-destructive behavior. Again, we're here to make friends, not to chase people away.</li>
                      <li className='community-guideline'><i className="far fa-circle"></i> No unauthorized sharing of Friend Zone's members' personal information. Information can be shared between Friend Zone members AT the volition of those members.</li>
                      <li className='community-guideline'><i className="far fa-circle"></i> No impersonation of an organization or another individual. Why would you want to be a catfish?</li>
                    </ul><br/>
                    <p className='community-guidelines-text'><b>And the obvious rules...</b></p>
                    <br/>
                    <ul className='community-guidelines'>
                      <li className='community-guideline'><i className="far fa-circle"></i> No illegal activities allowed.</li>
                      <li className='community-guideline'><i className="far fa-circle"></i> No spam, scams, and other malicious conduct.</li>
                      <li className='community-guideline'><i className="far fa-circle"></i> No nudity, pornography, and other sexual content.</li>
                      <li className='community-guideline'><i className="far fa-circle"></i> No extreme violence, gore, and other obscene conduct.</li>
                      <li className='community-guideline'><i className="far fa-circle"></i> No sharing of content without permission from the copyright owners.</li>
                    </ul><br/><br/>
                    <p> If you find anyone to be violating any of our Community Guidelines, please report them right away.<br/><br/>
                    Thank you<br/><br/>
                    - The Friend Zone Dev Team</p>
                   
                    </span>

                </div>
               
            </React.Fragment>
        );
    }
}


const mapStateToProps = state => ({
    loggedIn: state.auth.currentUser !== null
});

export default connect(mapStateToProps)(CommunityGuidelines);
