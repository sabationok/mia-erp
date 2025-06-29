import { isAnyOf } from '@reduxjs/toolkit';
import * as thunks from './prices.thunks';

export const onCreatePriceMather = isAnyOf(thunks.createPriceThunk.fulfilled);
export const onUpdatePriceMatcher = isAnyOf(thunks.updatePriceThunk.fulfilled);
export const onGetPricesCase = isAnyOf(thunks.getAllPricesThunk.fulfilled);
export const onGetOnePriceCase = isAnyOf(thunks.getPriceThunk.fulfilled);
