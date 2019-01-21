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
export const fetchTopicSuccess = (topic) => ({
  type: FETCH_TOPIC_SUCCESS,
  topic
});

export const FETCH_TOPIC_ERROR = 'FETCH_TOPIC_ERROR';
export const fetchTopicError = (error) => ({
  type: FETCH_TOPIC_ERROR,
  error
});

export const FETCH_COMMENTS_SUCCESS = 'FETCH_COMMENTS_SUCCESS';
export const fetchCommentsSuccess = (topic) => ({
  type: FETCH_COMMENTS_SUCCESS,
  topic
});

export const FETCH_COMMENTS_ERROR = 'FETCH_COMMENTS_ERROR';
export const fetchCommentsError = (error) => ({
  type: FETCH_TOPIC_ERROR,
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
export const fetchTopic = () => (dispatch, getState) => {
  dispatch(fetchForumRequest());
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/community/topic`, {
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
    }).then(topic => {
      dispatch(fetchTopicSuccess(topic));
    }).catch(err => {
      dispatch(fetchTopicError(err));
    });
};

// POST '/forums' route,
// Searching for specific topics (#topic)

export const POST_FORUM_REQUEST = 'POST_FORUM_REQUEST';
export const postForumRequest = () => ({
  type: POST_FORUM_REQUEST
});

export const POST_FORUM_SUCCESS = 'POST_FORUM_SUCCESS';
export const postForumSuccess = () => ({
  type: POST_FORUM_SUCCESS
});

export const POST_FORUM_ERROR = 'POST_FORUM_ERROR';
export const postForumError = (error) => ({
  type: POST_FORUM_ERROR,
  error
});

export const searchForum = (searchTermForum) => (dispatch, getState) => {
  dispatch(postForumRequest());
  const authToken = getState().auth.authToken;
  const data = { searchTermForum };
  return fetch(`${API_BASE_URL}/community`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Bearer ${authToken}`
    },
    body: JSON.stringify(data),
  }).then(() => {
    dispatch(postForumSuccess());
  }).catch(err => {
    dispatch(postForumError(err));
  });
};


// POST '/forums/:id' route
// Sends comments to post to specific forum
