export const ADD_REPLY_TO = 'ADD_REPLY_TO';
export const addReplyTo = (commentId) => ({
  type: ADD_REPLY_TO,
  commentId
});

export const REMOVE_REPLY_TO = 'REMOVE_REPLY_TO';
export const removeReplyTo = () => ({
  type: REMOVE_REPLY_TO,
});

// wire these up to re-organize

// export const EDITING_COMMENT_TRUE = 'EDITING_COMMENT_TRUE';
// export const editingCommentTrue = (commentId) => ({
//   type: EDITING_COMMENT_TRUE,
//   commentId
// });

// export const EDITING_COMMENT_FALSE = 'EDITING_COMMENT_FALSE';
// export const editingCommentFalse = () => ({
//   type: EDITING_COMMENT_FALSE
// });
// 
// export const DELETE_COMMENT_RESET = 'DELETE_COMMENT_RESET';
// export const deleteCommentReset = () => ({
//   type: DELETE_COMMENT_RESET
// });