import * as Actions from '../actions/actionsType'

export function getAllShoppingListsAction() {
  return {
    type: Actions.GET_ALL_SHOPPING_LISTS_REQUESTED
  }
}

export function addShoppingListAction(name, description, image) {
  // console.log('enter addShoppingListAction: ', name, description, image)
  return {
    type: Actions.ADD_SHOPPING_LIST_REQUESTED,
    payload: {
      name: name,
      description: description,
      image: image
    }
  }
}

export function deleteShoppingListAction(id) {
  // console.log('enter deleteShoppingListAction: ', id)
  return {
    type: Actions.DELETE_SHOPPING_LIST_REQUESTED,
    payload: {
      id: id
    }
  }
}