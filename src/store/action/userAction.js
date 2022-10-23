const userLogin = (payload) => {
    return {
        type: "USER_LOGIN",
        patload: payload
    }
}

export { userLogin }