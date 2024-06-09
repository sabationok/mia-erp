import { createAction } from '@reduxjs/toolkit';
import { VariationEntity } from '../../types/offers/variations.types';
import { PriceEntity } from '../../types/price-management/price-management.types';
import { WarehouseItemEntity } from '../../types/warehousing/warehouses.types';

export const clearCurrentOfferAction = createAction<undefined, 'products/clearCurrent'>('products/clearCurrent');
export const setOfferPricesAction = createAction<
  { refresh?: boolean; data: PriceEntity[] },
  'products/setCurrentProductPrices'
>('products/setCurrentProductPrices');
export const setCurrentProductVariationsAction = createAction<
  { refresh?: boolean; data: VariationEntity[] },
  'products/setCurrentProductVariations'
>('products/setCurrentProductVariations');
export const setCurrentProductInventoriesAction = createAction<
  { refresh?: boolean; data: WarehouseItemEntity[] },
  'products/setCurrentProductInventories'
>('products/setCurrentProductInventories');
