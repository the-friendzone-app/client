import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const TOGGLE_SHOW_EVENT_SEARCH_FORM = 'TOGGLE_SHOW_EVENT_SEARCH_FORM';
export const toggleShowEventSearchForm = () => ({
  type: TOGGLE_SHOW_EVENT_SEARCH_FORM,
});

export const FETCH_EVENTBRITE_API_REQUEST = 'FETCH_EVENTBRITE_API_REQUEST';
export const fetchEventbriteApiRequest = () => ({
  type: FETCH_EVENTBRITE_API_REQUEST,
});

export const FETCH_EVENTBRITE_API_SUCCESS = 'FETCH_EVENTBRITE_API_SUCCESS';
export const fetchEventbriteApiSuccess = (searchQuery) => ({
  type: FETCH_EVENTBRITE_API_SUCCESS,
  searchQuery,
});

export const FETCH_EVENTBRITE_API_ERROR = 'FETCH_EVENTBRITE_API_ERROR';
export const fetchEventbriteApiError = (error) => ({
  type: FETCH_EVENTBRITE_API_ERROR,
  error,
});

export const fetchEventbriteApi = userSearchQuery => (dispatch, getState) => {
  dispatch(fetchEventbriteApiRequest());
  const { latitude, longitude, search, searchDistance, price, categories, formats, startTime, endTime } = userSearchQuery;
  const authToken = getState().auth.authToken;
  return fetch(`${API_BASE_URL}/eventbrite-search`, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${authToken}`
    },
    body: JSON.stringify({
      latitude, 
      longitude, 
      search, 
      searchDistance, 
      price, 
      categories, 
      formats, 
      startTime, 
      endTime,
    })
  })
  .then(res => normalizeResponseErrors(res))
  .then(res => res.json())
  .then(res => dispatch(fetchEventbriteApiSuccess(res)))
  // .then(events => {
  //   console.log('res line 53', events)
  //   console.log('res line 54', events.searchQuery.events);
  //   events = events.searchQuery.events;
  //   // break it down and update state here with an action call
  //   return fetch(`${API_BASE_URL}/eventbrite-search-complete`, {
  //     method: 'PUT',
  //     headers: {
  //       'Accept': 'application/json',
  //       'Content-Type': 'application/json',
  //       'Authorization': `Bearer ${authToken}`
  //     },
  //     body: JSON.stringify({
  //       events,
  //     })
  //   })
  // })
  // .then(res => normalizeResponseErrors(res))
  // .then(res => res.json())
  // .then(events => {
  //   console.log('complete results ----->', events)
  // })
  .catch(err => dispatch(fetchEventbriteApiError(err)))
}