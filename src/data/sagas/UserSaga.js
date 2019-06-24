import {
    all,
    take
} from "redux-saga/effects";

import {
    UserService
} from "../services/UserService";
import * as UserActions from "../actions/UserActions";

// Worker's
function* login({
    data
}) {
    const accountList = yield UserService.list(),
        userIndex = accountList.findIndex(account => (account.user === data.user && account.password === data.password)),
        user = (userIndex >= 0) ? accountList[userIndex] : null;
    if (user) {
        localStorage.setItem("user", JSON.stringify(user));
    }
    console.log("login");
    yield user;
}

function* logout() {
    console.log("logou");
    yield localStorage.clear("user");
}

// Watcher's
function* watchLogin() {
    while (true) {
        while (JSON.parse(localStorage.getItem("user")) == null) {
            const data = yield take(UserActions.USER_LOGIN);
            yield login(data);
        }
        while (JSON.parse(localStorage.getItem("user")) != null) {
            yield take(UserActions.USER_LOGOUT);
            yield logout();
        }
    }
}

export default function* UserSaga() {
    yield all([
        watchLogin()
    ])
}