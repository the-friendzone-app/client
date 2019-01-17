import * as actions from '../actions/questions';

const initialState = {
  questions: {
    _id: null,
    question: null,
    answers: null,
    category: null
  },
  error: null,
  loading: false
};

export default function questionsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_QUESTION_REQUEST:
      return { ...state, loading: true };
    case actions.FETCH_QUESTION_SUCCESS:
      return { ...state, questions: action.questions, error: null, loading: false };
    case actions.FETCH_QUESTION_ERROR:
      return { ...state, loading: false, error: action.error };
    case actions.POST_ANSWER_REQUEST:
      return { ...state, loading: true };
    case actions.POST_ANSWER_SUCCESS:
      return { ...state, error: null, loading: false };
    case actions.POST_ANSWER_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}