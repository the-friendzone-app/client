import {
  TOGGLE_SHOW_EVENT_SEARCH_FORM,
  FETCH_EVENTBRITE_API_REQUEST,
  FETCH_EVENTBRITE_API_SUCCESS,
  FETCH_EVENTBRITE_API_ERROR,
  FETCH_EVENTBRITE_VENUE_REQUEST,
  FETCH_EVENTBRITE_VENUE_SUCCESS,
  FETCH_EVENTBRITE_VENUE_ERROR,
} from '../actions/event-search';

const initialState = {
  showEventSearchForm: true,
  searchResults: null,
  loading: false,
  error: null,
  searchResultsVenue: null,
}

export default function reducer(state=initialState, action) {
  if(action.type === TOGGLE_SHOW_EVENT_SEARCH_FORM) {
    return {
      ...state,
      showEventSearchForm: !state.showEventSearchForm,
    }
  } if (action.type === FETCH_EVENTBRITE_API_REQUEST) {
    return {
      ...state,
      loading: true,
    }
  } if (action.type === FETCH_EVENTBRITE_API_SUCCESS) {
    return {
      ...state, 
      searchResults: action.searchQuery,
      loading: false,
    }
  } if (action.type === FETCH_EVENTBRITE_API_ERROR) {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  } if (action.type === FETCH_EVENTBRITE_VENUE_REQUEST) {
    return {
      ...state, 
      loading: true,
    }
  } if (action.type === FETCH_EVENTBRITE_VENUE_SUCCESS) {
    return {
      ...state,
      searchResultsVenue: action.results,
      loading: false,
    }
  } if (action.type === FETCH_EVENTBRITE_VENUE_ERROR) {
    return {
      ...state,
      error: action.error,
      loading: false,
    }
  }

  return state;
}