import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const FETCH_USER_FRIENDS_REQUEST = 'FETCH_USER_FRIENDS_REQUEST';
export const fetchUserFriendsRequest = () => ({
    type:FETCH_USER_FRIENDS_REQUEST
});

export const FETCH_USER_FRIENDS_SUCCESS = 'FETCH_USER_FRIENDS_SUCCESS';
export const fetchUserFriendsSuccess = friends => ({
    type:FETCH_USER_FRIENDS_SUCCESS,
    friends
});

export const FETCH_USER_FRIENDS_ERROR = 'FETCH_USER_FRIENDS_ERROR';
export const fetchUserFriendsError = error => ({
    type:FETCH_USER_FRIENDS_ERROR,
    error
});

export const fetchUserFriendlist = user => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/friends`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .then(data => dispatch(fetchUserFriendsSuccess(data)))
    .catch(err => console.log(err))
}

//SUGGESTED FRIENDS LIST?
export const fetchUserSuggestedlist = user => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/friends`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        }
    })
    .then(res => normalizeResponseErrors(res))
    .then(res => res.json())
    .catch(err => console.log(err))
}