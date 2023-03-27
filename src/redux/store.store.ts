import { persistStore } from 'redux-persist';
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer.store';
import { useDispatch } from 'react-redux';

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

export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<typeof store.getState>;

export const persistor = persistStore(store);
