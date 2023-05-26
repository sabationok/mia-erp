import { useTransactionsSelector } from 'redux/selectors.store';
import { useAppDispatch } from 'redux/store.store';
import { ITransaction, ITransactionForReq, ITransactionReqData } from './transactions.types';
import { ITransactionsState } from './transactions.slice';

export interface TransactionsService {
  dispatch: ReturnType<typeof useAppDispatch>;
  state: ITransactionsState;
  create: (data: ITransactionForReq) => void;
  deleteById: (id: string) => void;
  editById: (reqData: ITransactionReqData) => void;
  getById: (id: string) => ITransaction | undefined;
}

const useTransactionsService = (): TransactionsService => {
  const dispatch = useAppDispatch();
  const state = useTransactionsSelector();

  function getById(id: string) {
    return state.transactions.find(el => el._id === id);
  }

  function create(data: ITransactionForReq) {
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
    state,
    create,
    deleteById,
    editById,
    getById,
  };
};

export type useTrServiceHookType = typeof useTransactionsService;
export default useTransactionsService as useTrServiceHookType;
