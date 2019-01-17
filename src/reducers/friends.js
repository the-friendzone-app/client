import {
  FETCH_USER_FRIENDS_REQUEST,
  FETCH_USER_FRIENDS_SUCCESS,
  FETCH_USER_FRIENDS_ERROR
}from '../actions/friends';

const initialState ={
  friendsList: null,
  loading: false,
  error: null
};

export default function reducer(state=intialState, action){
  if(action.type === FETCH_USER_FRIENDS_REQUEST){
    return{
      ...state,
      loading: true,
      error: null
    }
  }
  else if(action.type === FETCH_USER_FRIENDS_SUCCESS){
    return{
      friendsList: action.friends,
      loading: false,
      error: null
    }
  }
  else if(action.type === FETCH_USER_FRIENDS_ERROR){
    return{
      ...state,
      loading: true,
      error: action.type
    }
  }
  return state;
}