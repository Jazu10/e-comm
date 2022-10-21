import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
    productReducer,
    productDetailsReducer,
    newReviewReducer,
    newProductReducer,
    singleProductReducer,
} from "./reducers/productReducer";

import {
    authReducer,
    userReducer,
    forgotPasswordReducer,
    allUsersReducer,
    userDetailsReducer,
} from "./reducers/userReducer";

import { cartReducer } from "./reducers/cartReducer";
import {
    newOrderReducer,
    myOrdersReducer,
    orderDetailsReducer,
    allOrdersReducer,
    orderReducer,
} from "./reducers/orderReducer";

const reducers = combineReducers({
    products: productReducer,
    productDetails: productDetailsReducer,
    auth: authReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    cart: cartReducer,
    newOrder: newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product: singleProductReducer,
    allOrders: allOrdersReducer,
    order: orderReducer,
    allUsers: allUsersReducer,
    userDetails: userDetailsReducer,
});

const initialState = {
    cart: {
        cartItems: localStorage.getItem("cartItems")
            ? JSON.parse(localStorage.getItem("cartItems"))
            : [],
        shippingInfo: localStorage.getItem("shippingInfo")
            ? JSON.parse(localStorage.getItem("shippingInfo"))
            : {},
        priceInfo: {},
    },
};
const middlewares = [thunk];

const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(...middlewares)),
);

export default store;
