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
export const createMeetupSuccess = event => ({
  type:CREATE_MEETUP_SUCCESS,
  event
});

export const CREATE_MEETUP_ERROR = 'CREATE_MEETUP_ERROR';
export const createMeetupError = error => ({
  type: CREATE_MEETUP_ERROR,
  error
});

export const USER_MEETUPS_SUCCESS = 'USER_MEETUP_SUCCESS';
export const userMeetupsSuccess = meetups => ({
  type: USER_MEETUPS_SUCCESS,
  meetups
});

export const USER_MEETUPS_ERROR = 'USER_MEETUP_ERROR';
export const userMeetupsError = error => ({
  type: USER_MEETUPS_ERROR,
  error
});

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
  console.log('meetup', meetup);
  const { name, location, description, startTime, endTime } = meetup;
  console.log(JSON.stringify(startTime));
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
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(createMeetupSuccess(data)))
  .catch(err => dispatch(createMeetupError(err)))
}
