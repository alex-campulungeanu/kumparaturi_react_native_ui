import { takeEvery, call, put } from 'redux-saga/effects'
import * as Api from '../configs/api';
import * as Actions from '../actions/actionsType';
import * as Utils from '../configs/utils';

function* getAllTodos() {
    try {
        // yield put({type: Actions.LOADING_ACTION})
        const response = yield call(Api.getAllTodos)
        if (response.status === 'ok') {
            yield put({type: Actions.GET_ALL_TODOS_SUCCEEDED, payload: response.payload})
        } else if (response.status === 'token_error') {
            Utils.deleteToken();
            yield put({type: Actions.GET_ALL_TODOS_FAILED_TOKEN, payload: response.payload})
        } else {
            yield put({type: Actions.GET_ALL_TODOS_FAILED, payload: response.payload})
        }
    } catch (error) {
        yield put({type: Actions.GET_ALL_TODOS_FAILED, payload: error})
    }
}

function* deleteTodo(action) {
    try {
        // yield put({type: Actions.LOADING_ACTION})
        const response  = yield call(Api.deleteItem, action.payload)
        if (response.status === 'ok') {
            yield put({type: Actions.DELETE_TODO_SUCCEEDED, payload: response.payload})
        } else if (response.status === 'token_error') {
            Utils.deleteToken();
            yield put({type: Actions.DELETE_TODO_FAILED, payload: response.payload})
        } else {
            yield put({type: Actions.DELETE_TODO_FAILED, payload: response.payload})
        }
    } catch (error) {
        yield put({type: Actions.DELETE_TODO_FAILED, payload: error})
    }    
}

function* deleteAllTodo(action) {
    try {
        // yield put({type: Actions.LOADING_ACTION})
        const response  = yield call(Api.deleteAllItem, action.payload)
        if (response.status === 'ok') {
            yield put({type: Actions.DELETE_ALL_TODO_SUCCEEDED, payload: response.payload})
        } else if (response.status === 'token_error') {
            Utils.deleteToken();
            yield put({type: Actions.DELETE_ALL_TODO_FAILED, payload: response.payload})
        } else {
            yield put({type: Actions.DELETE_ALL_TODO_FAILED, payload: response.payload})
        }
    } catch (error) {
        yield put({type: Actions.DELETE_ALL_TODO_FAILED, payload: error})
    }    
}

function* addTodo(action) {
    try {
        // yield put({type: Actions.LOADING_ACTION})
        const response = yield call(Api.addItem, action.payload)
        // console.log('addTodo response: ', response)
        if (response.status === 'ok') {
            yield put({type: Actions.ADD_TODO_SUCCEEDED, payload: response.payload})
        } else {
            yield put({type: Actions.ADD_TODO_FAILED, payload: response.payload})
        }
    } catch (error) {
        yield put({type: Actions.ADD_TODO_FAILED, payload: error.payload})
    }    
}

function* updateTodoStatus(action) {
    try {
        // yield put({type: Actions.LOADING_ACTION})
        const response = yield call(Api.updateItemStatus, action.payload.id, action.payload.status_id)
        if (response.status === 'ok') {
            yield put({type: Actions.UPDATE_TODO_SUCCEEDED, payload: response.payload})
        } else {
            yield put({type: Actions.UPDATE_TODO_FAILED, payload: response.payload})
        }
     } catch (error) {
        yield put({type: Actions.UPDATE_TODO_FAILED, payload: error})
     }    
}

function* editTodoName(action) {
    try {
        // yield put({type: Actions.LOADING_ACTION})
        const response = yield call(Api.editItemName, action.payload.id, action.payload.todo)
        if (response.status === 'ok') {
            yield put({type: Actions.EDIT_TODO_SUCCEEDED, payload: response.payload})
        } else {
            yield put({type: Actions.EDIT_TODO_FAILED, payload: response.payload})
        }
     } catch (error) {
        yield put({type: Actions.EDIT_TODO_FAILED, error})
     }    
}

export function* todosGet() {
    yield takeEvery(Actions.GET_ALL_TODOS_REQUESTED, getAllTodos)
}

export function* todosDelete() {
    yield takeEvery(Actions.DELETE_TODO_REQUESTED, deleteTodo)
}

export function* todosDeleteAllTodo() {
    yield takeEvery(Actions.DELETE_ALL_TODO_REQUESTED, deleteAllTodo)
}

export function* todosAdd() {
    yield takeEvery(Actions.ADD_TODO_REQUESTED, addTodo)
}

export function* todosUpdateStatus() {
    yield takeEvery(Actions.UPDATE_TODO_REQUESTED, updateTodoStatus)
}

export function* todosEditName() {
    yield takeEvery(Actions.EDIT_TODO_REQUESTED, editTodoName)
}
