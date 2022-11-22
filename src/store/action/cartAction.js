
const changeCart = (payload) => {
    return {
        type: "CHANGE_CART",
        payload: payload
    }
}
const checkCart = (payload) => {
    return {
        type: "CHECK_CART",
        payload: payload
    }
}
const userPayment = (payload) => {
    return {
        type: "USER_PAYMENT",
        payload: payload
    }
}
export {
    changeCart,
    checkCart,
    userPayment
}