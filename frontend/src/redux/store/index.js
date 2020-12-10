import {createStore, applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware();
const middleWares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  middleWares.push(logger);
}

const store = createStore(rootReducer, applyMiddleware(...middleWares));
sagaMiddleware.run(rootSaga);

export default store;
