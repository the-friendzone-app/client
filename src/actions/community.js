import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';


// GET '/forums' route
// Check and Retrieve from forum collections

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

//retrieve topic
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

//retrieves comments
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


// POST '/forums' route,
// Searching for specific topics (#topic)

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


// POST '/forums/:id' route
// Sends comments to post to specific forum
