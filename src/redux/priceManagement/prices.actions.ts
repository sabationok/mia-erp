import { AnyAction } from '@reduxjs/toolkit';
import * as thunks from './priceManagement.thunks';
import { isString } from 'lodash';
import { Action } from '../store.store';
import { OfferPriceEntity } from '../../types/price-management/price-management.types';

export function isPriceManagementCase(type: string) {
  return isString(type) && type.startsWith('priceLists');
}
export function onCreatePriceCase(a: Action<{ data: OfferPriceEntity }>) {
  return isPriceManagementCase(a.type) && a.type.startsWith(thunks.createPriceThunk.fulfilled);
}
export function onUpdatePriceCase(a: Action<{ data: OfferPriceEntity }>) {
  return isPriceManagementCase(a.type) && a.type.endsWith(thunks.updatePriceThunk.fulfilled);
}
export function onGetPricesCase(a: AnyAction) {
  return isPriceManagementCase(a.type) && a.type.endsWith(thunks.getAllPricesThunk.fulfilled);
}
