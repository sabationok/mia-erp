import { lazy } from 'react';
// * ORDERS
export const CreateOrder = lazy(() => import('./FormCreateOrder/FormCreateOrder'));
export const CreateOrdersGroup = lazy(() => import('./FormCreateOrder/FormCreateOrdersGroup'));
export const SelectOrderType = lazy(() => import('./FormCreateOrder/components/SelectOrderTypeModal'));
export const CreateOrderSlot = lazy(() => import('./FormCreateOrder/components/FormCreateOrderSlot'));
// * TRANSACTIONS
export const CreateTransaction = lazy(() => import('./finances/FormCreateTransaction'));
export const CreateCount = lazy(() => import('./finances/FormCreateCount'));

export const CreateBankAccount = lazy(() => import('./finances/FormCreateBankAccount'));
// * OTHER DIRECTORIES
export const CreateDirTreeComp = lazy(() => import('./Directories/FormCreateDirTreeComp'));
export const CreateContractor = lazy(() => import('./Directories/FormCreateCounterparty'));
export const CreateOfferCategory = lazy(() => import('./Directories/FormCreateOfferCategory'));
export const CreateFinCategory = lazy(() => import('./Directories/FormCreateFinCategory'));
export const CreateTag = lazy(() => import('./Directories/FormCreateTag'));
// * PRICING
export const CreatePrice = lazy(() => import('./pricing/FormCreatePrice/FormCreatePrice'));
export const CreatePriceList = lazy(() => import('./pricing/FormCreatePriceList'));
// * COMPANY
export const InviteUser = lazy(() => import('./Auth/FormInviteUser'));
export const CreateCustomRole = lazy(() => import('./Company/FormCreateCustomRole'));
export const CreateCompany = lazy(() => import('./Company/FormCreateCompany'));
export const CreateActivity = lazy(() => import('./Directories/FormCreateActivity'));
// * METHODS
export const CreateMethod = lazy(() => import('./Directories/FormCreateMethod'));
export const DeliveryMethod = lazy(() => import('./methods/FormDeliveryMethod'));
export const InvoicingMethod = lazy(() => import('./methods/FormInvoicingMethod'));
// * WAREHOUSING
export const CreateWarehouseDocument = lazy(() => import('./warehousing/FormCreateWarehouseDocument'));
export const CreateWarehouse = lazy(() => import('./warehousing/FormCreateWarehouse'));
export const CreateProductInventory = lazy(() => import('./warehousing/FormCreateProductInventory'));
export const WarehousingSettings = lazy(() => import('./warehousing/FormWarehousingSettings'));
// * PRODUCTS
export const CreateOfferModal = lazy(() => import('../Modals/CreateOfferModal'));
export const EditOfferModal = lazy(() => import('../Modals/EditOfferModal'));
// export const CreateVariation = lazy(() => import('./offers/variations/_FormCreateVariation'));
// export const CreateVariationOverlay = lazy(() => import('../Overlays/CreateVariationOverlay'));
export const CreateProperty = lazy(() => import('../Modals/CreatePropertyModal'));
// export const SelectProperties = lazy(() => import('../Overlays/FormSelectPropertiesOverlay'));
