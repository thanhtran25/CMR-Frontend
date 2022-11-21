
const initState = {
    categoryId: '',
}
const productReducer = (state = initState, action) => {
    switch (action.type) {
        case "CHOSE_CATEGORIES":
            return {
                ...state,
                categoryId: action.payload
            }
        default:
            return state
    }
}

export default productReducer