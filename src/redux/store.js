import { createStore, applyMiddleware } from 'redux';
import { reducer } from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middlewares = [thunk];
const enhancer = composeWithDevTools(applyMiddleware(...middlewares));

export const store = createStore(reducer, enhancer);