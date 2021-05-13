import * as Actions from './actionsType';

export function getUserDetails() {
  return {
    type: Actions.GET_USER_DETAILS_REQUESTED,
  }
}

export function getUsersList() {
  return {
    type: Actions.GET_USERS_LIST_REQUESTED,
  }
}