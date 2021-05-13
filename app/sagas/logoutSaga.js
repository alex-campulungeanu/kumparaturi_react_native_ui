import { takeEvery, call, put } from 'redux-saga/effects';
import * as Actions from '../actions/actionsType';
import * as Api from '../configs/api';
import * as Utils from '../configs/utils';

export function* logout() {
  try {
    // const response = yield call(Api.logout)
    const response = {
      'status': 'ok',
      'message': 'success logout',
      'payload': ''
    }
    console.log('response: ', response)
    if (response.status === 'ok') {
      Utils.deleteToken()
      yield put({type: Actions.LOGOUT_SUCCEEDED, payload: response.payload})
    } else {
      yield put({type: Actions.LOGOUT_FAILED, payload: response.payload})
    }
  } catch(error) {
    yield put({type: Actions.LOGOUT_FAILED, payload: error.payload})
  }
}

export function* logoutWatch() {
  yield takeEvery(Actions.LOGOUT_REQUESTED, logout)
}
