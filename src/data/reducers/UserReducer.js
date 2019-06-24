import * as UserActions from "../actions/UserActions";

const UserReducer = (access = false, action) => {

    switch (action.type) {
        case UserActions.USER_LOGIN:
            return action.data;

        case UserActions.USER_LOGOUT:
            return access;

        default:
            return access;
    }
}

export default UserReducer;