import { WarehousesApi } from '../../api';
import OffersApi from '../../api/offers.api';
import { buildGetAllPricesThunk } from '../priceManagement/priceManagement.thunks';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

enum ProductsThunkType {
  getAllProductsThunk = 'products/getAllProductsThunk',
  getProductFullInfoThunk = 'products/getProductFullInfoThunk',
  getOne = 'products/getOneThunk',
  createProductThunk = 'products/createProductThunk',
  updateProductThunk = 'products/updateProductThunk',
  deleteProductThunk = 'products/deleteProductThunk',

  getAllVariations = 'products/getAllVariations',

  getAllPrices = 'products/getAllPrices',

  getAllInventories = 'products/getAllInventories',

  updateDefaults = 'products/updateDefaultsByIdThunk',
}

export const getAllOffersThunk = createAppAsyncThunk(ProductsThunkType.getAllProductsThunk, OffersApi.getAll);
export const getOfferThunk = createAppAsyncThunk(ProductsThunkType.getOne, OffersApi.getOne);
export const getOfferFullInfoThunk = createAppAsyncThunk(
  ProductsThunkType.getProductFullInfoThunk,
  OffersApi.getFullInfoById
);

export const createOfferThunk = createAppAsyncThunk(ProductsThunkType.createProductThunk, OffersApi.create);
export const updateProductThunk = createAppAsyncThunk(ProductsThunkType.updateProductThunk, OffersApi.updateById);

export const updateOfferDefaultsThunk = createAppAsyncThunk(
  ProductsThunkType.updateDefaults,
  OffersApi.updateDefaultsById
);

export const getAllOfferPricesThunk = buildGetAllPricesThunk(ProductsThunkType.getAllPrices);
export const getAllInventoriesByProductIdThunk = createAppAsyncThunk(
  ProductsThunkType.getAllInventories,
  WarehousesApi.getAllInventories
);
