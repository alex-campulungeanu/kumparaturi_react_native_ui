import * as Actions from './actionsType'

export function login(username, password) {
  return {
    type: Actions.LOGIN_REQUESTED,
    payload: {
      username,
      password
    } 
  }
}

export function resetlogin() {
  console.log('enter resetlogin')
  return {
    type: Actions.LOGIN_RESET,
  }
}

export function recordAutoLogin() {
  return {
    type: Actions.RECORD_AUTO_LOGIN,
  }
}