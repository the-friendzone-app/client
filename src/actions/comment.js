import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

export const ADD_REPLY_TO = 'ADD_REPLY_TO';
export const addReplyTo = (commentId) => ({
  type: ADD_REPLY_TO,
  commentId
});

export const REMOVE_REPLY_TO = 'REMOVE_REPLY_TO';
export const removeReplyTo = () => ({
  type: REMOVE_REPLY_TO,
});