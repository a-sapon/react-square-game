import { createStore, applyMiddleware, combineReducers } from 'redux';
import { mainReducer, blocksReducer, userReducer, pcReducer } from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

const rootReducer = combineReducers({
  mainReducer,
  blocksReducer,
  userReducer,
  pcReducer
});

export const store = createStore(rootReducer, enhancer);