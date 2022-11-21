import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";

const mainReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
})

export default mainReducer