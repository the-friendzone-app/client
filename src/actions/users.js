import { SubmissionError } from 'redux-form';

import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const registerUser = user => dispatch => {
    return fetch(`${API_BASE_URL}/users`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .catch(err => {
            const { reason, message, location } = err;
            if (reason === 'ValidationError') {
                // Convert ValidationErrors into SubmissionErrors for Redux Form
                return Promise.reject(
                    new SubmissionError({
                        [location]: message
                    })
                );
            } else {
                return err;
            }
        });
};

export const FETCH_CURRENT_USER_REQUEST = 'FETCH_CURRENT_USER_REQUEST';
export const fetchCurrentUserRequest = () => ({
    type: FETCH_CURRENT_USER_REQUEST
});

export const FETCH_CURRENT_USER_SUCCESS = 'FETCH_CURRENT_USER_SUCCESS';
export const fetchCurrentUserSuccess = user => ({
    type: FETCH_CURRENT_USER_SUCCESS,
    user
});

export const FETCH_CURRENT_USER_FAILURE = 'FETCH_CURRENT_USER_FAILURE';
export const fetchCurrentUserFailure = error => ({
    type: FETCH_CURRENT_USER_FAILURE,
    error
});

export const fetchCurrentUser = () => (dispatch, getState) => {
    dispatch(fetchCurrentUserRequest());
    let userId;
    const currentUser = getState().auth.currentUser;
    // console.log(currentUser);
    if (currentUser) {
        userId = currentUser._id;
    }
    // console.log('userId', userId)
    return fetch(`${API_BASE_URL}/users/${userId}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => {
            dispatch(fetchCurrentUserSuccess(res));
        })
        .catch(err => dispatch(fetchCurrentUserFailure(err)));
};
export const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST';
export const fetchFriendsRequest = () => ({
    type: FETCH_FRIENDS_REQUEST
});

export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
export const fetchFriendsSuccess = friends => ({
    type: FETCH_FRIENDS_SUCCESS,
    friends
});

export const FETCH_FRIENDS_ERROR = 'FETCH_FRIENDS_ERROR';
export const fetchFriendsError = error => ({
    type: FETCH_FRIENDS_ERROR,
    error
});

export const fetchFriends = () => (dispatch, getState) => {
    dispatch(fetchFriendsRequest());
    let userId;
    const currentUser = getState().auth.currentUser;
    // console.log(currentUser);
    if (currentUser) {
        userId = currentUser._id;
    }

    return fetch(`${API_BASE_URL}/friends/${userId}`, {
        method: 'GET'
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            dispatch(fetchFriendsSuccess(res));
        })
        .catch(err => dispatch(fetchFriendsError(err)));
};

export const FETCH_FRIENDED_REQUEST = 'FETCH_FRIENDED_REQUEST';
export const fetchFriendedRequest = () => ({
    type: FETCH_FRIENDED_REQUEST
});

export const FETCH_FRIENDED_SUCCESS = 'FETCH_FRIENDED_SUCCESS';
export const fetchFriendedSuccess = friended => ({
    type: FETCH_FRIENDED_SUCCESS,
    friended
});

export const FETCH_FRIENDED_FAILURE = 'FETCH_FRIENDED_FAILURE';
export const fetchFriendedFailure = error => ({
    type: FETCH_FRIENDED_FAILURE,
    error
});

export const fetchFriended = () => (dispatch, getState) => {
    dispatch(fetchFriendedRequest());
    const authToken = getState().auth.authToken;
    const currentUser = getState().auth.currentUser;
    console.log(currentUser);
    let userId;
    if (currentUser) {
        userId = currentUser._id;
    }

    return fetch(`${API_BASE_URL}/friends/friended/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            dispatch(fetchFriendedSuccess(res));
        })
        .catch(err => dispatch(fetchFriendedFailure(err)));
};

export const FETCH_MESSAGE_REQUEST = 'FETCH_MESSAGE_REQUEST';
export const fetchMessageRequest = () => ({
    type: FETCH_MESSAGE_REQUEST
});

export const FETCH_MESSAGE_SUCCESS = 'FETCH_MESSAGE_SUCCESS';
export const fetchMessageSuccess = messages => ({
    type: FETCH_MESSAGE_SUCCESS
});

export const FETCH_MESSAGE_FAILURE = 'FETCH_MESSAGE_FAILURE';
export const fetchMessageFailure = error => ({
    type: FETCH_MESSAGE_FAILURE,
    error
});

export const PUT_MESSAGE_REQUEST = 'PUT_MESSAGE_REQUEST';
export const putMessageRequest = () => ({
    type: PUT_MESSAGE_REQUEST
});

export const PUT_MESSAGE_SUCCESS = 'PUT_MESSAGE_SUCCESS';
export const putMessageSuccess = () => ({
    type: PUT_MESSAGE_SUCCESS
});

export const PUT_MESSAGE_FAILURE = 'PUT_MESSAGE_FAILURE';
export const putMessageFailure = error => ({
    type: PUT_MESSAGE_FAILURE,
    error
});

export const putMessages = (chatroomId, messages) => (dispatch, getState) => {
    dispatch(putMessageRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/messages/${chatroomId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ messages })
    })
        .then(res => {
            dispatch(putMessageSuccess(res));
        })
        .catch(err => dispatch(putMessageFailure(err)));
}; 