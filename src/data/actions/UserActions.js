export const USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    USER_LOGGED = "USER_LOGGED";

export const login = (user, password) => {
    return {
        type: USER_LOGIN,
        data: {
            user,
            password
        }
    }
}

export const logout = () => {
    return {
        type: USER_LOGOUT
    }
}