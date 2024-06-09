import VariationsApi from '../../../api/variations.api';
import { createAppAsyncThunk } from '../../createAppAsynkThunk';

export enum VariationsThunkType {
  getAllByOfferId = 'products/variations/getAllByOfferIdThunk',
  getAll = 'products/variations/GetAllThunk',
  update = 'products/variations/updateThunk',
  create = 'products/variations/createThunk',
  restore = 'products/variations/restoreThunk',
  deleteSoft = 'products/variations/deleteSoftThunk',
}
export const createVariationThunk = createAppAsyncThunk(VariationsThunkType.create, VariationsApi.create);
export const updateVariationThunk = createAppAsyncThunk(VariationsThunkType.update, VariationsApi.updateById);
export const deleteVariationThunk = createAppAsyncThunk(VariationsThunkType.deleteSoft, VariationsApi.deleteById);
export const getAllVariationsThunk = createAppAsyncThunk(VariationsThunkType.getAll, VariationsApi.getAll);

export const getAllVariationsByOfferIdThunk = createAppAsyncThunk(
  VariationsThunkType.getAllByOfferId,
  VariationsApi.getAllByOfferId
);
