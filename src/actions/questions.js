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

//fetchQuestion
export const ANSWER_QUESTION_SUCCESS = 'ANSWER_QUESTION_SUCCESS';
export const answerQuestionSuccess = userAnswers =>({
type: ANSWER_QUESTION_SUCCESS,
userAnswers
})


export const ANSWER_QUESTION_ERROR = 'ANSWER_QUESTION_ERROR';
export const answerQuestionError = error => ({
    type: ANSWER_QUESTION_ERROR,
    error
});

export const answerQuestion = (questionId, answer) => (dispatch, getState) => {

    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions/user-answered/${questionId}/${answer}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((userAnswers) => {
            dispatch(answerQuestionSuccess(userAnswers))
   
        })
            .catch(err => {
            dispatch(answerQuestionError(err));
        });
};

//fetch option with pros & cons
export const FETCH_OPTION_SUCCESS = 'FETCH_OPTION_SUCCESS';
export const fetchOptionSuccess = option =>({
type: FETCH_OPTION_SUCCESS,
option
});


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

export const SUBMIT_USERANSWER_SUCCESS = 'SUBMIT_USERANSWER_SUCCESS';
export const submitUserAnswerSuccess = index => ({
    type: SUBMIT_USERANSWER_SUCCESS,
    index
})

export const submitAnswer = (index) => {

    return {
        type: SUBMIT_USERANSWER_SUCCESS,
        index
    }
}

//fetch introquiz
export const FETCH_INTRO_SUCCESS = 'FETCH_INTRO_SUCCESS';
export const fetchIntroSuccess = (questions, answered) =>({
type: FETCH_INTRO_SUCCESS,
questions,
answered
});


export const FETCH_INTRO_ERROR = 'FETCH_INTRO_ERROR';
export const fetchIntroError = error => ({
    type: FETCH_INTRO_ERROR,
    error
});

export const fetchIntroQuestions = () => (dispatch, getState) => {

    const authToken = getState().auth.authToken;
    return fetch(`${API_BASE_URL}/questions/intro-quiz`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${authToken}`
        }
    })
        .then(res => normalizeResponseErrors(res))
        .then(res => res.json())
        .then((data) => {
            console.log('consolelog', data.questions, data.answered)
            dispatch(fetchIntroSuccess(data.questions, data.answered))
   
        })
            .catch(err => {
            dispatch(fetchIntroError(err));
        });
};