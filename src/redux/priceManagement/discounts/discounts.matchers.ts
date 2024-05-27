import { Action } from '../../store.store';
import { PriceEntity } from '../../../types/price-management/price-management.types';
import * as thunks from './discounts.thunks';
import { AnyAction } from '@reduxjs/toolkit';

export function onCreateDiscountMather(a: Action<{ data: PriceEntity }>) {
  return a.type === thunks.createDiscountThunk.fulfilled;
}
export function onUpdateDiscountMatcher(a: Action<{ data: PriceEntity }>) {
  return a.type === thunks.updateDiscountThunk.fulfilled;
}
export function onGetDiscountsMatcher(a: AnyAction) {
  return a.type === thunks.getAllDiscountsThunk.fulfilled;
}
export function onGetOneDiscountCase(a: AnyAction) {
  return a.type === thunks.getDiscountThunk.fulfilled;
}
