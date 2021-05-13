import * as Actions from '../actions/actionsType';

const initialState = {
  data: {},
  isLoading: false,
  registerError: '',
  registerSuccess: false
}

function registerReducer(state = initialState, action) {
  // console.log('regiserReduceraction: ', action );
  switch (action.type) {
    case Actions.REGISTER_REQUESTED:
      return {...state, isLoading: true}
    case Actions.REGISTER_SUCCEEDED:
      return {...state, isLoading: false, data: action.payload, registerError: '', registerSuccess: true}
    case Actions.REGISTER_FAILED:
      return {...state, isLoading: false, registerError: action.payload, registerSuccess: false}
    case Actions.REGISTER_RESET:
      return initialState
  }
  return state
}

export default registerReducer;