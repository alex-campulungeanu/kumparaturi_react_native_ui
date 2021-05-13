import { createStore, combineReducers, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
// import logger from 'redux-logger';

import todosReducer from '../reducers/todosReducer';
import registerReducer from '../reducers/registerReducer';
import loginReducer from '../reducers/loginReducer';
import userDetailsReducer from '../reducers/userDetailsReducer';
import changeSettingReducer from '../reducers/changeSettingReducer';
import changeAvatarReducer from '../reducers/changeAvatarReducer';
import shoppingListReducer from './../reducers/shoppingListReducer';
import * as todosFlow from '../sagas/todosSaga';
import * as registerFlow from '../sagas/registerSaga';
import * as loginFlow from '../sagas/loginSaga';
import * as logoutFlow from '../sagas/logoutSaga';
import * as userDetailsFlow from '../sagas/userDetailsSaga';
import * as changeSettingFlow from '../sagas/changeSettingSaga';
import * as changeAvatarFlow from '../sagas/changeAvatarSaga';
import * as shoppingListFlow from '../sagas/shoppingListSaga';

const sagaMiddleware = createSagaMiddleware()
const appReducer = combineReducers({
  todosReducer,
  registerReducer,
  loginReducer,
  userDetailsReducer,
  changeSettingReducer,
  changeAvatarReducer,
  shoppingListReducer
})

if (typeof window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === 'undefined') {
  var store = createStore(appReducer, applyMiddleware(sagaMiddleware));
  // var store = createStore(appReducer, applyMiddleware(sagaMiddleware, logger));
} else {
  var store = createStore(appReducer, window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(applyMiddleware(sagaMiddleware)));
}

sagaMiddleware.run(todosFlow.todosGet);
sagaMiddleware.run(todosFlow.todosDelete);
sagaMiddleware.run(todosFlow.todosDeleteAllTodo);
sagaMiddleware.run(todosFlow.todosAdd);
sagaMiddleware.run(todosFlow.todosUpdateStatus);
sagaMiddleware.run(todosFlow.todosEditName);
sagaMiddleware.run(registerFlow.registerWatch);
sagaMiddleware.run(loginFlow.loginWatch);
sagaMiddleware.run(logoutFlow.logoutWatch);
sagaMiddleware.run(userDetailsFlow.userDetailsWatch);
sagaMiddleware.run(changeSettingFlow.changeSettingWatch);
sagaMiddleware.run(changeAvatarFlow.changeAvatarWatch);
sagaMiddleware.run(shoppingListFlow.getShoppingListWatch);
sagaMiddleware.run(shoppingListFlow.addShoppingListWatch);
sagaMiddleware.run(shoppingListFlow.deleteShoppingListWatch);

export default store;