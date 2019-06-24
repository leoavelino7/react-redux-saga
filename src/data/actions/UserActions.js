export const USER_LOGIN = "USER_LOGIN",
    USER_LOGOUT = "USER_LOGOUT",
    USER_AUTHENTICATED = "USER_AUTHENTICATED";

export const login = (user, password) => {
    return {
        type: USER_LOGIN,
        data: {
            user,
            password
        }
    }
}

// export const authenticated = () => {
//     return {
//         type: USER_AUTHENTICATED,
//         data: {
//             token:
//         }
//     }
// }

export const logout = () => {
    return {
        type: USER_LOGOUT
    }
}