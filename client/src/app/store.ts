import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "../features/auth/api/authSlice";
import { userSlice } from "../features/users/api/userSlice";
import { seller_reqSlice } from "../features/seller_req/api/seller_reqSlice";
import { categorySlice } from "../features/category/api/categorySlice";
import { productSlice } from "../features/product/api/productSlice";
import cartReducer from "../features/cart/cartSlice";
import { paymentSlice } from "../features/payment/api/paymentSlice";
import { addressSlice } from "../features/address/api/addressSlice";
import { orderSlice } from "../features/order/api/orderSlice";

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [seller_reqSlice.reducerPath]: seller_reqSlice.reducer,
    [categorySlice.reducerPath]: categorySlice.reducer,
    [productSlice.reducerPath]: productSlice.reducer,
    [paymentSlice.reducerPath]: paymentSlice.reducer,
    [addressSlice.reducerPath]: addressSlice.reducer,
    [orderSlice.reducerPath]: orderSlice.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
      userSlice.middleware,
      seller_reqSlice.middleware,
      categorySlice.middleware,
      productSlice.middleware,
      paymentSlice.middleware,
      orderSlice.middleware,
      addressSlice.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
