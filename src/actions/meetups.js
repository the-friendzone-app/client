import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const MEETUPS_REQUEST = 'MEETUPS_REQUEST';
export const meetupsRequest = () =>({
  type: MEETUPS_REQUEST
});

export const MEETUPS_SUCCESS = 'MEETUPS_SUCCESS';
export const meetupsSuccess = meetups => ({
  type: MEETUPS_SUCCESS,
  meetups
});

export const MEETUPS_ERROR = 'MEETUPS_ERROR';
export const meetupsError = error => ({
  type: MEETUPS_ERROR,
  error
});

export const CREATE_MEETUP_SUCCESS = 'CREATE_MEETUP_SUCCESS';
export const createMeetupSuccess = meetup => ({
  type:CREATE_MEETUP_SUCCESS,
  meetup,
});

export const CREATE_MEETUP_ERROR = 'CREATE_MEETUP_ERROR';
export const createMeetupError = error => ({
  type: CREATE_MEETUP_ERROR,
  error,
});

export const USER_MEETUPS_SUCCESS = 'USER_MEETUP_SUCCESS';
export const userMeetupsSuccess = meetups => ({
  type: USER_MEETUPS_SUCCESS,
  meetups,
});

export const USER_MEETUPS_ERROR = 'USER_MEETUP_ERROR';
export const userMeetupsError = error => ({
  type: USER_MEETUPS_ERROR,
  error,
});

export const JOIN_MEETUPS_REQUEST = 'JOIN_MEETUPS_REQUEST';
export const joinMeetupsRequest = () => ({
  type: JOIN_MEETUPS_REQUEST,
  loading: true, 
  error: null,
});

export const JOIN_MEETUPS_SUCCESS = 'JOIN_MEETUPS_SUCCESS';
export const joinMeetupsSuccess = (userInfo) => ({
  type: JOIN_MEETUPS_SUCCESS,
  userInfo,
});

export const JOIN_MEETUPS_ERROR = 'JOIN_MEETUPS_ERROR';
export const joinMeetupsError = error => ({
  type: JOIN_MEETUPS_ERROR,
  error,
});

export const MEETUP_ATTENDENCE_REQUEST = 'MEETUP_ATTENDENCE_REQUEST';
export const meetupAttendenceRequest = () => ({
  type: MEETUP_ATTENDENCE_REQUEST,
  loading: true,
  error: null,
});

export const MEETUP_ATTENDENCE_SUCCESS = 'MEETUP_ATTENDENCE_SUCCESS';
export const meetupAttendenceSuccess = (meetupAttendence) => ({
  type: MEETUP_ATTENDENCE_SUCCESS,
  meetupAttendence,
});

export const MEETUP_ATTENDENCE_ERROR = 'MEETUP_ATTENDENCE_ERROR';
export const meetupAttendenceError = (error) => ({
  type: MEETUP_ATTENDENCE_ERROR,
  error,
});

export const MEETUP_DISPLAY_FILTER = 'MEETUP_DISPLAY_FILTER';
export const meetupDisplayFilter = (meetupDisplayFilter) => ({
  type: MEETUP_DISPLAY_FILTER,
  meetupDisplayFilter,
});

export const FETCH_USER_LOCATION_REQUEST = 'FETCH_USER_LOCATION_REQUEST';
export const fetchUserLocationRequest = () => ({
  type: FETCH_USER_LOCATION_REQUEST,
  loading: true,
});

export const FETCH_USER_LOCATION_SUCCESS = 'FETCH_USER_LOCATION_SUCCESS';
export const fetchUserLocationSuccess = (userLocation) => ({
  type: FETCH_USER_LOCATION_SUCCESS,
  userLocation,
});

export const FETCH_USER_LOCATION_ERROR = 'FETCH_USER_LOCATION_ERROR';
export const fetchUserLocationError = (error) => ({
  type: FETCH_USER_LOCATION_ERROR,
  error,
});

export const fetchUserLocation = () => (dispatch, getState) => {
  dispatch(fetchUserLocationRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/user-location`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => res.json())
  .then(res => {
    dispatch(fetchUserLocationSuccess(res[0]))})
  .catch(err => dispatch(fetchUserLocationError(err)))
}

export const fetchMeetupAttendence = () => (dispatch, getState) => {
  dispatch(meetupAttendenceRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/meetup-attendence`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(meetupAttendenceSuccess(data)))
  .catch(err => dispatch(meetupAttendenceError(err)))
}

export const fetchAllMeetups = () => (dispatch, getState) => {
  dispatch(meetupsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/meetups`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(meetupsSuccess(data)))
  .catch(err => dispatch(meetupsError(err)))
}

//CREATED EVENTS OR GOING TO EVENTS
export const fetchUserMeetups = user => (dispatch, getState) => {
  dispatch(meetupsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/meetups`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    }
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(userMeetupsSuccess(data)))
  .catch(err => dispatch(userMeetupsError(err)))
}

export const createUserMeetup = meetup => (dispatch, getState) => {
  dispatch(meetupsRequest());
  const { name, location, description, startTime, endTime, createdBy } = meetup;
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/meetups`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      name,
      description,
      location,
      startTime,
      endTime,
      createdBy,
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(createMeetupSuccess(data)))
  .catch(err => dispatch(createMeetupError(err)))
}

export const joinMeetup = userInfo => (dispatch, getState) => {
  dispatch(joinMeetupsRequest());
  const { username, meetupId } = userInfo;
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/meetup-attendence`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      username,
      meetupId,
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(joinMeetupsSuccess(data)))
  .catch(err => dispatch(joinMeetupsError(err)))
}

export const UPDATE_USER_LOCATION_REQUEST = 'UPDATE_USER_LOCATION_REQUEST';
export const updateUserLocationRequest = () => ({
  type: UPDATE_USER_LOCATION_REQUEST,
  loading: true,
});

export const UPDATE_USER_LOCATION_SUCCESS = 'UPDATE_USER_LOCATION_SUCCESS';
export const updateUserLocationSuccess = (locationData) => ({
  type: UPDATE_USER_LOCATION_SUCCESS,
  // locationData,
});

export const UPDATE_USER_LOCATION_ERROR = 'UPDATE_USER_LOCATION_ERROR';
export const updateUserLocationError = (error) => ({
  type: UPDATE_USER_LOCATION_ERROR,
  error,
});

export const updateUserLocation = userLocation => (dispatch, getState) => {
  dispatch(updateUserLocationRequest());
  const { location, latitude, longitude, userId } = userLocation;
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/user-location`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      location,
      latitude,
      longitude,
      userId,
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(fetchUserLocationSuccess(data)))
  .catch(err => dispatch(updateUserLocationError(err)))
}
