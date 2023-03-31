import { useTransactionsSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';
import useTrFilterSelectors from './useTrFilterSelectors.hook';

const useTransactionsServise = () => {
  const dispatch = useAppDispatch();
  const state = useTransactionsSelector();

  return { dispatch, ...state, useFilterSelectors: useTrFilterSelectors };
};
export type TransactionsService = typeof useTransactionsServise;
export default useTransactionsServise as TransactionsService;
