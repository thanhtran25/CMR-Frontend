import cookies from 'react-cookies'
const initState = {
    user: cookies.load('user')
}
const userReducer = (state = initState, action) => {
    console.log(state)
    switch (action.type) {
        case "USER_LOGIN":
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default userReducer