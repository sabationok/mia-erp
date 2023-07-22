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

export interface ThunkPayload<SD = any, RD = any, E = any | unknown, MD = any> {
  data?: SD;
  onSuccess?: (data: RD, meta?: MD) => void;
  onError?: (error: E) => void;
  onLoading?: (loading: boolean) => void;
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export const useAppSelector = (): RootState => useSelector((state: RootState): RootState => state) as RootState;

export const persistor = persistStore(store);
