import { createAction } from '@reduxjs/toolkit';
import { IVariation } from '../../types/variations.types';
import { IPriceListItem } from '../../types/priceManagement.types';
import { IProductInventory } from '../../types/warehouses.types';

export const clearCurrentProductAction = createAction<undefined, 'products/clearCurrent'>('products/clearCurrent');
export const setCurrentProductPricesAction = createAction<
  { refresh?: boolean; data: IPriceListItem[] },
  'products/setCurrentProductPrices'
>('products/setCurrentProductPrices');
export const setCurrentProductVariationsAction = createAction<
  { refresh?: boolean; data: IVariation[] },
  'products/setCurrentProductVariations'
>('products/setCurrentProductVariations');
export const setCurrentProductInventoriesAction = createAction<
  { refresh?: boolean; data: IProductInventory[] },
  'products/setCurrentProductInventories'
>('products/setCurrentProductInventories');
