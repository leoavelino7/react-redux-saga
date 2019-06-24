import {
    all,
    put,
    takeEvery,
    takeLatest,
    select,
    take
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

function* update({
    data
}) {
    const {
        item
    } = data;
    yield TodoService.update(item);
}

function* clear() {
    const state = yield select(),
        todoList = state.TodoReducer;

    const newTodoList = todoList.filter(item => !item.isChecked),
        toRemove = todoList.filter(item => item.isChecked);

    toRemove.forEach(item => TodoService.remove(item.id));
    yield put(TodoActions.listResponse(newTodoList));
}

function* logger() {
    while (true) {
        const action = yield take('*')
        const state = yield select()
        console.log('action', action)
        console.log('state after', state)
    }
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

function* watchUpdate() {
    yield takeEvery(TodoActions.TODO_UPDATE, update);
}

function* watchClear() {
    yield takeLatest(TodoActions.TODO_CLEAR, clear);
}

function* watchLogger() {
    yield logger();
}

export default function* TodoSaga() {
    yield all([
        watchListAll(),
        watchCreate(),
        watchRemove(),
        watchUpdate(),
        watchClear()
        // watchLogger()
    ]);
}