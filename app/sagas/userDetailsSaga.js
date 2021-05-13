import { takeEvery, call, put } from 'redux-saga/effects'
import * as Api from '../configs/api';
import * as Actions from '../actions/actionsType';
import * as Utils from '../configs/utils';


export function* getUserDetails() {
  try {
    const response = yield call(Api.getUserDetails);
    if (response.status === 'ok') {
        yield put({type: Actions.GET_USER_DETAILS_SUCCEEDED, payload: response.payload})
    } else {
        yield put({type: Actions.GET_USER_DETAILS_FAILED, payload: response.payload})
    }
  } catch(error) {
    yield put({type: Actions.GET_USER_DETAILS_FAILED, payload: error})
  }
}

export function* getUsersList() {
  try {
    const response = yield call(Api.getUsersList);
    if (response.status === 'ok') {
        yield put({type: Actions.GET_USERS_LIST_SUCCEEDED, payload: response.payload})
    } else {
        yield put({type: Actions.GET_USERS_LIST_FAILED, payload: response.payload})
    }
  } catch(error) {
    yield put({type: Actions.GET_USERS_LIST_FAILED, payload: error})
  }
}

export function* userDetailsWatch() {
  yield takeEvery(Actions.GET_USER_DETAILS_REQUESTED, getUserDetails)
}

export function* usersListWatch() {
  yield takeEvery(Actions.GET_USERS_LIST_REQUESTED, getUserDetails)
}