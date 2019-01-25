
const initialState = {
  activePolls: [],
  introQuiz: [],
  currentQuestion: null,
  questionID: null,
  options: [],
  optionIndex: null,
  error: null,
  loading: false,
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
      case 'FETCH_INTRO_SUCCESS':
      return {
        ...state,
        introQuiz: action.questions,
      }

    case 'FETCH_INTRO_ERROR':
      return {
        ...state,
        error: action.error
      }
 
    default:
      return state;
  }
}

export default questions