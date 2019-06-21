import {
    all,
    put,
    takeEvery,
    takeLatest
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

export default function* TodoSaga() {
    yield all([
        watchListAll(),
        watchCreate(),
        watchRemove()
    ]);
}