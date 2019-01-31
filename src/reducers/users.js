import {
  FETCH_CURRENT_USER_REQUEST,
  FETCH_CURRENT_USER_SUCCESS,
  FETCH_CURRENT_USER_FAILURE,
  FETCH_FRIENDED_REQUEST,
  FETCH_FRIENDED_SUCCESS,
  FETCH_FRIENDED_FAILURE,
  FETCH_MESSAGE_REQUEST,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
  PUT_MESSAGE_REQUEST,
  PUT_MESSAGE_SUCCESS,
  PUT_MESSAGE_FAILURE,
  FETCH_SUGGESTED_REQUEST,
  FETCH_SUGGESTED_SUCCESS,
  FETCH_SUGGESTED_FAILURE,
  ADD_FRIEND_REQUEST,
  ADD_FRIEND_SUCCESS,
  ADD_FRIEND_ERROR,
  FETCH_SCHAT_REQUEST,
  FETCH_SCHAT_SUCCESS,
  FETCH_SCHAT_FAILURE,
} from '../actions/users';

const initialState = {
  friended: [],
  schat: [],
  currentUser: null,
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
      currentUser: action.user,
      loading: false
    });
  }
  else if (action.type === FETCH_CURRENT_USER_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
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
  else if (action.type === FETCH_SCHAT_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_SCHAT_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      schat: action.schat
    });
  }
  else if (action.type === FETCH_SCHAT_FAILURE) {
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

  else if (action.type === FETCH_SUGGESTED_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    });
  }
  else if (action.type === FETCH_SUGGESTED_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      suggested: action.suggested
    });
  }
  else if (action.type === FETCH_SUGGESTED_FAILURE) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    });
  }
  else if (action.type === ADD_FRIEND_REQUEST) {
    return Object.assign({}, state, {
      loading: true,
      error: null
    })
  } else if (action.type === ADD_FRIEND_SUCCESS) {
    return Object.assign({}, state, {
      loading: false,
      friends: [action.friends, ...state.friends]
    })
  } else if (action.type === ADD_FRIEND_ERROR) {
    return Object.assign({}, state, {
      loading: false,
      error: action.error
    })
  }
  return state;
}