import React from 'react';
import { Field, reduxForm, focus } from 'redux-form';
import Input from './input';
import { updateUserLocation, fetchUserLocation } from '../actions/meetups';

export class SetLocationForm extends React.Component {

  componentDidMount() {
    this.props.dispatch(fetchUserLocation());
  }

  onSubmit(value) {
    const { dispatch, userId } = this.props;
    const GEOCODE_API_KEY = process.env.REACT_APP_GEOCODE_API_KEY;

    fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${value.userLocation}&key=${GEOCODE_API_KEY}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      }
    })
      .then(res => res.json())
      .then(res => {
        res = res.results[0]
        // console.log('on submit results', res);
        let location = res.formatted_address;
        let latitude = res.geometry.location.lat;
        let longitude = res.geometry.location.lng;
        let locationData = { location, latitude, longitude, userId };
        dispatch(updateUserLocation(locationData));
      })

  }

  render() {
    const { currentLocation } = this.props;
    let locationPrompt;
    if (!currentLocation) {
      locationPrompt = <p>Set your current location in the input field below!</p>
    }

    if (currentLocation !== undefined) {
      locationPrompt = <p>Your current location is set to:<br /><b>{currentLocation.location}</b> <br />Lat: {currentLocation.latitude} Long: {currentLocation.longitude}</p>
    }

    return (
      <form
        className="set-location-form"
        onSubmit={this.props.handleSubmit(values =>
          this.onSubmit(values)
        )}>
        {locationPrompt}
        <div>
          <label htmlFor="userLocation">Set Location</label>
          <Field
            component={Input}
            type="text"
            name="userLocation"
            id="userLocation"
            placeholder="Address, Landmarks, Streets, Zipcode, etc."
          />
        </div>
        <button
          type="submit"
          disabled={this.props.pristine || this.props.submitting}>
          Set Location
                </button>
      </form>
    );
  }
}

export default reduxForm({
  form: 'set-location-form',
  onSubmitFail: (errors, dispatch) =>
    dispatch(focus('set-location-form', Object.keys(errors)[0]))
})(SetLocationForm);