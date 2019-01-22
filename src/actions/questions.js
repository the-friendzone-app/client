import { API_BASE_URL } from '../config';
import { normalizeResponseErrors } from './utils';

//fetchActivePolls
export const FETCH_ACTIVE_POLLS_SUCCESS = 'FETCH_ACTIVE_POLLS_SUCCESS';
export const fetchActivePollsSuccess = polls => ({
    type: FETCH_ACTIVE_POLLS_SUCCESS,
    polls
});

export const FETCH_ACTIVE_POLLS_ERROR = 'FETCH_ACTIVE_POLLS_ERROR';
export const fetchActivePollsError = error => ({
    type: FETCH_ACTIVE_POLLS_ERROR,
    error
});

export const fetchActivePolls = () => (dispatch, getState) => {
    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions/personality-polls`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((polls) => {

            dispatch(fetchActivePollsSuccess(polls))
        })
        .catch(err => {
            dispatch(fetchActivePollsError(err));
        });
};
//fetchQuestion
export const FETCH_QUESTION_SUCCESS = 'FETCH_QUESTION_SUCCESS';
export const fetchQuestionSuccess = question =>({
type: FETCH_QUESTION_SUCCESS,
question
})


export const FETCH_QUESTION_ERROR = 'FETCH_QUESTION_ERROR';
export const fetchQuestionError = error => ({
    type: FETCH_QUESTION_ERROR,
    error
});

export const fetchQuestion = (category) => (dispatch, getState) => {

    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions/personality-polls/${category}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((question) => {
            dispatch(fetchQuestionSuccess(question))
   
        })
            .catch(err => {
            dispatch(fetchQuestionError(err));
        });
};

//fetch option with pros & cons
export const FETCH_OPTION_SUCCESS = 'FETCH_OPTION_SUCCESS';
export const fetchOptionSuccess = option =>({
type: FETCH_OPTION_SUCCESS,
option
})


export const FETCH_OPTION_ERROR = 'FETCH_OPTION_ERROR';
export const fetchOptionError = error => ({
    type: FETCH_OPTION_ERROR,
    error
});
export const selectedOption = (optionID) => (dispatch, getState) => {

    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions/personality-polls/${optionID}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((option) => {
            dispatch(fetchOptionSuccess(option))
   
        })
            .catch(err => {
            dispatch(fetchQuestionError(err));
        });
};


export const goToAnswerPage = ( history) => {
    history.push('/answerpage')
  

