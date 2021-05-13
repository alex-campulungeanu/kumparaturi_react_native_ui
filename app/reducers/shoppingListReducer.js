import * as Actions from '../actions/actionsType';
import * as Utils from '../configs/utils';

const initialState = {
  data: [],
  isFetching: false,
  isLoading: false,
  error: '',
}

function shoppingListReducer(state = initialState, action) {
  // console.log('shoppingListReducer action: ', action)
  // console.log('shoppingListReducer state: ', state)
  switch(action.type) {
    case Actions.GET_ALL_SHOPPING_LISTS_REQUESTED:
      return {...state, isLoading: true}
    case Actions.GET_ALL_SHOPPING_LISTS_SUCCEEDED:
      return {...state, isFetching: false, isLoading: false, data: action.payload, error: ''}
    case Actions.GET_ALL_SHOPPING_LISTS_FAILED:
      return {...state, isFetching: false, isLoading: false, data: [], error: action.payload}

    case Actions.ADD_SHOPPING_LIST_REQUESTED:
      return {...state, isLoading: true}
    case Actions.ADD_SHOPPING_LIST_SUCCEEDED:
      return {...state, data: [...state.data, action.payload], isLoading: false}
    case Actions.ADD_SHOPPING_LIST_FAILED:
      return {...state, isLoading: false, error: action.payload}

    case Actions.DELETE_SHOPPING_LIST_REQUESTED:
      return {...state, isLoading: true}
    case Actions.DELETE_SHOPPING_LIST_SUCCEEDED:
      let afterDelete = state.data.filter(item => {
        return action.payload !== item.id;
      });
      return {...state, data: afterDelete, isLoading: false}
    case Actions.DELETE_SHOPPING_LIST_FAILED:
      return {...state, isLoading:false, error: action.payload.error}
  }
  return state
}

export default shoppingListReducer;