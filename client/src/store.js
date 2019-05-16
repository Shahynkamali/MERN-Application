import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers';

const initialState = {}
const middlewware = [thunk]
const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
))

export default store