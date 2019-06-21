import { all, put, takeEvery, takeLatest } from "redux-saga/effects";

import { TodoService } from "../services/TodoService";
import * as TodoActions from "../actions/TodoActions";

// Worker's
function* listAll() {
    const todoList = yield TodoService.list();
    yield put(TodoActions.listResponse(todoList));
}

function* create({data}) {
    const { description } = data;
    const newItem = yield TodoService.create({
        description,
        isChecked: false
    });
    yield put(TodoActions.createResponse(newItem));
}

// Watcher's
function* watchListAll() {
    yield takeLatest(TodoActions.TODO_LIST, listAll);
}

function* watchCreate(){
    yield takeEvery(TodoActions.TODO_CREATE, create);
}

export default function* TodoSaga() {
    yield all([
        watchListAll(),
        watchCreate()
    ]);
}