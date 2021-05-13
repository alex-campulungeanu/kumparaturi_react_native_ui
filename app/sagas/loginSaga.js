import { takeEvery, call, put } from 'redux-saga/effects';
import * as Actions from '../actions/actionsType';
import * as Api from '../configs/api';
import * as Utils from '../configs/utils';

export function* login(action) {
  try {
    // yield put({type: Actions.LOADING_ACTION});
    const response = yield call(Api.login, action.payload.username, action.payload.password)
    if (response.status === 'ok') {
      Utils.storeToken(response.accessToken)
      yield put({type: Actions.LOGIN_SUCCEEDED, payload: response})
    } else {
      console.log(response)
      yield put({type: Actions.LOGIN_FAILED, payload: response})
    }
  } catch(error) {
    yield put({type: Actions.LOGIN_FAILED, payload: error})
  }
}

export function* loginWatch() {
  yield takeEvery(Actions.LOGIN_REQUESTED, login)
}
