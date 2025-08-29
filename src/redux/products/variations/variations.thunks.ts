import VariationsApi from '../../../api/offers/variations.api';
import { createAppAsyncThunk } from '../../createAppAsynkThunk';

export enum VariationsThunkType {
  getAllByOfferId = 'offers/variations/getAllByOfferIdThunk',
  getAll = 'offers/variations/GetAllThunk',
  update = 'offers/variations/updateThunk',
  create = 'offers/variations/createThunk',
  restore = 'offers/variations/restoreThunk',
  deleteSoft = 'offers/variations/deleteSoftThunk',
}
export const createVariationThunk = createAppAsyncThunk(VariationsThunkType.create, VariationsApi.create);
export const updateVariationThunk = createAppAsyncThunk(VariationsThunkType.update, VariationsApi.updateById);
export const deleteVariationThunk = createAppAsyncThunk(VariationsThunkType.deleteSoft, VariationsApi.deleteById);
export const getAllVariationsThunk = createAppAsyncThunk(VariationsThunkType.getAll, VariationsApi.getAll);

export const getAllVariationsByOfferIdThunk = createAppAsyncThunk(
  VariationsThunkType.getAllByOfferId,
  VariationsApi.getAllByOfferId
);
