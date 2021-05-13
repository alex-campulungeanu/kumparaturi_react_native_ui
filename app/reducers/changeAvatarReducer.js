import * as Actions from '../actions/actionsType';

const initialState = {
  data: '',
  isLoading: false,
  changeAvatarError: '',
  changeAvatarSuccess: false,
}

function changeAvatarReducer(state = initialState, action) {
  switch (action.type) {
    case Actions.CHANGE_AVATAR_REQUESTED:
      return {...state, isLoading: true}
    case Actions.CHANGE_AVATAR_SUCCEEDED:
      return {...state, isLoading: false, data: action.payload, changeAvatarError: '', changeAvatarSuccess: true}
    case Actions.CHANGE_AVATAR_FAILED:
      return {...state, isLoading: false, changeAvatarError: action.payload, changeAvatarSuccess: false}
    case Actions.CHANGE_AVATAR_RESET:
      return initialState
  }
  return state
}

export default changeAvatarReducer;