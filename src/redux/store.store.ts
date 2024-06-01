import { persistStore } from 'redux-persist';
import { AnyAction, configureStore } from '@reduxjs/toolkit';
import rootReducer, { RootReducerType } from './rootReducer.store';
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

interface ActionPayloadBase {
  refresh?: boolean;
  update?: boolean;
  prepend?: boolean;
  upend?: boolean;
}
export type AppDispatch = typeof store.dispatch;
export type ActionPayload<D = any> = ActionPayloadBase & D;
export type Action<D = any> = AnyAction & { payload: ActionPayload<D> };

export interface ThunkArgs<Data = any, Return = any, Error = any | unknown, Meta = any, Params = any>
  extends ActionPayloadBase {
  data?: ActionPayload<Data>;
  params?: Params;
  onSuccess?: (data: Return, meta?: Meta) => void;
  onError?: (error: Error) => void;
  onLoading?: (loading: boolean) => void;
}

export const useAppDispatch: () => AppDispatch = useDispatch;
export type RootState = ReturnType<RootReducerType>;

export const useAppSelector = (): RootState => useSelector((state: RootState): RootState => state) as RootState;
export const persistor = persistStore(store);
