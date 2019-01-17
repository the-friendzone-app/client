import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import {registerUser} from '../actions/users';
import {login} from '../actions/auth';
import Input from './input';
import {required, nonEmpty, matches, length, isTrimmed} from '../validators';
const passwordLength = length({min: 10, max: 72});
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const {username, password, firstName, lastName, selfType, preferenceType } = values;
        const user = {username, password, firstName, lastName, selfType, preferenceType};
        console.log('self type:', selfType)
        console.log('preference type:', preferenceType)
        return this.props
            .dispatch(registerUser(user))
            .then((res) => {
                if (res.hasOwnProperty('message')) {
                    alert(res.message);
                } else {
                    this.props.dispatch(login(username, password))
                }
            });
    }

    render() {
        return (
            <form
                className="login-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="username">Username</label>
                <Field
                    component={Input}
                    type="text"
                    name="username"
                    id="username"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="password">Password</label>
                <Field
                    component={Input}
                    type="password"
                    name="password"
                    id="password"
                    validate={[required, passwordLength, isTrimmed]}
                />
                <label htmlFor="passwordConfirm">Confirm password</label>
                <Field
                    component={Input}
                    type="password"
                    name="passwordConfirm"
                    id="passwordConfirm"
                    validate={[required, nonEmpty, matchesPassword]}
                />
                <label htmlFor="selfType">Please identify the type of user you would like to be identified as:</label>
                <div>
                    <label><Field name="selfType" id="selfTypeTalker" component={Input} type="radio" value="talker"/> Talker</label>
                    <label><Field name="selfType" id="selfTypeListener" component={Input} type="radio" value="listener"/> Listener</label>
                    <label><Field name="selfType" id="selfTypeBoth" component={Input} type="radio" value="both"/> Both</label>
                </div>
                <label htmlFor="preferredType">Please identify that type of user you would prefer to interact with:</label>
                <div>
                    <label><Field name="preferenceType" id="preferenceTypeTalker" component={Input} type="radio" value="talker"/> Talker</label>
                    <label><Field name="preferenceType" id="preferenceTypeListener" component={Input} type="radio" value="listener"/> Listener</label>
                    <label><Field name="preferenceType" id="preferenceTypeBoth" component={Input} type="radio" value="both"/> Both</label>
                </div>
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Register
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'registration',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('registration', Object.keys(errors)[0]))
})(RegistrationForm);
