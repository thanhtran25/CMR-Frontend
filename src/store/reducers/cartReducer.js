
const initState = {
    cart: JSON.parse(sessionStorage.getItem('cart')),
    amount: 0,
    check: [],
    total: ''
}
const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_CART":
            return {
                ...state,
                cart: action.payload,
                amount: sessionStorage.getItem('amount')
            }
        case "CHECK_CART":
            return {
                ...state,
                check: action.payload,
            }
        case "USER_PAYMENT":
            return {
                ...state,
                total: action.payload,
            }
        default:
            return state
    }
}

export default cartReducer