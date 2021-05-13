import * as Actions from './actionsType';

export function changePassword(oldPassword, newPassword) {
  return {
    type: Actions.CHANGE_PASSWORD_REQUESTED,
    payload: {
      setting_type: 'password',
      oldPassword,
      newPassword,
    }
  }
}

export function changeSendNotification(newStatus) {
  return {
    type: Actions.CHANGE_SEND_NOTIFICATION_REQUESTED,
    payload: {
      // setting_type: 'sendNotification',
      setting_type: 1,
      newStatus,
    }
  }
}

export function changeReceiveNotification(newStatus) {
  return {
    type: Actions.CHANGE_RECEIVE_NOTIFICATION_REQUESTED,
    payload: {
      // setting_type: 'receiveNotification',
      setting_type: 2,
      newStatus,
    }
  }
}

export function resetPassword() {
  return {
    type: Actions.CHANGE_PASSWORD_RESET,
  }
}

export function resetReceiveNotification() {
  return {
    type: Actions.CHANGE_RECEIVE_NOTIFICATION_RESET,
  }
}