import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";

const mainReducer = combineReducers({
    user: userReducer,
    product: productReducer
})

export default mainReducer