import React from 'react';
import {Field, reduxForm, focus} from 'redux-form';
import Input from './input';
import {required, nonEmpty, isTrimmed} from '../validators';

import 'react-widgets/dist/css/react-widgets.css';
import { DropdownList, DateTimePicker } from 'react-widgets';
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment';

momentLocalizer(moment);

const renderDropdownList = ({ input, data, valueField, textField }) =>
  <DropdownList {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange} />

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
<DateTimePicker
  onChange={onChange}
  time={showTime}
  value={!value ? null : new Date(value)}
/>

const meetupType = [ { meetupType: 'In Person' }, { meetupType: 'Online' }]

export class EventForm extends React.Component {
    onSubmit(values) {
        console.log(values);
    }

    render() {
        return (
            <form
                className="event-form"
                onSubmit={this.props.handleSubmit(values =>
                    this.onSubmit(values)
                )}>
                <div>
                  <label htmlFor="eventName">Event Name</label>
                  <Field
                      component={Input}
                      type="text"
                      name="eventName"
                      id="eventName"
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
                  <label>Meetup Type</label>
                  <Field
                    name="meetupType"
                    component={renderDropdownList}
                    data={meetupType}
                    valueField="value"
                    textField="meetupType"
                    validate={[required]}
                    />
                </div>
                <div>
                  <label htmlFor="eventDescription">Event Description</label>
                  <Field
                      component="textarea"
                      type="text"
                      name="eventDescription"
                      id="eventDescription"
                      validate={[required, nonEmpty]}
                  />
                </div>
                <div>
                  <label>Event Start Time</label>
                  <Field
                    name="eventStartTime"
                    id="eventStartTime"
                    component={renderDateTimePicker}
                  />
                </div>
                <div>
                  <label>Event End Time</label>
                  <Field
                    name="eventEndTime"
                    id="eventStartTime"
                    component={renderDateTimePicker}
                  />
                </div>
                <button
                    type="submit"
                    disabled={this.props.pristine || this.props.submitting}>
                    Create Event
                </button>
            </form>
        );
    }
}

export default reduxForm({
    form: 'event',
    onSubmitFail: (errors, dispatch) =>
        dispatch(focus('event', Object.keys(errors)[0]))
})(EventForm);