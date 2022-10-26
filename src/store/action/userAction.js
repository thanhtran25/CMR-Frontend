const userLogin = (payload) => {
    return {
        type: "USER_LOGIN",
        payload: payload
    }
}

export { userLogin }