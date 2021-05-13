import * as Actions from '../actions/actionsType';

const initialState = {
  data: '',
  isLoading: false,
  getUserDetailsError: '',
  getUserDetailsSuccess: false,
  // usersListData: '',
  // getUsersListError: '',
  // getUsersListSuccess: false,
  // isLoggedIn: false,
}

function userDetailsReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.GET_USER_DETAILS_REQUESTED:
      return {...state, isLoading: true}
    case Actions.GET_USER_DETAILS_SUCCEEDED:
      return {...state, isLoading: false, data: action.payload, getUserDetailsError: '', getUserDetailsSuccess: true}
    case Actions.GET_USER_DETAILS_FAILED:
      return {...state, isLoading: false, data: [], getUserDetailsError: action.payload, getUserDetailsSuccess: false}
    // case Actions.GET_USER_DETAILS_RESET:
    //   return initialState

    // case Actions.GET_USERS_LIST_REQUESTED:
    //   return {...state, isLoading: true}
    // case Actions.GET_USERS_LIST_SUCCEEDED:
    //   return {...state, isLoading: false, usersListData: action.payload, getUsersListSuccess: '', getUsersListSuccess: true}
    // case Actions.GET_USERS_LIST_FAILED:
    //   return {...state, isLoading: false, usersListData: [], getUsersListSuccess: action.payload, getUsersListSuccess: false}

  }
  return state
}

export default userDetailsReducer;