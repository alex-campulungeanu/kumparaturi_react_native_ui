import * as Actions from '../actions/actionsType';

const initialState = {
  data: {},
  isLoading: false,
  isLoadingLogout: false,
  loginError: '',
  logoutError: '',
  isLoggedIn: false,
}

function loginReducer(state = initialState, action) {
  // console.log('loginReducer action: ', action );
  switch (action.type) {
    case Actions.LOGIN_REQUESTED:
      return {...state, isLoading: true}
    case Actions.LOGIN_SUCCEEDED:
      return {...state, isLoading: false, data: action.payload, loginError: '', isLoggedIn: true}
    case Actions.LOGIN_FAILED:
      return {...state, isLoading: false, loginError: action.payload.message, isLoggedIn: false}
    case Actions.RECORD_AUTO_LOGIN:
      return {...state, isLoggedIn: true}

    case Actions.LOGOUT_REQUESTED:
      return {...state, isLoadingLogout: true}
    case Actions.LOGOUT_SUCCEEDED:
      return {...state, isLoadingLogout: false, logoutError: '', isLoggedIn: false}
    case Actions.LOGOUT_FAILED:
      return {...state, isLoadingLogout: false, logoutError: action.payload, isLoggedIn: true}
      
    case Actions.LOGIN_RESET:
      return initialState
  }
  return state
}

export default loginReducer;