import {API_BASE_URL} from '../config';
import {normalizeResponseErrors} from './utils';

export const TOGGLE_SHOW_EVENT_SEARCH_FORM = 'TOGGLE_SHOW_EVENT_SEARCH_FORM';
export const toggleShowEventSearchForm = () => ({
  type: TOGGLE_SHOW_EVENT_SEARCH_FORM,
});