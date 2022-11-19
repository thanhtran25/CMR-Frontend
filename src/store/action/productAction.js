const choseCategories = (payload) => {
    return {
        type: "CHOSE_CATEGORIES",
        payload: payload
    }
}
const changeCart = (payload) => {
    return {
        type: "CHANGE_CART",
        payload: payload
    }
}
export {
    choseCategories,
    changeCart
}