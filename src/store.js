import {createStore, applyMiddleware, combineReducers} from 'redux';
import {reducer as formReducer} from 'redux-form';
import thunk from 'redux-thunk';
import {loadAuthToken} from './local-storage';
import authReducer from './reducers/auth';
import meetupsReducer from './reducers/meetups';
import friendsReducer from './reducers/friends';
import questionReducer from './reducers/questions';
import {setAuthToken, refreshAuthToken} from './actions/auth';
import {composeWithDevTools} from 'redux-devtools-extension';

const store = createStore(
    combineReducers({
        form: formReducer,
        auth: authReducer,
        meetups: meetupsReducer,
        friends: friendsReducer,
        questions: questionReducer
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
