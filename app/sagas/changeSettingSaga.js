import { takeEvery, call, put } from 'redux-saga/effects'
import * as Api from '../configs/api';
import * as Actions from '../actions/actionsType';
import * as Utils from '../configs/utils';


export function* changeSettingPassword(action) {
  try {
    const response = yield call(Api.changePassword, action.payload);
    // const response = {
    //   status: 'ok',
    // }
    if (response.status === 'ok') {
        yield put({type: Actions.CHANGE_PASSWORD_SUCCEEDED, payload: response.payload})
    } else if (response.status === 'token_error') {
        Utils.deleteToken();
        yield put({type: Actions.CHANGE_PASSWORD_FAILED_TOKEN, payload: response.payload})
    } else {
        yield put({type: Actions.CHANGE_PASSWORD_FAILED, payload: response.payload})
    }
  } catch(error) {
    console.log('changePasswordSaga -> changePassword error: ', error);
  }
}

export function* changeSendNotification(action) {
  try {
    const response = yield call(Api.changeSettingNotification, action.payload);
    // const response = {
    //   status: 'ok',
    // }
    if (response.status === 'ok') {
        yield put({type: Actions.CHANGE_SEND_NOTIFICATION_SUCCEEDED, payload: response.payload})
    } else if (response.status === 'token_error') {
        Utils.deleteToken();
        yield put({type: Actions.CHANGE_SEND_NOTIFICATION_FAILED_TOKEN, payload: response.payload})
    } else {
        yield put({type: Actions.CHANGE_SEND_NOTIFICATION_FAILED, payload: response.payload})
    }
  } catch(error) {
    //TODO: catch this in SettingsHome and make value for <Swithch/>> component accordingly
    yield put({type: Actions.CHANGE_SEND_NOTIFICATION_FAILED, payload: "Unfortunate error !"})
    console.log('changeSendNotification -> changeSendNotification error: ', error);
  }
}

export function* changeReceiveNotification(action) {
  // console.log('action changeReceiveNotification', action)
  try {
    const response = yield call(Api.changeSettingNotification, action.payload);
    // const response = {
    //   status: 'ok',
    // }
    if (response.status === 'ok') {
        yield put({type: Actions.CHANGE_RECEIVE_NOTIFICATION_SUCCEEDED, payload: response.payload})
    } else if (response.status === 'token_error') {
        Utils.deleteToken();
        yield put({type: Actions.CHANGE_RECEIVE_NOTIFICATION_FAILED_TOKEN, payload: response.payload})
    } else {
        yield put({type: Actions.CHANGE_RECEIVE_NOTIFICATION_FAILED, payload: response.payload})
    }
  } catch(error) {
    console.log('changeSendNotification -> changeSendNotification error: ', error);
  }
}

export function* changeSettingWatch() {
  yield takeEvery(Actions.CHANGE_PASSWORD_REQUESTED, changeSettingPassword)
  yield takeEvery(Actions.CHANGE_SEND_NOTIFICATION_REQUESTED, changeSendNotification)
  yield takeEvery(Actions.CHANGE_RECEIVE_NOTIFICATION_REQUESTED, changeReceiveNotification)
}