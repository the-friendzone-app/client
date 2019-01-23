import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


// GET '/community' route
// check and Retrieve from community collections

export const FETCH_FORUM_REQUEST = 'FETCH_FORUM_REQUEST';
export const fetchForumRequest = () => ({
  type: FETCH_FORUM_REQUEST
});

export const FETCH_FORUM_SUCCESS = 'FETCH_FORUM_SUCCESS';
export const fetchForumSuccess = (forum) => ({
  type: FETCH_FORUM_SUCCESS,
  forum
});

export const FETCH_FORUM_ERROR = 'FETCH_FORUM_ERROR';
export const fetchForumError = (error) => ({
  type: FETCH_FORUM_ERROR,
  error
});

export const FETCH_TOPIC_SUCCESS = 'FETCH_TOPIC_SUCCESS';
export const fetchTopicSuccess = (topics) => ({
  type: FETCH_TOPIC_SUCCESS,
  topics
});

export const FETCH_TOPIC_ERROR = 'FETCH_TOPIC_ERROR';
export const fetchTopicError = (error) => ({
  type: FETCH_TOPIC_ERROR,
  error
});

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const fetchCommentsSuccess = (comments) => ({
  type: FETCH_COMMENTS_SUCCESS,
  comments
});

export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';
export const fetchCommentsError = (error) => ({
  type: FETCH_COMMENTS_ERROR,
  error
});



export const fetchForum = () => (dispatch, getState) => {
  dispatch(fetchForumRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/community`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${authToken}`
    }
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    }).then(forum => {
      dispatch(fetchForumSuccess(forum));
    }).catch(err => {
      dispatch(fetchForumError(err));
    });
};

// checks and retrieve topic
export const fetchTopic = communityId => (dispatch, getState) => {
  dispatch(fetchForumRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/community/topic`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({communityId})
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    }).then(topic => {
      dispatch(fetchTopicSuccess(topic));
    }).catch(err => {
      dispatch(fetchTopicError(err));
    });
};

//checks and retrieves comments
export const fetchComments = topicId => (dispatch, getState) => {
  dispatch(fetchForumRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/community/comments`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify({topicId})
  })
    .then(res => normalizeResponseErrors(res))
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    }).then(comments => {
      dispatch(fetchCommentsSuccess(comments));
    }).catch(err => {
      dispatch(fetchCommentsError(err));
    });
};


// posts comment to specific topic

export const POST_COMMENT_REQUEST = 'POST_COMMENT_REQUEST';
export const postCommentRequest = () => ({
  type: POST_COMMENT_REQUEST
});

export const POST_COMMENT_SUCCESS = 'POST_COMMENT_SUCCESS';
export const postCommentSuccess = () => ({
  type: POST_COMMENT_SUCCESS
});

export const POST_COMMENT_ERROR = 'POST_COMMENT_ERROR';
export const postCommentError = (error) => ({
  type: POST_COMMENT_ERROR,
  error
});


export const postComment = comment => (dispatch, getState) => {
  dispatch(postCommentRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/community/comments/post`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(comment),
  }).then(() => {
    dispatch(postCommentSuccess());
  }).catch(err => {
    dispatch(postCommentError(err));
  });
}

// "delete" a comment
export const DELETE_COMMENT_REQUEST = 'DELETE_COMMENT_REQUEST';
export const deleteCommentRequest = () => ({
  type: DELETE_COMMENT_REQUEST
});

export const DELETE_COMMENT_SUCCESS = 'DELETE_COMMENT_SUCCESS';
export const deleteCommentSuccess = () => ({
  type: DELETE_COMMENT_SUCCESS
});

export const DELETE_COMMENT_ERROR = 'DELETE_COMMENT_ERROR';
export const deleteCommentError = (error) => ({
  type: DELETE_COMMENT_ERROR,
  error
});

export const DELETE_COMMENT_RESET = 'DELETE_COMMENT_RESET';
export const deleteCommentReset = () => ({
  type: DELETE_COMMENT_RESET
});

export const deleteComment = (deletionRequest) => (dispatch, getState) => {
  dispatch(deleteCommentRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/community/comments/delete`, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(deletionRequest),
  }).then(res => {
    dispatch(deleteCommentSuccess());
  }).catch(err => {
    dispatch(deleteCommentError(err));
  });
}


// posts topics to post to specific community
export const POST_TOPIC_REQUEST = 'POST_TOPIC_REQUEST';
export const postTopicRequest = () => ({
  type: POST_TOPIC_REQUEST
});

export const POST_TOPIC_SUCCESS = 'POST_TOPIC_SUCCESS';
export const postTopicSuccess = () => ({
  type: POST_TOPIC_SUCCESS
});

export const POST_TOPIC_ERROR = 'POST_TOPIC_ERROR';
export const postTopicError = (error) => ({
  type: POST_TOPIC_ERROR,
  error
});

export const postTopic = topic => (dispatch, getState) => {
  dispatch(postTopicRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/community/topic/post`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(topic),
  }).then(() => {
    dispatch(postTopicSuccess());
  }).catch(err => {
    dispatch(postTopicError(err));
  });
}

// interactivity actions

export const ADD_TOPIC_TRUE = 'ADD_TOPIC_TRUE';
export const addTopicTrue = () => ({
  type: ADD_TOPIC_TRUE
});

export const ADD_TOPIC_FALSE = 'ADD_TOPIC_FALSE';
export const addTopicFalse = () => ({
  type: ADD_TOPIC_FALSE
});