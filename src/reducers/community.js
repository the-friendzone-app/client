import * as actions from '../actions/community';

const initialState = {
  community: '',
  topic: '',
  comments:'',
  error: null,
  loading: false
};

export default function forumsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_FORUM_REQUEST:
      return { ...state, loading: true };
    case actions.FETCH_FORUM_SUCCESS:
      return { ...state, community: action.forum, error: null, loading: false };
    case actions.FETCH_FORUM_ERROR:
      return { ...state, loading: false, error: action.error };
    case actions.FETCH_TOPIC_SUCCESS:
      return {...state, loading: false, error: null, topic: action.topic}
    case actions.FETCH_TOPIC_ERROR:
      return { ...state, loading: false, error: action.error };
    case actions.POST_FORUM_REQUEST:
      return { ...state, loading: true };
    case actions.POST_FORUM_SUCCESS:
      return { ...state, error: null, loading: false };
    case actions.POST_FORUM_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}