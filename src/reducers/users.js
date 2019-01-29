import {
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  FETCH_FRIENDS_REQUEST,
  FETCH_FRIENDS_SUCCESS,
  FETCH_FRIENDS_ERROR,
  FETCH_FRIENDED_REQUEST,
  FETCH_FRIENDED_SUCCESS,
  FETCH_FRIENDED_FAILURE,
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
  PUT_MESSAGE_REQUEST,
  PUT_MESSAGE_SUCCESS,
  PUT_MESSAGE_FAILURE,
  SEND_VERIFICATION_ERROR,
  SEND_VERIFICATION_SUCCESS
} from '../actions/users';

const initialState = {
  friends: [],
  friended: [],
  loading: false,
  error: null,
};

export default function reducer(state = initialState, action) {
  if (action.type === FETCH_CURRENT_USER_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_CURRENT_USER_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  }
  else if (action.type === FETCH_CURRENT_USER_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if (action.type === FETCH_FRIENDS_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_FRIENDS_SUCCESS) {
    return Object.assign({}, state, {
      friends: action.friends,
      loading: false
    });
  }
  else if (action.type === FETCH_FRIENDS_ERROR) {
    return Object.assign({}, state, {
      loading: true,
      error: action.error
    });
  }
  else if (action.type === FETCH_FRIENDED_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_FRIENDED_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      friended: action.friended
    });
  }
  else if (action.type === FETCH_FRIENDED_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if (action.type === FETCH_MESSAGE_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_MESSAGE_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  }
  else if (action.type === FETCH_MESSAGE_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if (action.type === PUT_MESSAGE_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === PUT_MESSAGE_SUCCESS) {
    return Object.assign({}, state, {
      loading: false
    });
  }
  else if (action.type === PUT_MESSAGE_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
 
  return state;
}