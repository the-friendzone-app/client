import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import { registerUser } from '../actions/users';
import { login } from '../actions/auth';
import Input from './input';
import { required, nonEmpty, matches, length, isTrimmed } from '../validators';
const passwordLength = length({ min: 10, max: 72 });
const matchesPassword = matches('password');

export class RegistrationForm extends React.Component {
    onSubmit(values) {
        const { email, username, password, firstName, lastName, selfType, preferenceType } = values;
        const user = { email, username, password, firstName, lastName, selfType, preferenceType };
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
                className="registration-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <label htmlFor="email">Email</label>
                <Field
                    component={Input}
                    type="text"
                    name="email"
                    id="email"
                    validate={[required, nonEmpty, isTrimmed]}
                />
                <label htmlFor="username">Username
                 <span className="tooltip">
                        <i className="fa fa-info-circle" aria-hidden="true"></i>
                        <span class="tooltiptext">
                            Your username will be kept private. We will provide you a
                 Friend Zone Username to use inside The Friend Zone!</span>
                    </span>
                </label>
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
                    <label><Field name="selfType" property="I am a Talker" className="btn-radio" id="selfTypeTalker" component={Input} type="radio" value="talker" /></label>
                    <label><Field name="selfType" property="I am a Listener" className="btn-radio" id="selfTypeListener" component={Input} type="radio" value="listener" /></label>
                    <label><Field name="selfType" property="I am Both" className="btn-radio" id="selfTypeBoth" component={Input} type="radio" value="both" /></label>
                </div>
                <label htmlFor="preferredType">Please identify that type of user you would prefer to interact with:</label>
                <div>
                    <label><Field name="preferenceType" property="I'd like to match with 'Talkers'" className="btn-radio" id="preferenceTypeTalker" component={Input} checked="checked" type="radio" value="talker" /></label>
                    <label><Field name="preferenceType" property="I'd like to match with 'Listeners'" className="btn-radio" id="preferenceTypeListener" component={Input} type="radio" value="listener" /></label>
                    <label><Field name="preferenceType" property="I'd like to match with Both" className="btn-radio" id="preferenceTypeBoth" component={Input} type="radio" value="both" /></label>
                </div>
                <button className="login-button"
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
