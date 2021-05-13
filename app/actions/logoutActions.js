import * as Actions from '../actions/actionsType';

export function logout() {
  return {
    type: Actions.LOGOUT_REQUESTED,
  }
}

// export function logout() {
//   console.log('Actions.LOGOUT_REQUESTED', Actions.LOGOUT_REQUESTED)
//   Promise.resolve(
//    {
//     type: Actions.LOGOUT_REQUESTED
//   })
// }