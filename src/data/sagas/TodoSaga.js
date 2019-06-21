import {
    all,
    put,
    takeEvery,
    takeLatest,
    select
} from "redux-saga/effects";

import {
    TodoService
} from "../services/TodoService";
import * as TodoActions from "../actions/TodoActions";

// Worker's
function* listAll() {
    const todoList = yield TodoService.list();
    yield put(TodoActions.listResponse(todoList));
}

function* create({
    data
}) {
    const {
        description
    } = data;
    const newItem = yield TodoService.create({
        description,
        isChecked: false
    });
    yield put(TodoActions.createResponse(newItem));
}

function* remove({
    data
}) {
    const {
        itemId
    } = data;
    yield TodoService.remove(itemId);
}

function* clear() {
    const state = yield select(),
        todoList = state.TodoReducer;

    const newTodoList = todoList.filter(item => !item.isChecked),
        toRemove = todoList.filter(item => item.isChecked);

    toRemove.forEach(item => TodoService.remove(item.id));
    yield put(TodoActions.listResponse(newTodoList));
}


// Watcher's
function* watchListAll() {
    yield takeLatest(TodoActions.TODO_LIST, listAll);
}

function* watchCreate() {
    yield takeEvery(TodoActions.TODO_CREATE, create);
}

function* watchRemove() {
    yield takeEvery(TodoActions.TODO_REMOVE, remove);
}

function* watchClear() {
    yield takeLatest(TodoActions.TODO_CLEAR, clear);
}

export default function* TodoSaga() {
    yield all([
        watchListAll(),
        watchCreate(),
        watchRemove(),
        watchClear()
    ]);
}