import * as Actions from './actionsType'

export function getAllTodos() {
  return {
    type: Actions.GET_ALL_TODOS_REQUESTED,
  }
}

export function deleteTodo(id) {
  return {
    type: Actions.DELETE_TODO_REQUESTED,
    payload: id
  }
}

export function addTodo(todo) {
  return {
    type: Actions.ADD_TODO_REQUESTED,
    payload: todo
  }
}

export function updateTodoStatus(id, status_id) {
  return {
    type: Actions.UPDATE_TODO_REQUESTED,
    payload: {
      id,
      status_id
    }
  }
}

export function editTodoName(id, todo) {
  return {
    type: Actions.EDIT_TODO_REQUESTED,
    payload: {
      id,
      todo
    }
  }
}

export function deleteAllTodo(status_id, shopping_list_id) {
  return {
    type: Actions.DELETE_ALL_TODO_REQUESTED,
    payload: {
      status_id: status_id,
      shopping_list_id: shopping_list_id,
    }
  }
}

export function selectTodo(id) {
  console.log('selectTodo todoActsions id', id)
  return {
    type: Actions.SELECT_TODO_REQUESTED,
    payload: {
      id: id,
    }
  }
}