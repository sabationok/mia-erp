import { AnyAction } from '@reduxjs/toolkit';
import * as thunks from './priceManagement.thunks';
import { Action } from '../store.store';
import { PriceEntity } from '../../types/price-management/price-management.types';

export function onCreatePriceMather(a: Action<{ data: PriceEntity }>) {
  return a.type === thunks.createPriceThunk.fulfilled;
}
export function onUpdatePriceMatcher(a: Action<{ data: PriceEntity }>) {
  return a.type === thunks.updatePriceThunk.fulfilled;
}
export function onGetPricesCase(a: AnyAction) {
  return a.type === thunks.updatePriceThunk.fulfilled;
}
export function onGetOnePriceCase(a: AnyAction) {
  return a.type === thunks.getPriceThunk.fulfilled;
}
