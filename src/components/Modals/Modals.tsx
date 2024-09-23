import ModalForm, { ModalFormProps } from '../ModalForm';
import PriceListOverview, { PriceListOverviewProps } from './PriceListOverview';
import OfferOverview, { ProductOverviewProps } from '../Overviews/offer/OfferOverview';
import SelectProductModal, { SelectProductModalProps } from './SelectProductModal';
import AppFilter, { AppFilterProps } from '../Filter/AppFilter';
import DirProperties, { DirPropertiesProps } from '../Directories/DirProperties';
import Forms, { FormPropTypes } from '../Forms';
import { FormCreateBankAccountProps } from '../Forms/finances/FormCreateBankAccount';
import CreatePriceModal, { ModalCreatePriceProps } from './CreatePriceModal';

export enum Modals {
  ModalForm = 'ModalForm',
  FormCreateTag = 'FormCreateTag',
  FormCreateActivity = 'FormCreateActivity',
  FormCreateDirTreeComp = 'FormCreateDirTreeComp',
  FormCreateContractor = 'FormCreateContractor',
  FormCreateTransaction = 'FormCreateTransaction',

  CreatePrice = 'CreatePrice',
  FormCreatePriceList = 'FormCreatePriceList',

  FormCreateCustomRole = 'FormCreateCustomRole',
  FormCreateFinAccount = 'FormCreateFinAccount',
  CreateOfferCategory = 'CreateOfferCategory',
  CreateFinCategory = 'CreateFinCategory',
  FormCreateCompany = 'FormCreateCompany',
  FormCreateMethod = 'FormCreateMethod',
  FormInviteUser = 'FormInviteUser',
  CreateOffer = 'CreateOffer',
  EditOffer = 'EditOffer',
  FormCreateOfferInventory = 'FormCreateOfferInventory',
  FormCreateProperty = 'FormCreateProperty',
  FormCreateWarehouse = 'FormCreateWarehouse',
  FormCreateWarehouseDocument = 'FormCreateWarehouseDocument',

  // sep ORDERS
  FormCreateOrder = 'FormCreateOrder',
  FormCreateOrdersGroup = 'FormCreateOrdersGroup',
  SelectOrderType = 'SelectOrderType',
  FormCreateOrderSlot = 'FormCreateOrderSlot',
  // sep DIRECTORIES
  DirProperties = 'DirProperties',
  // DirTreeComponent = 'DirTreeComponent',

  // sep FINANCES
  FormCreateBankAccount = 'FormCreateBankAccount',

  PriceListOverview = 'PriceListOverview',
  ProductOverview = 'ProductOverview',
  SelectProductModal = 'SelectProductModal',
  AppFilter = 'AppFilter',
}

export const ModalChildrenMap: Record<Modals, React.FC<any>> = {
  // sep Base modal
  [Modals.ModalForm]: ModalForm,

  // sep Forms
  [Modals.FormCreateDirTreeComp]: Forms.CreateDirTreeComp,
  [Modals.FormCreateActivity]: Forms.CreateActivity,
  [Modals.FormCreateContractor]: Forms.CreateContractor,
  [Modals.FormCreateTransaction]: Forms.CreateTransaction,
  [Modals.CreateOfferCategory]: Forms.CreateOfferCategory,
  [Modals.CreateFinCategory]: Forms.CreateFinCategory,
  [Modals.FormCreatePriceList]: Forms.CreatePriceList,
  [Modals.CreatePrice]: CreatePriceModal,
  [Modals.FormCreateCustomRole]: Forms.CreateCustomRole,
  [Modals.FormCreateFinAccount]: Forms.CreateCount,
  [Modals.FormCreateCompany]: Forms.CreateCompany,
  [Modals.FormCreateTag]: Forms.CreateTag,
  [Modals.FormCreateMethod]: Forms.CreateMethod,
  [Modals.FormInviteUser]: Forms.InviteUser,
  // sep WAREHOUSING
  [Modals.FormCreateOfferInventory]: Forms.CreateProductInventory,
  [Modals.FormCreateWarehouseDocument]: Forms.CreateWarehouseDocument,
  [Modals.FormCreateWarehouse]: Forms.CreateWarehouse,
  // sep OFFERS
  [Modals.CreateOffer]: Forms.CreateOfferModal,
  [Modals.EditOffer]: Forms.EditOfferModal,
  [Modals.FormCreateProperty]: Forms.CreateProperty,

  // sep ORDERS
  [Modals.FormCreateOrder]: Forms.CreateOrder,
  [Modals.FormCreateOrdersGroup]: Forms.CreateOrdersGroup,
  [Modals.FormCreateOrderSlot]: Forms.CreateOrderSlot,
  [Modals.SelectOrderType]: Forms.SelectOrderType,
  // sep FINANCES
  [Modals.FormCreateBankAccount]: Forms.CreateBankAccount,
  // sep DIRECTORIES
  [Modals.DirProperties]: DirProperties,
  // [Modals.DirTreeComponent]: DirTreeComp,
  // sep Modals props
  [Modals.PriceListOverview]: PriceListOverview,
  [Modals.ProductOverview]: OfferOverview,
  [Modals.SelectProductModal]: SelectProductModal,
  [Modals.AppFilter]: AppFilter,
};

export interface ModalChildrenProps extends Record<Modals, any> {
  // sep Base modal props
  [Modals.ModalForm]: ModalFormProps;

  // sep Form props
  [Modals.FormCreateDirTreeComp]: FormPropTypes.FormCreateDirTreeCompProps;
  [Modals.FormCreateActivity]: FormPropTypes.FormCreateCompanyActivityProps;
  [Modals.FormCreateContractor]: FormPropTypes.FormCreateContractorProps;
  [Modals.FormCreateTransaction]: FormPropTypes.FormCreateTransactionProps;
  [Modals.CreateOfferCategory]: FormPropTypes.FormCreateCategoryProps;
  [Modals.CreateFinCategory]: FormPropTypes.FormCreateCategoryProps;
  [Modals.FormCreateFinAccount]: FormPropTypes.FormCreateFinAccountProps;
  [Modals.FormCreateCompany]: FormPropTypes.FormCreateCompanyProps;
  [Modals.FormCreateCustomRole]: FormPropTypes.FormCreateCustomRoleProps;
  [Modals.FormCreateMethod]: FormPropTypes.FormCreateMethodProps;
  [Modals.FormInviteUser]: FormPropTypes.FormInviteUserProps;
  [Modals.FormCreateTag]: FormPropTypes.FormCreateTagProps;

  // sep PRICING
  [Modals.FormCreatePriceList]: FormPropTypes.FormCreatePriceListProps;
  [Modals.CreatePrice]: ModalCreatePriceProps;

  [Modals.FormCreateOfferInventory]: FormPropTypes.FormCreateProductInventoryProps;
  [Modals.FormCreateWarehouse]: FormPropTypes.FormCreateWarehouseProps;
  [Modals.FormCreateWarehouseDocument]: FormPropTypes.FormCreateWarehouseDocumentProps;
  // sep OFFERS
  [Modals.CreateOffer]: FormPropTypes.CreateOfferModalProps;
  [Modals.EditOffer]: FormPropTypes.EditOfferModalProps;
  [Modals.FormCreateProperty]: FormPropTypes.OfferPropertyModalProps;

  // sep ORDERS
  [Modals.FormCreateOrder]: FormPropTypes.FormCreateOrderProps;
  [Modals.FormCreateOrdersGroup]: FormPropTypes.FormCreateOrdersGroupProps;
  [Modals.SelectOrderType]: FormPropTypes.SelectOrderTypeModalProps;
  [Modals.FormCreateOrderSlot]: FormPropTypes.FormCreateOrderSlotProps;

  // sep DIRECTORIES
  [Modals.DirProperties]: DirPropertiesProps;
  // [Modals.DirTreeComponent]: IDirInTreeProps;
  // sep Modals props

  [Modals.PriceListOverview]: PriceListOverviewProps;
  [Modals.ProductOverview]: ProductOverviewProps;
  [Modals.SelectProductModal]: SelectProductModalProps;
  [Modals.AppFilter]: AppFilterProps;

  // sep FINANCES
  [Modals.FormCreateBankAccount]: FormCreateBankAccountProps;
}
