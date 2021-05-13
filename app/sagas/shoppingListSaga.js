import { takeEvery, call, put } from 'redux-saga/effects'
import * as Api from '../configs/api';
import * as Actions from '../actions/actionsType';
import * as Utils from '../configs/utils';

function* getAllShoppingLists() {
    try {
        // yield put({type: Actions.LOADING_ACTION})
        const response = yield call(Api.getAllShoppingLists)
        // console.log('ENTER SAGA getAllShoppingLIsts: ', response)
        if (response.status === 'ok') {
            // console.log('status shopping list is OK')
            yield put({type: Actions.GET_ALL_SHOPPING_LISTS_SUCCEEDED, payload: response.payload})
        } else {
            yield put({type: Actions.GET_ALL_SHOPPING_LISTS_FAILED, payload: response.payload})
        }
    } catch (error) {
        yield put({type: Actions.GET_ALL_SHOPPING_LISTS_FAILED, payload: error})
    }
}

function* addShoppingList(action) {
    // console.log('enter saga addShoppingList')
    try {
        // yield put({type: Actions.LOADING_ACTION})
        const response = yield call(Api.addShoppingList, action.payload.name, action.payload.description, action.payload.image)
        // console.log('ENTER SAGA addShoppingList: ', response)
        if (response.status === 'ok') {
            // console.log('status shopping list is OK')
            yield put({type: Actions.ADD_SHOPPING_LIST_SUCCEEDED, payload: response.payload})
        } else {
            yield put({type: Actions.ADD_SHOPPING_LIST_FAILED, payload: response.payload})
        }
    } catch (error) {
        yield put({type: Actions.ADD_SHOPPING_LIST_FAILED, payload: error})
    }
}

function* deleteShoppingList(action) {
    // console.log('enter saga deleteShoppingList')
    try {
        // yield put({type: Actions.LOADING_ACTION})
        const response = yield call(Api.deleteShoppingList, action.payload.id)
        // console.log('ENTER SAGA addShoppingList: ', response)
        if (response.status === 'ok') {
            console.log('status shopping list is OK')
            yield put({type: Actions.DELETE_SHOPPING_LIST_SUCCEEDED, payload: action.payload.id})
        } else {
            yield put({type: Actions.DELETE_SHOPPING_LIST_FAILED, payload: response.payload})
        }
    } catch (error) {
        yield put({type: Actions.DELETE_SHOPPING_LIST_FAILED, payload: error})
    }
}

export function* getShoppingListWatch() {
  yield takeEvery(Actions.GET_ALL_SHOPPING_LISTS_REQUESTED, getAllShoppingLists)
}

export function* addShoppingListWatch() {
    yield takeEvery(Actions.ADD_SHOPPING_LIST_REQUESTED, addShoppingList)
}

export function* deleteShoppingListWatch() {
    yield takeEvery(Actions.DELETE_SHOPPING_LIST_REQUESTED, deleteShoppingList)
}