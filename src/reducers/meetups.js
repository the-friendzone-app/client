import {
  MEETUPS_REQUEST,
  MEETUPS_SUCCESS,
  MEETUPS_ERROR,
  CREATE_MEETUP_SUCCESS,
  CREATE_MEETUP_ERROR,
  USER_MEETUPS_SUCCESS,
  USER_MEETUPS_ERROR
} from '../actions/meetups';

const initialState ={
  userMeetups: null,
  meetups: null,
  loading: false,
  error: null
}


export default function reducer(state=intialState, action){
  if(action.type === MEETUPS_REQUEST){
    return{
      ...state,
      loading: true
    }
  }
  else if(action.type === MEETUPS_SUCCESS){
    return{
      ...state,
      loading: false,
      error: null,
      meetups: action.meetups
    }
  }
  else if(action.type === MEETUPS_ERROR){
    return{
      ...state,
      loading: false,
      error: action.error
    }
  }
  else if(action.type === CREATE_MEETUP_SUCCESS){
    return{
      ...state,
      loading: false,
      error: null,
    }
  }
  else if(action.type === CREATE_MEETUP_ERROR){
    return{
      ...state,
      loading: false,
      error: action.error,
    }
  }
  else if(action.type === USER_MEETUPS_SUCCESS){
    return{
      ...state,
      loading: false,
      error: null,
      userMeetups: action.meetups
    }
  }
  else if(action.type === USER_MEETUPS_ERROR){
    return{
      ...state,
      loading: false,
      error: action.error,
    }
  }
  return state;
}