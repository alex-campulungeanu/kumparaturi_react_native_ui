import * as Actions from './actionsType';

export function changeAvatar(image) {
  // console.log('enter change Avatar actions: ', image)
  return {
    type: Actions.CHANGE_AVATAR_REQUESTED,
    payload: {
      image
    }
  }
}

export function resetAvatar() {
  return {
    type: Actions.CHANGE_AVATAR_RESET,
  }
}