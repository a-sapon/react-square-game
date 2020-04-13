import { createStore, applyMiddleware, combineReducers } from 'redux';
import { appReducer, leaderBoardReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
  appReducer,
  leaderBoardReducer
});

const middlewares = [thunk];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
export const store = createStore(rootReducer, enhancer);
