import * as actions from '../actions/community';

const initialState = {
  community: [{
    id: 654321,
    topics: [{
      id: 123456,
      title: 'Horror',
      creatorUser: 'megatonLizard114',
      tags: ['#slasher', '#psychological'],
      description: 'I want to talk about Friday the 13th Part CVII! What are people\'s thoughts?',
      comments: [
        { 
          id: 1111,
          user: 'KingGizardTheLizardWizard',
          comment: 'This movie was terrifiying!'
        },
        {
          id: 2222,
          user: 'YourMomIsMothra',
          comment: 'I wish this movie was scarier, just a boring gorehound flick...'
        },
      ]
    }],
    mainTitle: 'Movies',
    description: 'Discussions around movies',
  }],
  error: null,
  loading: false
};

export default function forumsReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_FORUM_REQUEST:
      return { ...state, loading: true };
    case actions.FETCH_FORUM_SUCCESS:
      return { ...state, community: action.forum, error: null, loading: false };
    case actions.FETCH_FORUM_ERROR:
      return { ...state, loading: false, error: action.error };
    case actions.POST_FORUM_REQUEST:
      return { ...state, loading: true };
    case actions.POST_FORUM_SUCCESS:
      return { ...state, error: null, loading: false };
    case actions.POST_FORUM_ERROR:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}