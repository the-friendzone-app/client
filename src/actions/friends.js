// import { API_BASE_URL } from '../config';

// //Fetch friends
// export const FETCH_FRIENDS_REQUEST = 'FETCH_FRIENDS_REQUEST';
// export const fetchFriendsRequest = () => ({
//     type: FETCH_FRIENDS_REQUEST
// });

// export const FETCH_FRIENDS_SUCCESS = 'FETCH_FRIENDS_SUCCESS';
// export const fetchFriendsSuccess = friends => ({
//     type: FETCH_FRIENDS_SUCCESS,
//     friends
// });

// export const FETCH_FRIENDS_ERROR = 'FETCH_FRIENDS_ERROR';
// export const fetchFriendsError = error => ({
//     type: FETCH_FRIENDS_ERROR,
//     error
// });

// export const fetchFriends = () => (dispatch, getState) => {
//     dispatch(fetchFriendsRequest());
//     const authToken = getState().auth.authToken;
//     return fetch(`${API_BASE_URL}/friends`, {
//         method: 'GET',
//         headers: {
//             Authorization: `Bearer ${authToken}`
//         }
//     })
//         .then(res => console.log(res.json()))
//         .then(res => {
//             dispatch(fetchFriendsSuccess(res));
//         })
//         .catch(err => dispatch(fetchFriendsError(err)));
// };

//SUGGESTED FRIENDS LIST?
// export const fetchUserSuggestedlist = user => (dispatch, getState) => {
//     const authToken = getState().auth.authToken;
//     return fetch(`${API_BASE_URL}/friends`, {
//         method: 'GET',
//         headers: {
//             'content-type': 'application/json',
//             Authorization: `Bearer ${authToken}`
//         }
//     })
//         .then(res => normalizeResponseErrors(res))
//         .then(res => res.json())
//         .catch(err => console.log(err))
// }