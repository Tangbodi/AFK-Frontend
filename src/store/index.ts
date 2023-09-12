import { legacy_createStore, combineReducers, compose, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk' //解决redux异步修改数据问题
// import reducer from './reducer.ts'
import gobalStatus from './GlobalStatus/reducer'
const reducers = combineReducers({
  gobalStatus
})


// const store = legacy_createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())  

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const store = legacy_createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)))

export default store  