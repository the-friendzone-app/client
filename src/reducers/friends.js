// import {
//   FETCH_FRIENDS_REQUEST,
//   FETCH_FRIENDS_SUCCESS,
//   FETCH_FRIENDS_ERROR
// } from '../actions/friends';

// const initialState = {
//   friends: [],
//   loading: false,
//   error: null
// };

// export default function reducer(state = initialState, action) {
//   if (action.type === FETCH_FRIENDS_REQUEST) {
//     return Object.assign({}, state, {
//       loading: true,
//       error: null
//     });
//   }
//   else if (action.type === FETCH_FRIENDS_SUCCESS) {
//     return Object.assign({}, state, {
//       friends: action.friends,
//       loading: false
//     });
//   }
//   else if (action.type === FETCH_FRIENDS_ERROR) {
//     return Object.assign({}, state, {
//       loading: true,
//       error: action.error
//     });
//   }
//   return state;
// }