import { createAction } from '@reduxjs/toolkit';
import { VariationEntity } from '../../types/offers/variations.types';
import { OfferPriceEntity } from '../../types/price-management/priceManagement.types';
import { WarehouseItemEntity } from '../../types/warehouses.types';

export const clearCurrentProductAction = createAction<undefined, 'products/clearCurrent'>('products/clearCurrent');
export const setCurrentProductPricesAction = createAction<
  { refresh?: boolean; data: OfferPriceEntity[] },
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
