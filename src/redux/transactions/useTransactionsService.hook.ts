import { useTransactionsSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';
import useTrFilterSelectors from './useTrFilterSelectors.hook';
import { ITransactionReqData } from './transactions.types';

const useTransactionsService = () => {
  const dispatch = useAppDispatch();
  const state = useTransactionsSelector();

  function getById(id: string) {
    return state.transactions.find(el => el._id === id);
  }

  function create(data: ITransactionReqData) {
    console.log('create tr', data);
  }

  function deleteById(id: string) {
    console.log('deleteTrById', id);
  }

  function editById({ _id, data }: ITransactionReqData) {
    console.log('editTrById', { _id, data });
  }


  return {
    dispatch,
    ...state,
    create,
    deleteById,
    editById,
    getById,
    useFilterSelectors: useTrFilterSelectors,
  };
};
export type TransactionsService = typeof useTransactionsService;
export default useTransactionsService as TransactionsService;
