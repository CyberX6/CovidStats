import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
// @ts-ignore
// import logger from 'redux-logger'
import rootReducer from './root-reducer'
import rootSaga from './root-sags'

const sagaMiddleware = createSagaMiddleware()

const middlewares = [sagaMiddleware]

// if (process.env.NODE_ENV === 'development') {
//   middlewares.push(logger)
// }

export const store = createStore(rootReducer, applyMiddleware(...middlewares))

sagaMiddleware.run(rootSaga)

export default store
