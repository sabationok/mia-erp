import OffersApi from '../../api/offers.api';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

export * from './variations/variations.thunks';

enum OffersThunkType {
  getAll = 'offers/getAll/thunk',
  getFullInfo = 'offers/getOne/fullInfo/thunk',
  getOne = 'offers/getOne/thunk',
  create = 'offers/create/thunk',
  update = 'offers/update/thunk',
  delete = 'offers/delete/thunk',
}

export const getAllOffersThunk = createAppAsyncThunk(OffersThunkType.getAll, OffersApi.getAll);
export const getOfferThunk = createAppAsyncThunk(OffersThunkType.getOne, OffersApi.getOne);
export const getOfferFullInfoThunk = createAppAsyncThunk(OffersThunkType.getFullInfo, OffersApi.getFullInfoById);
export const createOfferThunk = createAppAsyncThunk(OffersThunkType.create, OffersApi.create);
export const updateOfferThunk = createAppAsyncThunk(OffersThunkType.update, OffersApi.updateById);
