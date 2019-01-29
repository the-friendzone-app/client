import * as actions from '../actions/community';

const initialState = {
  community: [],
  editing: false,
  deletion: false,
  topics: [],
  comments:[],
  editComment: '',
  error: {},
  loading: false,
  replyTo: ''
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
    case actions.DELETE_COMMENT_REQUEST:
      return { ...state, loading: true };
    case actions.DELETE_COMMENT_SUCCESS:
      return { ...state, error: null, loading: false, deletion: true };
    case actions.DELETE_COMMENT_ERROR:
      return { ...state, loading: false, error: action.error }; 
    case actions.DELETE_COMMENT_RESET:
      return { ...state, error: null, loading: false, deletion: false };
    case actions.EDIT_COMMENT_REQUEST:
      return { ...state, loading: true };
    case actions.EDIT_COMMENT_SUCCESS:
      return { ...state, loading: false, error: null };
    case actions.EDIT_COMMENT_ERROR:
      return { ...state, loading: false, error: action.error };  
    case actions.EDITING_COMMENT_TRUE:
      return { ...state, editing: true, editComment: action.commentId };
    case actions.EDITING_COMMENT_FALSE:
      return { ...state, editing: false, editComment:'' };
    case actions.ADD_REPLY_TO:
      return { ...state, editing: false, replyTo: action.commentId }; 
    case actions.REMOVE_REPLY_TO:
      return { ...state, editing: false, replyTo: '' };    
    default:
      return state;
  }
}