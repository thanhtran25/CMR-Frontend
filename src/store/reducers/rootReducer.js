import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import cartReducer from "./cartReducer";
import adminReducer from "./adminReducer";

const mainReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    cart: cartReducer,
    admin: adminReducer,
})

export default mainReducer