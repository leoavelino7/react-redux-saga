import { all } from "redux-saga/effects";

export function* hello() {
    yield console.log("HELLO");
}

export default function* TodoSaga() {
    yield all([
        hello()
    ]);
}