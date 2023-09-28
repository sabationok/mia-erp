import { lazy } from 'react';
// * ORDERS
export const CreateOrder = lazy(() => import('./FormCreateOrder/FormCreateOrder'));
export const CreateOrderSlot = lazy(() => import('./FormCreateOrder/FormAddOrderSlot'));
// * TRANSACTIONS
export const CreateTransaction = lazy(() => import('./FormCreateTransaction'));
export const CreateCount = lazy(() => import('./FormCreateCount'));
// * OTHER DIRECTORIES
export const CreateDirTreeComp = lazy(() => import('./FormCreateDirTreeComp'));
export const CreateContractor = lazy(() => import('./FormCreateContractor'));
export const CreateCategory = lazy(() => import('./FormCreateCategory'));
export const CreateTag = lazy(() => import('./FormCreateTag'));
// * PRICING
export const CreatePrice = lazy(() => import('./FormCreatePrice/FormCreatePrice'));
export const CreatePriceList = lazy(() => import('./FormCreatePriceList'));
// * COMPANY
export const InviteUser = lazy(() => import('./FormInviteUser'));
export const CreateCustomRole = lazy(() => import('./FormCreateCustomRole'));
export const CreateCompany = lazy(() => import('./FormCreateCompany'));
export const CreateActivity = lazy(() => import('./FormCreateActivity'));
export const CreateMethod = lazy(() => import('./FormCreateMetod'));
// * WAREHOUSING
export const CreateWarehouse = lazy(() => import('./FormCreateWarehouse'));
export const CreateProductInventory = lazy(() => import('./FormCreateProductInventory'));
// * PRODUCTS
export const CreateProduct = lazy(() => import('./FormProduct/FormCreateProduct'));
export const CreateVariation = lazy(() => import('./FormCreateVariation'));
export const Variation = lazy(() => import('./FormProduct/FormCreateVariationOverlay'));
export const CreateProperty = lazy(() => import('./FormCreateProperty'));
export const SelectProperties = lazy(() => import('./FormProduct/FormSelectPropertiesOverlay'));
