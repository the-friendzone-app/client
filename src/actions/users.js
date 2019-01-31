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
    const currentUser = getState().auth;
    //console.log('currentuserHERE', currentUser)
    // console.log('userId', userId)
    return fetch(`${API_BASE_URL}/users/info/`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${currentUser.authToken}`
        }
    })
        .then(res => res.json())
        .then(res => {
            //console.log(res);
            dispatch(fetchCurrentUserSuccess(res));
        })
        .catch(err => dispatch(fetchCurrentUserFailure(err)));
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
    // console.log(currentUser);
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
            // console.log(res);
            dispatch(fetchFriendedSuccess(res));
        })
        .catch(err => dispatch(fetchFriendedFailure(err)));
};

export const FETCH_SCHAT_REQUEST = 'FETCH_SCHAT_REQUEST';
export const fetchSchatRequest = () => ({
    type: FETCH_SCHAT_REQUEST
});

export const FETCH_SCHAT_SUCCESS = 'FETCH_SCHAT_SUCCESS';
export const fetchSchatSuccess = schat => ({
    type: FETCH_SCHAT_SUCCESS,
    schat
});

export const FETCH_SCHAT_FAILURE = 'FETCH_SCHAT_FAILURE';
export const fetchSchatFailure = error => ({
    type: FETCH_FRIENDED_FAILURE,
    error
});

export const fetchSchat = () => (dispatch, getState) => {
    dispatch(fetchSchatRequest());
    const authToken = getState().auth.authToken;
    const currentUser = getState().auth.currentUser;
    // console.log(currentUser);
    let userId;
    if (currentUser) {
        userId = currentUser._id;
    }

    return fetch(`${API_BASE_URL}/friends/schat/${userId}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => res.json())
        .then(res => {
            console.log(res);
            dispatch(fetchSchatSuccess(res));
        })
        .catch(err => dispatch(fetchSchatFailure(err)));
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
export const FETCH_SMESSAGE_REQUEST = 'FETCH_SMESSAGE_REQUEST';
export const fetchSmessageRequest = () => ({
    type: FETCH_SMESSAGE_REQUEST
});

export const FETCH_SMESSAGE_SUCCESS = 'FETCH_SMESSAGE_SUCCESS';
export const fetchSmessageSuccess = smessages => ({
    type: FETCH_SMESSAGE_SUCCESS
});

export const FETCH_SMESSAGE_FAILURE = 'FETCH_SMESSAGE_FAILURE';
export const fetchSmessageFailure = error => ({
    type: FETCH_SMESSAGE_FAILURE,
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
export const PUT_SMESSAGE_REQUEST = 'PUT_SMESSAGE_REQUEST';
export const putSmessageRequest = () => ({
    type: PUT_SMESSAGE_REQUEST
});

export const PUT_SMESSAGE_SUCCESS = 'PUT_SMESSAGE_SUCCESS';
export const putSmessageSuccess = () => ({
    type: PUT_SMESSAGE_SUCCESS
});

export const PUT_SMESSAGE_FAILURE = 'PUT_SMESSAGE_FAILURE';
export const putSmessageFailure = error => ({
    type: PUT_SMESSAGE_FAILURE,
    error
});

export const putSmessages = (chatroomId, messages) => (dispatch, getState) => {
    dispatch(putSmessageRequest());
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/messages/suggested/${chatroomId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ messages })
    })
        .then(res => {
            dispatch(putSmessageSuccess(res));
        })
        .catch(err => dispatch(putSmessageFailure(err)));
};

export const FETCH_SUGGESTED_REQUEST = 'FETCH_SUGGESTED_REQUEST';
export const fetchSuggestedRequest = () => ({
    type: FETCH_SUGGESTED_REQUEST
});

export const FETCH_SUGGESTED_SUCCESS = 'FETCH_SUGGESTED_SUCCESS';
export const fetchSuggestedSuccess = suggested => ({
    type: FETCH_SUGGESTED_SUCCESS,
    suggested
});

export const FETCH_SUGGESTED_FAILURE = 'FETCH_SUGGESTED_FAILURE';
export const fetchSuggestedFailure = error => ({
    type: FETCH_SUGGESTED_FAILURE,
    error
});

export const fetchSuggested = () => (dispatch, getState) => {
    dispatch(fetchSuggestedRequest());
    const authToken = getState().auth.authToken;
    const currentUser = getState().auth.currentUser;
    // console.log(currentUser);
    let userId;
    if (currentUser) {
        userId = currentUser._id;
    }

    return fetch(`${API_BASE_URL}/friends/suggested/${userId}`, {
        method: 'PUT',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .catch(err => console.log(err));
};

//add a friend
export const ADD_FRIEND_REQUEST = 'ADD_FRIEND_REQUEST';
export const addFriendRequest = () => ({
    type: ADD_FRIEND_REQUEST
});

export const ADD_FRIEND_SUCCESS = 'ADD_FRIEND_SUCCESS';
export const addFriendSuccess = (friends) => ({
    type: ADD_FRIEND_SUCCESS,
    friends
});

export const ADD_FRIEND_ERROR = 'ADD_FRIEND_ERROR';
export const addFriendError = error => ({
    type: ADD_FRIEND_ERROR,
    error
});

export const addFriendToUser = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    const currentUser = getState().auth.currentUser;
    console.log('friend added endpoint');
    let userId;
    if (currentUser) {
        userId = currentUser._id;
    }
    console.log(userId);
    console.log(id);
    dispatch(addFriendRequest());
    fetch(`${API_BASE_URL}/friends/addfriend/${userId}/${id}`, {
        method: 'PUT',
        headers: {
            authorization: `Bearer ${authToken}`
        },
    })
        .catch(err => {
            console.error(err);
        });
};

//delete friend
export const deleteFriend = (id) => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    const currentUser = getState().auth.currentUser;
    console.log('delete friend endpoint');
    let userId;
    if (currentUser) {
        userId = currentUser._id;
    }
    fetch(`${API_BASE_URL}/friends/friended/${userId}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${authToken}`
        },
    })
        .then(result => result.json())
        .then(friended => {
            dispatch(fetchFriendedSuccess(friended));
        })
}

//IGNORE user
export const IGNORE_USER_REQUEST = 'IGNORE_USER_REQUEST';
export const ignoreUserRequest = () => ({
    type: IGNORE_USER_REQUEST
});

export const IGNORE_USER_SUCCESS = 'IGNORE_USER_SUCCESS';
export const ignoreUserSuccess = suggested => ({
    type: IGNORE_USER_SUCCESS,
    suggested
});

export const IGNORE_USER_FAILURE = 'IGNORE_USER_FAILURE';
export const ignoreUserFailure = error => ({
    type: IGNORE_USER_FAILURE,
    error
});

export const ignoreUser = id => (dispatch, getState) => {
    dispatch(ignoreUserRequest());
    const authToken = getState().auth.authToken;
    const currentUser = getState().auth.currentUser;
    // console.log(currentUser);
    let userId;
    if (currentUser) {
        userId = currentUser._id;
    }

    return fetch(`${API_BASE_URL}/ignore/${userId}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            Authorization: `Bearer ${authToken}`
        },
        body: JSON.stringify({ ignoredUser: id })
    })
        .then(res => {
            console.log(res);
            dispatch(ignoreUserSuccess(res));
        })
        .catch(err => dispatch(ignoreUserFailure(err)));
};

