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
} from '../actions/meetups';

const initialState ={
  userMeetups: null,
  meetups: null,
  loading: false,
  error: null,
  meetupAttendence: [],
  meetupDisplayFilter: 'all',
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
  }
  return state;
}