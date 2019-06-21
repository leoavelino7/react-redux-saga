import { all, put, takeEvery, takeLatest } from "redux-saga/effects";

import { TodoService } from "../services/TodoService";
import * as TodoActions from "../actions/TodoActions";

// Worker's
function* listAll() {
    const todoList = yield TodoService.list();
    yield put(TodoActions.listResponse(todoList));
}

// Watcher's
function* watchListAll() {
    yield takeLatest(TodoActions.TODO_LIST, listAll);
}

export default function* TodoSaga() {
    yield all([
        watchListAll()
    ]);
}