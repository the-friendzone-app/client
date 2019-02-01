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
                    <p className='community-guidelines-text'>Thank you for being a member of the Friend Zone! Please review our Community Guidelines to understand the rules of using The Friend Zone</p>
                    <ul className='community-guidelines'>
                      <li className='community-guideline'>Friendships through The Friend Zone are strictly platonic. This is not a dating app.</li>
                      <li className='community-guideline'>No harassment or active bullying of Friend Zone members. We're here to make friends, not to chase people away. </li>
                      <li className='community-guideline'>No violent language, threats, or self-destructive behavior. Again, we're here to make friends, not to chase people away.</li>
                      <li className='community-guideline'>No unauthorized sharing of Friend Zone's members' personal information. Information can be shared between Friend Zone members AT the volition of those members.</li>
                      <li className='community-guideline'>No impersonation of an organization or another individual. Why would you want to be a catfish?</li>
                    </ul>
                    <p className='community-guidelines-text'>And the obvious rules...</p>
                    <ul className='community-guidelines'>
                      <li className='community-guideline'>No illegal activities allowed.</li>
                      <li className='community-guideline'>No spam, scams, and other malicious conduct.</li>
                      <li className='community-guideline'>No nudity, pornography, and other sexual content.</li>
                      <li className='community-guideline'>No extreme violence, gore, and other obscene conduct.</li>
                      <li className='community-guideline'>No sharing of content without permission from the copyright owners.</li>
                    </ul>
                    {/* <div>button example: <button className="register-button2">Message from user 2Message from user 2Message from user 2Message from user 2Message from user 2</button><button className="register-button3">Message from user 1</button></div> */}
                </div>
               
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    const { currentUser } = state.auth;
    return {
        username: state.auth.currentUser.username,
        hashedUsername: state.auth.currentUser.hashedUsername,
        name: `${currentUser.firstName} ${currentUser.lastName}`,
        loggedIn: state.auth.currentUser !== null,
    };
};
export default requiresLogin()(connect(mapStateToProps)(CommunityGuidelines));