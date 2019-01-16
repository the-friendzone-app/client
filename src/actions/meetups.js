import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from '../utils';

const MEETUPS_REQUEST = 'MEETUPS_REQUEST';
const meetupsRequest = () =>({
  type: MEETUPS_REQUEST
});

const MEETUPS_SUCCESS = 'MEETUPS_SUCCESS';
const meetupsSuccess = meetups => ({
  type: MEETUPS_SUCCESS,
  meetups
});

const MEETUPS_ERROR = 'MEETUPS_ERROR';
const meetupsError = error => ({
  type: MEETUPS_ERROR,
  error
});

const CREATE_MEETUP_SUCCESS = 'CREATE_MEETUP_SUCCESS';
const createMeetupSuccess = event => ({
  type:CREATE_MEETUP_SUCCESS,
  event
});

const CREATE_MEETUP_ERROR = 'CREATE_MEETUP_ERROR';
const createMeetupError = error => ({
  type: CREATE_MEETUP_ERROR,
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

export const fetchUserMeetups = meetup => (dispatch, getState) => {
  dispatch(meetupsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/meetups/${meetup.id}`, {
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

export const createUserMeetup = meetup => (dispatch, getState) => {
  dispatch(meetupsRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/meetups`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(meetup)
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(data => dispatch(createMeetupSuccess(data)))
  .catch(err => dispatch(createMeetupError(err)))
}
