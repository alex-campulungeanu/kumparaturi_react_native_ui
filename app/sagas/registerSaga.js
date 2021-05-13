import { takeEvery, call, put } from 'redux-saga/effects';
import * as Actions from '../actions/actionsType';
import * as Api from '../configs/api';

export function* register(action) {
  try {
    // yield put({type: Actions.LOADING_ACTION});
    const response = yield call(Api.register, action.payload.name, action.payload.username, action.payload.email, action.payload.password, action.payload.userImage, action.payload.secretWord, action.payload.sendActivationEmail)
    if (response.success) {
      yield put({type: Actions.REGISTER_SUCCEEDED, payload: response.message})
    } else {
      yield put({type: Actions.REGISTER_FAILED, payload: response.message})
    }
  } catch(error) {
    yield put({type: Actions.REGISTER_FAILED, payload: error.payload})
  }
}

export function* registerWatch() {
  yield takeEvery(Actions.REGISTER_REQUESTED, register)
}