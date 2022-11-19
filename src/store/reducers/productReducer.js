
const initState = {
    categoryId: '',
    cart: ''
}
const productReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHOSE_CATEGORIES":
            return {
                ...state,
                categoryId: action.payload
            }
        case "CHANGE_CART":
            return {
                ...state,
                cart: action.payload
            }
        default:
            return state
    }
}

export default productReducer