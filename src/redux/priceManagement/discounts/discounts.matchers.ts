import * as thunks from './discounts.thunks';
import { isAnyOf } from '@reduxjs/toolkit';

export const onCreateDiscountMather = isAnyOf(thunks.createDiscountThunk.fulfilled);
export const onUpdateDiscountMatcher = isAnyOf(thunks.updateDiscountThunk.fulfilled);
export const onGetDiscountsMatcher = isAnyOf(thunks.getAllDiscountsThunk.fulfilled);
export const onGetOneDiscountCase = isAnyOf(thunks.getDiscountThunk.fulfilled);
export const onRemoveDiscountCase = isAnyOf(thunks.removeDiscountThunk.fulfilled);
