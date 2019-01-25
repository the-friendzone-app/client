import React from 'react';
import { Field, reduxForm } from 'redux-form';
import Input from './input';
import { DropdownList, Multiselect, DateTimePicker } from 'react-widgets';
import moment from 'moment'
import momentLocalizer from 'react-widgets-moment';

momentLocalizer(moment);

const renderDropdownList = ({ input, data, valueField, textField }) =>
  <DropdownList {...input}
    data={data}
    valueField={valueField}
    textField={textField}
    onChange={input.onChange} />

const renderMultiselect = ({ input, data, valueField, textField }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    value={input.value || []} // requires value to be an array
    data={data}
    valueField={valueField}
    textField={textField}
  />

const renderDateTimePicker = ({ input: { onChange, value }, showTime }) =>
  <DateTimePicker
    onChange={onChange}
    time={showTime}
    value={!value ? null : new Date(value)}
  />

export class EventSearchForm extends React.Component {

  onSubmit(value) {
    
    console.log(value);

    let latitude = this.props.currentLocation.latitude;
    let longitude = this.props.currentLocation.longitude
    let search = value.userSearch;
    let searchDistance = (value.userSearchDistance.value === undefined ? '' : value.userSearchDistance.value)
    let price = (value.userSearchPrice.value === undefined ? '' : value.userSearchPrice.value);
    // multi-entry possible map through array to get category values
    let categories = value.userSearchCategories;
    if (categories.length >= 1) {
      categories = categories.map(category => category.value).toString();
    }
    // multi-entry possible map through array to get formats values
    let formats = value.userSearchFormat;
    if (formats.length >= 1) {
      formats = formats.map(format => format.value).toString();
    }
    // use charAt to make sure it's returning date not 'Invalid Date'
    let startTime = moment(value.startTime).format();
    startTime = (startTime.charAt(0) === 'I' && startTime.charAt(1) === 'n' ? '' : startTime );
    let endTime = moment(value.endTime).format().toString();
    endTime = (endTime.charAt(0) === 'I' && endTime.charAt(1) === 'n' ? '' : endTime );

    console.log('latitude:', this.props.currentLocation.latitude);
    console.log('longitude:', this.props.currentLocation.longitude);
    console.log('search:', value.userSearch);
    console.log('distance:', searchDistance);
    console.log('price:', price);
    console.log('categories:', categories);
    console.log('formats:', formats);
    console.log('start time:', startTime);
    console.log('end time:', endTime);

    let userEventSearch = { latitude, longitude, search, searchDistance, price, categories, formats, startTime, endTime };

  }

  render() {

    // consider allowing user to search events after / before inputted search dates.
    const distanceOptions = [{ name: '1 miles', value: '1mi' }, { name: '2 miles', value: '2mi' }, { name: '3 miles', value: '3mi' }, { name: '4 miles', value: '4mi' }, { name: '5 miles', value: '5mi' },
    { name: '10 miles', value: '10mi' }, { name: '15 miles', value: '15mi' }, { name: '20 miles', value: '20mi' }, { name: '25 miles', value: '25mi' }, { name: '50 miles', value: '50mi' },
    { name: '75 miles', value: '75mi' }, { name: '100 miles', value: '100mi' }];

    const priceOptions = [{ value: 'free' }, { value: 'paid' }];

    const categoryOptions = [{ name: 'Auto, Boat & Air', value: 118 }, { name: 'Business & Professional', value: 101 }, { name: 'Charity & Causes', value: 111 }, { name: 'Community & Culture', value: 113 },
      { name: 'Family & Education', value: 115 }, { name: 'Fashion & Beauty', value: 106 }, { name: 'Film, Media & Entertainment', value: 104 }, { name: 'Food & Drink', value: 110 },
      { name: 'Government & Politics', value: 112 }, { name: 'Health & Wellness', value: 107 }, { name: 'Hobbies & Special Interest', value: 119 }, { name: 'Home & Lifestyle', value: 117 },
      { name: 'Music', value: 103 }, { name: 'Performing & Visual Arts', value: 105 }, { name: 'Religion & Spirituality', value: 114 }, { name: 'School Activities', value: 120 },
      { name: 'Science & Technology', value: 102 }, { name: 'Seasonal & Holiday', value: 116 }, { name: 'Sports & Fitness', value: 108 }, { name: 'Travel & Outdoor', value: 109 }, { name: 'Other', value: 199 }];

    const formatOptions = [{ name: 'Appearance or Signing', value: 19 }, { name: 'Attraction', value: 17 }, { name: 'Camp, Trip, or Retreat', value: 18 }, { name: 'Class, Training, or Workshop', value: 9 },
      { name: 'Concert or Performance', value: 6 }, { name: 'Conference', value: 1 }, { name: 'Convention', value: 4 }, { name: 'Dinner or Gala', value: 8 }, { name: 'Festival or Fair', value: 5 },
      { name: 'Game or Competition', value: 14 }, { name: 'Meeting or Networking Event', value: 10 }, { name: 'Party or Social Gathering', value: 11 }, { name: 'Race or Endurance Event', value: 15 },
      { name: 'Rally', value: 12 }, { name: 'Screening', value: 7 }, { name: 'Seminar or Talk', value: 2 }, { name: 'Tour', value: 16 }, { name: 'Tournament', value: 13 }, { name: 'Tradeshow, Consumer Show, or Expo', value: 3 }, { name: 'Other', value: 100 }];

    return (
      <form
        className="event-search-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        <div>
          <label htmlFor="userSearch">Enter Search:</label>
          <Field
            component={Input}
            type="text"
            name="userSearch"
            id="userSearch"
          />
        </div>
        <div>
          <label htmlFor="userSearchDistance">Set Search Distance (optional): </label>
          <Field
            component={renderDropdownList}
            name="userSearchDistance"
            id="userSearchDistance"
            data={distanceOptions}
            textField="name"
            valueField="value"
          />
        </div>
        <div>
          <label htmlFor="userSearchPrice"> Price Options (optional): </label>
          <Field
            component={renderDropdownList}
            name="userSearchPrice"
            id="userSearchPrice"
            data={priceOptions}
            textField="value"
            valueField="value"
          />
        </div>
        <div>
          <label htmlFor="userSearchCategories">Categories (optional): </label>
          <Field
            component={renderMultiselect}
            name="userSearchCategories"
            id="userSearchCategories"
            data={categoryOptions}
            textField="name"
            valueField="value"
          />
        </div>
        <div>
          <label htmlFor="userSearchFormat">Formats (optional): </label>
          <Field
            component={renderMultiselect}
            name="userSearchFormat"
            id="userSearchFormat"
            data={formatOptions}
            textField="name"
            valueField="value"
          />
        </div>
        <div>
          <label>Search events after this date (optional):</label>
          <Field
            name="startTime"
            id="startTime"
            component={renderDateTimePicker}
          />
        </div>
        <div>
          <label>Search events until this date (optional):</label>
          <Field
            name="endTime"
            id="endTime"
            component={renderDateTimePicker}
          />
        </div>
        <button type="submit" disabled={this.props.submitting}>Search Events</button>
        <button type="button" disabled={this.props.pristine || this.props.submitting} onClick={() => this.props.reset()}>Reset Search</button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'event-search-form',
  initialValues: {
    userSearch: '',
    userSearchDistance: '',
    userSearchPrice: '',
    userSearchCategories: '',
    userSearchFormat: '',
    startTime: '',
    endTime: '',
  }
})(EventSearchForm);