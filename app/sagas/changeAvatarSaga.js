import { takeEvery, call, put } from 'redux-saga/effects'
import * as Api from '../configs/api';
import * as Actions from '../actions/actionsType';
import * as Utils from '../configs/utils';
import Constants from '../constants/StringList'


export function* changeAvatar(action) {
  try {
    // console.log('action payload image', action.payload.image)
    const response = yield call(Api.changeAvatar, action.payload.image);
    // const response = {
    //   status: 'ok',
    // }
    if (response.status === 'ok') {
        yield put({type: Actions.CHANGE_AVATAR_SUCCEEDED, payload: response.payload})
    } else if (response.status === 'token_error') {
        Utils.deleteToken();
        yield put({type: Actions.CHANGE_AVATAR_FAILED_TOKEN, payload: response.payload})
    } else {
        yield put({type: Actions.CHANGE_AVATAR_FAILED, payload: response.payload})
    }
  } catch(error) {
    yield put({type: Actions.CHANGE_AVATAR_FAILED, payload: Constants.GENERIC_ERROR_TEXT})
    console.log('changeAvatarSaga -> changeAvatar error: ', error);
  }
}

export function* changeAvatarWatch() {
  yield takeEvery(Actions.CHANGE_AVATAR_REQUESTED, changeAvatar)
}