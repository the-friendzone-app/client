import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { required, nonEmpty, isTrimmed } from '../validators';
import 'react-widgets/dist/css/react-widgets.css';
import { DateTimePicker } from 'react-widgets';
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment';
import { createUserMeetup } from '../actions/meetups';
// import './meetup-form.css';

momentLocalizer(moment);

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
    <DateTimePicker
        onChange={onChange}
        time={showTime}
        value={!value ? null : new Date(value)}
    />

export class MeetupForm extends React.Component {

    
    onSubmit(values) {
        let createdBy = this.props.currentUsername;
        const { name, location, description, startTime, endTime } = values;
        const newMeetup = { name, location, description, startTime, endTime, createdBy };
        this.props.dispatch(createUserMeetup(newMeetup));
    }

    render() {
        return (
            <form
                className="meetup-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <div>
                    <label htmlFor="name">Meetup Name</label>
                    <Field
                        component={Input}
                        type="text"
                        name="name"
                        id="name"
                        validate={[required, nonEmpty, isTrimmed]}
                    />
                </div>
                <div>
                    <label htmlFor="location">Location</label>
                    <Field
                        component={Input}
                        type="text"
                        name="location"
                        id="location"
                        validate={[required, nonEmpty, isTrimmed]}
                    />
                </div>
                <div>
                    <label htmlFor="description">Description</label><br/>
                    <Field
                        component="textarea"
                        type="text"
                        name="description"
                        id="description"
                        validate={[required, nonEmpty]}
                    />
                </div>
                <div>
                    <label>Start Time</label>
                    <Field
                        name="startTime"
                        id="startTime"
                        component={renderDateTimePicker}
                        validate={[required]}
                    />
                </div>
                <div>
                    <label>End Time</label>
                    <Field
                        name="endTime"
                        id="endTime"
                        component={renderDateTimePicker}
                        validate={[required]}
                    />
                </div>
                <button className="solar-button"
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Create Meetup
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'meetup',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('meetup', Object.keys(errors)[0]))
})(MeetupForm);