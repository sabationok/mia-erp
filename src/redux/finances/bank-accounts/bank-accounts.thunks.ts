import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkPayload } from '../../store.store';
import { AppQueryParams } from '../../../api';
import TransactionsApi from '../../../api/transactions.api';
import { axiosErrorCheck } from '../../../utils';
import { BankAccountReqData, IBankAccount } from '../../../types/finances/bank-accounts.types';

enum BankAccountsThunkType {
  create = 'finances/createBankAccountThunk',
  update = 'finances/updateBankAccountThunk',
  getList = 'finances/getBankAccountsListThunk',
}

export const createBankAccountThunk = createAsyncThunk<IBankAccount, ThunkPayload<BankAccountReqData, IBankAccount>>(
  BankAccountsThunkType.create,
  async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
    onLoading && onLoading(true);

    try {
      const res = await TransactionsApi.createBankAccount(data);

      onSuccess && onSuccess(res.data.data, res.data.meta);

      return res.data.data;
    } catch (error) {
      onError && onError(error);

      return thunkAPI.rejectWithValue(axiosErrorCheck(error));
    } finally {
      onLoading && onLoading(false);
    }
  }
);

export const updateBankAccountThunk = createAsyncThunk<
  IBankAccount,
  ThunkPayload<Omit<BankAccountReqData, 'params'>, IBankAccount>
>(BankAccountsThunkType.create, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const res = await TransactionsApi.updateBankAccount(data);

    onSuccess && onSuccess(res.data.data, res.data.meta);

    return res.data.data;
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  } finally {
    onLoading && onLoading(false);
  }
});

export const getBankAccountsListThunk = createAsyncThunk<
  { update?: boolean; data?: IBankAccount[] },
  ThunkPayload<
    {
      update?: boolean;
      query?: AppQueryParams;
    },
    IBankAccount[]
  >
>(BankAccountsThunkType.getList, async ({ data, onSuccess, onError, onLoading }, thunkAPI) => {
  onLoading && onLoading(true);

  try {
    const res = await TransactionsApi.getBankAccountsList({ params: data?.query });

    onSuccess && onSuccess(res.data.data, res.data.meta);

    return { ...res.data, ...data };
  } catch (error) {
    onError && onError(error);

    return thunkAPI.rejectWithValue(axiosErrorCheck(error));
  } finally {
    onLoading && onLoading(false);
  }
});
