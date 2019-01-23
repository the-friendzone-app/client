import * as actions from '../actions/community';

const initialState = {
  community: [],
  topicAdd: false,
  topics: [],
  comments:[],
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
      return {...state, loading: false, error: null, topics: action.topics}
    case actions.FETCH_TOPIC_ERROR:
      return { ...state, loading: false, error: action.error };
    case actions.FETCH_COMMENTS_SUCCESS:
      return {...state, loading: false, error: null, comments: action.comments };
    case actions.FETCH_COMMENTS_ERROR:
      return { ...state, loading: false, error: action.error };
    case actions.POST_COMMENT_REQUEST:
      return { ...state, loading: true };
    case actions.POST_COMMENT_SUCCESS:
      return { ...state, error: null, loading: false };
    case actions.POST_COMMENT_ERROR:
      return { ...state, loading: false, error: action.error };
    case actions.POST_TOPIC_REQUEST:
      return { ...state, loading: true };
    case actions.POST_TOPIC_SUCCESS:
      return { ...state, error: null, loading: false };
    case actions.POST_TOPIC_ERROR:
      return { ...state, loading: false, error: action.error };
    case actions.ADD_TOPIC_TRUE:
      return {...state, topicAdd: true};
    case actions.ADD_TOPIC_FALSE:
      return {...state, topicAdd: false};
    default:
      return state;
  }
}