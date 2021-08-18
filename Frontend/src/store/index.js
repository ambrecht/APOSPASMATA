import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { formReducer } from './formReducer';
import { zitatReducer } from './zitatReducer';
import { selectReducer } from './selectReducer';
import { addAuthorBookReducer } from './addAuthorBookReducer';
import thunk from 'redux-thunk';

const composeEnhancers = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;
const enhancer = composeEnhancers(
  applyMiddleware(thunk)
  // other store enhancers if any
);

export const store = createStore(
  combineReducers({
    formInput: formReducer,
    authorBook: addAuthorBookReducer,
    zitatOutput: zitatReducer,
    selectOptions: selectReducer,
  }),
  enhancer
);
