
const initState = {
    cart: JSON.parse(sessionStorage.getItem('cart')),
    amount: 0
}
const cartReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHANGE_CART":
            return {
                ...state,
                cart: action.payload,
                amount: sessionStorage.getItem('amount')
            }
        default:
            return state
    }
}

export default cartReducer