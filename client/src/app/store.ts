import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/api/authSlice';
import { userSlice } from '../features/users/api/userSlice';
import { seller_reqSlice } from '../features/seller_req/api/seller_reqSlice';

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
    [seller_reqSlice.reducerPath]: seller_reqSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
      authSlice.middleware,
      userSlice.middleware,
      seller_reqSlice.middleware
    ),
});
