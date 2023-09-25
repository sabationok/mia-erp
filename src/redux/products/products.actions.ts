import { createAction } from '@reduxjs/toolkit';

export const clearCurrentProductAction = createAction<undefined, 'products/clearCurrent'>('products/clearCurrent');
