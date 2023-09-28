import { createAction } from '@reduxjs/toolkit';
import { IProduct } from './products.types';
import { IVariation } from './variations.types';
import { IPriceListItem } from '../priceManagement/priceManagement.types';
import { IProductInventory } from '../warehouses/warehouses.types';

export const clearCurrentProductAction = createAction<undefined, 'products/clearCurrent'>('products/clearCurrent');
export const updateCurrentProductAction = createAction<IProduct, 'products/updateCurrent'>('products/updateCurrent');
export const updateCurrentProductPricesAction = createAction<IPriceListItem, 'products/updateCurrentProductPrices'>(
  'products/updateCurrentProductPrices'
);
export const updateCurrentProductVariationsAction = createAction<IVariation, 'products/updateCurrentProductVariations'>(
  'products/updateCurrentProductVariations'
);
export const updateCurrentProductInventoriesAction = createAction<
  IProductInventory,
  'products/updateCurrentProductInventories'
>('products/updateCurrentProductInventories');
