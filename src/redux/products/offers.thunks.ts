import { WarehousesApi } from '../../api';
import OffersApi from '../../api/offers.api';
import { buildGetAllPricesThunk } from '../priceManagement/priceManagement.thunks';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

export * from './variations/variations.thunks';

enum OffersThunkType {
  getAllThunk = 'products/getAllOffersThunk',
  getOfferFullInfoThunk = 'products/getOfferFullInfoThunk',
  getOne = 'products/getOneThunk',
  create = 'products/createOfferThunk',
  update = 'products/updateOfferThunk',
  delete = 'products/deleteOfferThunk',

  getAllVariations = 'products/getAllVariations',

  getAllPrices = 'products/getAllPrices',

  getAllInventories = 'products/getAllInventories',
}

export const getAllOffersThunk = createAppAsyncThunk(OffersThunkType.getAllThunk, OffersApi.getAll);
export const getOfferThunk = createAppAsyncThunk(OffersThunkType.getOne, OffersApi.getOne);
export const getOfferFullInfoThunk = createAppAsyncThunk(
  OffersThunkType.getOfferFullInfoThunk,
  OffersApi.getFullInfoById
);

export const createOfferThunk = createAppAsyncThunk(OffersThunkType.create, OffersApi.create);
export const updateOfferThunk = createAppAsyncThunk(OffersThunkType.update, OffersApi.updateById);

export const getAllOfferPricesThunk = buildGetAllPricesThunk(OffersThunkType.getAllPrices);
export const getAllInventoriesByProductIdThunk = createAppAsyncThunk(
  OffersThunkType.getAllInventories,
  WarehousesApi.getAllInventories
);
