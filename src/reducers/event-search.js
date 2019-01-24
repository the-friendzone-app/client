import {
  TOGGLE_SHOW_EVENT_SEARCH_FORM,
} from '../actions/event-search';

const initialState = {
  showEventSearchForm: true,
}

export default function reducer(state=initialState, action) {
  if(action.type === TOGGLE_SHOW_EVENT_SEARCH_FORM) {
    return {
      ...state,
      showEventSearchForm: !state.showEventSearchForm,
    }
  }
  return state;
}