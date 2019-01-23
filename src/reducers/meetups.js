import {
  MEETUPS_REQUEST,
  MEETUPS_SUCCESS,
  MEETUPS_ERROR,
  CREATE_MEETUP_SUCCESS,
  CREATE_MEETUP_ERROR,
  USER_MEETUPS_SUCCESS,
  USER_MEETUPS_ERROR,
  JOIN_MEETUPS_REQUEST,
  JOIN_MEETUPS_SUCCESS,
  JOIN_MEETUPS_ERROR,
  MEETUP_ATTENDENCE_REQUEST,
  MEETUP_ATTENDENCE_SUCCESS,
  MEETUP_ATTENDENCE_ERROR,
  MEETUP_DISPLAY_FILTER,
  FETCH_USER_LOCATION_REQUEST,
  FETCH_USER_LOCATION_SUCCESS,
  FETCH_USER_LOCATION_ERROR,
  UPDATE_USER_LOCATION_SUCCESS,
  UPDATE_USER_LOCATION_REQUEST,
  UPDATE_USER_LOCATION_ERROR,
} from '../actions/meetups';

const initialState ={
  userMeetups: null,
  meetups: null,
  loading: false,
  error: null,
  meetupAttendence: [],
  meetupDisplayFilter: 'all',
  userLocation: null,
  currentLocation: {location: 'Please select a location', latitude: 'none', longitude: 'none'},
}


export default function reducer(state=initialState, action) {
  if(action.type === MEETUPS_REQUEST) {
    return {
      ...state,
      loading: true
    }
  }
  else if(action.type === MEETUPS_SUCCESS) {
    return {
      ...state,
      loading: false,
      error: null,
      meetups: action.meetups
    }
  }
  else if(action.type === MEETUPS_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.error
    }
  }
  else if(action.type === CREATE_MEETUP_SUCCESS) {
    return {
      ...state,
      meetups: [...state.meetups, action.meetup],
      loading: false,
      error: null,
    }
  }
  else if(action.type === CREATE_MEETUP_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  }
  else if(action.type === USER_MEETUPS_SUCCESS) {
    return {
      ...state,
      loading: false,
      error: null,
      userMeetups: action.meetups
    }
  }
  else if(action.type === USER_MEETUPS_ERROR) {
    return {
      ...state,
      loading: false,
      error: action.error,
    }
  } else if(action.type === JOIN_MEETUPS_REQUEST) {
    return {
      ...state,
      loading: true,
    } 
  } else if(action.type === JOIN_MEETUPS_SUCCESS) {
      return {
        ...state,
        meetupAttendence: [...state.meetupAttendence, action.userInfo],
      }
  } else if(action.type === JOIN_MEETUPS_ERROR) {
    return {
      ...state,
      error: action.error,
    }
  } else if(action.type === MEETUP_ATTENDENCE_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === MEETUP_ATTENDENCE_SUCCESS) {
    return {
      ...state,
      meetupAttendence: action.meetupAttendence,
    }
  } else if (action.type === MEETUP_ATTENDENCE_ERROR) {
    return {
      ...state,
      error: action.error,
    }
  } else if (action.type === MEETUP_DISPLAY_FILTER) {
    return {
      ...state,
      meetupDisplayFilter: action.meetupDisplayFilter,
    }
  } else if (action.type === FETCH_USER_LOCATION_SUCCESS) {
    return {
      ...state,
      currentLocation: action.userLocation,
    }
  } else if (action.type === FETCH_USER_LOCATION_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === FETCH_USER_LOCATION_ERROR) {
    return {
      ...state,
      error: action.error,
    }
  } else if (action.type === UPDATE_USER_LOCATION_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } else if (action.type === UPDATE_USER_LOCATION_SUCCESS) {
    return {
      ...state,
    }
  } else if (action.type === UPDATE_USER_LOCATION_ERROR) {
    return {
      ...state,
      error: action.error,
    }
  }
  return state;
}