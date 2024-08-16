import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../features/auth/api/authSlice';
import { userSlice } from '../features/users/api/userSlice';

export const store = configureStore({
  reducer: {
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(authSlice.middleware, userSlice.middleware),
});
