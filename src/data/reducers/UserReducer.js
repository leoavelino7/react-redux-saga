import * as UserActions from "../actions/UserActions";

const UserReducer = (access = false, action) => {

    switch (action.type) {
        case UserActions.USER_LOGIN:
            const { user } = action.data;
            return {
                user,
                token: Date.now()
            };

        case UserActions.USER_LOGOUT:
            return false;
            
        default:
            return access;
    }
}

export default UserReducer;