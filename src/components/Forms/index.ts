import { lazy } from 'react';
import * as FormPropTypes from './form.types';

const CreateOrder = lazy(() => import('./FormCreateOrder/FormCreateOrder'));
const CreatePrice = lazy(() => import('./FormCreatePrice/FormCreatePrice'));
const CreateOrderSlot = lazy(() => import('./FormCreateOrder/FormAddOrderSlot'));
const CreateVariationsTemplate = lazy(() => import('./FormCreateVariationsTemplate/FormCreateVariationsTemplate'));

const CreateDirTreeComp = lazy(() => import('./FormCreateDirTreeComp'));
const CreateActivity = lazy(() => import('./FormCreateActivity'));
const CreateContractor = lazy(() => import('./FormCreateContractor'));
const CreateCategory = lazy(() => import('./FormCreateCategory'));
const CreatePriceList = lazy(() => import('./FormCreatePriceList'));
const CreateCustomRole = lazy(() => import('./FormCreateCustomRole'));
const CreateCount = lazy(() => import('./FormCreateCount'));
const CreateCompany = lazy(() => import('./FormCreateCompany'));
const CreateTag = lazy(() => import('./FormCreateTag'));
const CreateMethod = lazy(() => import('./FormCreateMetod'));
const InviteUser = lazy(() => import('./FormInviteUser'));
const CreateProductInventory = lazy(() => import('./FormCreateProductInventory'));
const CreateProperty = lazy(() => import('./FormCreateProperty'));
const CreateVariation = lazy(() => import('./FormCreateVariation'));
const CreateTransaction = lazy(() => import('./FormCreateTransaction'));
const CreateWarehouse = lazy(() => import('./FormCreateWarehouse'));
const CreateProduct = lazy(() => import('./FormCreateProduct'));

export const Forms = {
  CreateDirTreeComp,
  CreateActivity,
  CreateContractor,
  CreateTransaction,
  CreateCategory,
  CreatePriceList,
  CreatePrice,
  CreateCustomRole,
  CreateCount,
  CreateCompany,
  CreateOrder,
  CreateTag,
  CreateMethod,
  InviteUser,
  CreateOrderSlot,
  CreateProductInventory,
  CreateVariationsTemplate,
  CreateProperty,
  CreateVariation,
  CreateWarehouse,
  CreateProduct,
};

export { FormPropTypes };

export default Forms;
