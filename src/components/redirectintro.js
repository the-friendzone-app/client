import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

export function RedirectIntro(props) {
    let intro = this.props.intro;
    if (!intro) {
        return <Redirect to="/intro-quiz" />;
    }

}
const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps)(RedirectIntro);