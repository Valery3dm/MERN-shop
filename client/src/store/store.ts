import {
  combineReducers,
  configureStore,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { api } from './services/api';
import cartSliceReducer from './slices/cartSlice';
import authSliceReducer from './slices/authSlice';

const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  cart: cartSliceReducer,
  auth: authSliceReducer,
});

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
    devTools: true,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
