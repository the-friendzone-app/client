import { createStore, applyMiddleware, combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import thunk from 'redux-thunk';
import { loadAuthToken } from './local-storage';
import authReducer from './reducers/auth';
import meetupsReducer from './reducers/meetups';

import questionReducer from './reducers/questions';

import forumsReducer from './reducers/community';
import userReducer from './reducers/users';
import { setAuthToken, refreshAuthToken } from './actions/auth';
import { composeWithDevTools } from 'redux-devtools-extension';
import eventsReducer from './reducers/event-search';


const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        meetups: meetupsReducer,
        user: userReducer,
        questions: questionReducer,
        community: forumsReducer,
        event: eventsReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
);

// Hydrate the authToken from localStorage if it exist
const authToken = loadAuthToken();
if (authToken) {
    const token = authToken;
    store.dispatch(setAuthToken(token));
    store.dispatch(refreshAuthToken());
}

export default store;
