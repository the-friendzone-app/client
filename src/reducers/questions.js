

const initialState = {
  activePolls: [],
  currentQuestion: null,
  questionID: null,
  options: [],
  optionIndex: null,
  error: null,
  loading: false
};

const questions = (state = initialState, action) => {
  switch (action.type) {

    case 'FETCH_ACTIVE_POLLS_SUCCESS':
      return {
        ...state,
        activePolls: action.polls
      }
    case 'FETCH_ACTIVE_POLLS_ERROR':
      return {
        ...state,
        error: action.error
      }
    case 'FETCH_QUESTION_SUCCESS':
      return {
        ...state,
        currentQuestion: action.question.question,
        questionID: action.question.id,
        options: action.question.options
      }

    case 'FETCH_QUESTION_ERROR':
      return {
        ...state,
        error: action.error
      }
      case 'SUBMIT_USERANSWER_SUCCESS':
      return {
        ...state,
        optionIndex: action.index
      }
    // case 'FETCH'
    //   case actions.FETCH_QUESTION_REQUEST:
    //     return { ...state, loading: true };
    //   case actions.FETCH_QUESTION_SUCCESS:
    //     return { ...state, questions: action.questions, error: null, loading: false };
    //   case actions.FETCH_QUESTION_ERROR:
    //     return { ...state, loading: false, error: action.error };
    //   case actions.POST_ANSWER_REQUEST:
    //     return { ...state, loading: true };
    //   case actions.POST_ANSWER_SUCCESS:
    //     return { ...state, error: null, loading: false };
    //   case actions.POST_ANSWER_ERROR:
    //     return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

export default questions