import * as Actions from '../actions/actionsType';
import * as Utils from '../configs/utils';

const initialState = {
  data: [],
  isFetching: false,
  isLoading: false,
  isLoadingAddTodo: false,
  tokenError: false,
  error: '',
  deleteAllError: '',
  deleteItemError: '',
  addItemError: '',
}

function todosReducer(state = initialState, action) {
  switch(action.type) {
    case Actions.SELECT_TODO_REQUESTED:
      let newData = state.data.map(item => {
        if (item.id == action.payload.id) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
      return {...state, data: newData, isLoading: false}
    
    case Actions.GET_ALL_TODOS_REQUESTED:
      return {...state, isLoading: true}
    case Actions.GET_ALL_TODOS_SUCCEEDED:
      return {...state, isFetching: false, isLoading: false, data: action.payload, error: ''}
    case Actions.GET_ALL_TODOS_FAILED:
      return {...state, isFetching: false, isLoading: false, data: [], error: action.payload}
    case Actions.GET_ALL_TODOS_FAILED_TOKEN:
      return {...state, isFetching: false, isLoading: false, error: action.payload, tokenError: true}

    case Actions.DELETE_TODO_REQUESTED:
      return {...state, isLoading: true}
    case Actions.DELETE_TODO_SUCCEEDED:
      let afterDelete = state.data.filter(item => {
        return !action.payload.ids.includes(item.id);
      });
      return {...state, data: afterDelete, isLoading: false}
    case Actions.DELETE_TODO_FAILED:
      return {...state, isLoading:false, deleteItemError: action.payload.error}

    case Actions.DELETE_ALL_TODO_REQUESTED:
      return {...state, isLoading: true}
    case Actions.DELETE_ALL_TODO_SUCCEEDED:
      if (action.payload.statusId == '-1') {
        var afterAllDelete = []
      } else {
        var afterAllDelete = state.data.filter(item => {
          return item.status_id !== action.payload.statusId
        }) 
      };
      return {...state, isLoading: false, data: afterAllDelete, deleteAllError:''}
    case Actions.DELETE_ALL_TODO_FAILED:
      return {...state, isLoading: false, deleteAllError: action.payload}
    
    case Actions.ADD_TODO_REQUESTED:
      return {...state, isLoadingAddTodo: true}
    case Actions.ADD_TODO_SUCCEEDED:
      return {...state, data: [action.payload[0], ...state.data], isLoadingAddTodo: false} //push array element on beginnig
    case Actions.ADD_TODO_FAILED:
      return {...state, isLoadingAddTodo: false, error: action.payload}

    case Actions.UPDATE_TODO_SUCCEEDED:
      let afterUpdate = state.data.map(obj =>{ 
        var newObj = {};
        newObj = obj;
        if(obj.id == action.payload.id) {
          newObj.status_id = action.payload.status_id;
        }
        return newObj;
      });
      let afterUpdateSorted = afterUpdate.sort(Utils.sortByProperty("status_id"));
      return {...state, data: afterUpdateSorted, isLoading: false}

    case Actions.EDIT_TODO_SUCCEEDED:
    let afterEdit = state.data.map(obj =>{ 
        var newObj = {};
        newObj = obj;
        if(obj.id == action.payload.id) {
          newObj.name = action.payload.name;
        }
        return newObj;
      });
      return {...state, data: afterEdit, isLoading: false}
    case Actions.EDIT_TODO_FAILED:
      return {...state, isLoading: false, error: action.payload}
  }
  return state
}

export default todosReducer;
