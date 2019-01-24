import * as actions from '../actions/comment';

const initialState = {
  editing: false,
  deletion: false,
  editComment: '',
  error: null,
  loading: false,
  replyTo: '',
  responses: []
};

export default function commentReducer(state = initialState, action) {
  if(action.type === actions.ADD_REPLY_TO) {
    return {
      ...state,
      replyTo: action.commentId
    }
  } else if (action.type === actions.REMOVE_REPLY_TO) {
    return {
      ...state,
      replyTo: ''
    }
  }
  return state;
}