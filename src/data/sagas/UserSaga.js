import {
    all,
    take
} from "redux-saga/effects";

import {
    UserService
} from "../services/UserService";
import * as UserActions from "../actions/UserActions";

// Worker's
function* saveSession(account) {
    const {user} = account;

    yield localStorage.setItem("account", JSON.stringify({
        user, 
        token: Date.now()
    }));
}

function* login({
    data
}) {
    const accountList = yield UserService.list(),
        userIndex = accountList.findIndex(account => (account.user === data.user && account.password === data.password)),
        account = (userIndex >= 0) ? accountList[userIndex] : null;
    if (account) {
        yield saveSession(account);
    }
    console.log("login");
}

function* logout() {
    console.log("logout");
    yield localStorage.clear("account");
}

// Watcher's
function* watchLogin() {
    while (true) {
        while (localStorage.getItem("account") == null) {
            const data = yield take(UserActions.USER_LOGIN);
            yield login(data);
        }
        while (localStorage.getItem("account") != null) {
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