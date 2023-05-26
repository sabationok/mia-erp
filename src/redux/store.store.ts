import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.store';
import { useDispatch, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      // },
      serializableCheck: false,
    }),
  devTools: process.env.NODE_ENV === 'development',
});

export type AppDispatch = typeof store.dispatch;

export interface ThunkPayload<T = any, D = any, E = any> {
  data?: T;
  submitData?: T;
  onSuccess?: (data: D) => void;
  onError?: (error: E | unknown) => void;
  onLoading?: (loading: boolean) => void;
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = () => useSelector((state: RootState) => state) as RootState;

export const persistor = persistStore(store);
