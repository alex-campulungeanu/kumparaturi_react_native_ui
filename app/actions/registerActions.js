import * as Actions from './actionsType'

export function register(name, username, email, password, image, secretWord, sendActivationEmail) {
  return {
    type: Actions.REGISTER_REQUESTED,
    payload: {
      name,
      username,
      email,
      password,
      userImage: image,
      secretWord: secretWord,
      sendActivationEmail
    } 
  }
}

export function resetRegister() {
  return {
    type: Actions.REGISTER_RESET,
  }
}