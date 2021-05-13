import * as Actions from '../actions/actionsType';

const initialState = {
  data: '',
  isLoading: false,
  changeSettingSuccess: false,
  changeSettingError: '',
  changeSettingReceiveNotificationSuccess: false,
  changeSettingReceiveNotificationError: '',
  changeSettingSendNotificationSuccess: false,
  changeSettingSendNotificationError: '',
  // isLoggedIn: false,
}

function changeSettingReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.CHANGE_PASSWORD_REQUESTED:
      return {...state, isLoading: true}
    case Actions.CHANGE_PASSWORD_SUCCEEDED:
      return {...state, isLoading: false, data: action.payload, changeSettingError: '', changeSettingSuccess: true}
    case Actions.CHANGE_PASSWORD_FAILED:
      return {...state, isLoading: false, changeSettingError: action.payload, changeSettingSuccess: false}
    case Actions.CHANGE_PASSWORD_RESET:
      return initialState
      
    case Actions.CHANGE_RECEIVE_NOTIFICATION_REQUESTED:
      return {...state, isLoading: true}
    case Actions.CHANGE_RECEIVE_NOTIFICATION_SUCCEEDED:
      return {...state, isLoading: false, data: action.payload, changeSettingReceiveNotificationError: '', changeSettingReceiveNotificationSuccess: true}
    case Actions.CHANGE_RECEIVE_NOTIFICATION_FAILED:
      return {...state, isLoading: false, changeSettingReceiveNotificationError: action.payload, changeSettingReceiveNotificationSuccess: false}
    case Actions.CHANGE_RECEIVE_NOTIFICATION_RESET:
      return initialState

    case Actions.CHANGE_SEND_NOTIFICATION_REQUESTED:
      return {...state, isLoading: true}
    case Actions.CHANGE_SEND_NOTIFICATION_SUCCEEDED:
      return {...state, isLoading: false, data: action.payload, changeSettingSendNotificationError: '', changeSettingSendNotificationSuccess: true}
    case Actions.CHANGE_SEND_NOTIFICATION_FAILED:
      return {...state, isLoading: false, changeSettingSendNotificationError: action.payload, changeSettingSendNotificationSuccess: false}
    case Actions.CHANGE_SEND_NOTIFICATION_RESET:
      return initialState
  }
  return state
}

export default changeSettingReducer;