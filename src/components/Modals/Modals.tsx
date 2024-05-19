import ModalForm, { ModalFormProps } from '../ModalForm';
import PriceListOverview, { PriceListOverviewProps } from './Overviews/PriceListOverview';
import ProductOverview, { ProductOverviewProps } from '../Overviews/ProductOverview';
import SelectProductModal, { SelectProductModalProps } from './SelectProductModal';
import AppFilter, { AppFilterProps } from '../Filter/AppFilter';
import DirVariationsTemplate, { DirVariationsTemplateProps } from '../Directories/DirVariationsTemplate';
import DirPoperties, { DirPropertiesProps } from '../Directories/DirProperties/DirProperties';
import Forms, { FormPropTypes } from '../Forms';
import { FormCreateBankAccountProps } from '../Forms/finances/FormCreateBankAccount';

export enum Modals {
  ModalForm = 'ModalForm',
  FormCreateTag = 'FormCreateTag',
  FormCreateActivity = 'FormCreateActivity',
  FormCreateDirTreeComp = 'FormCreateDirTreeComp',
  FormCreateContractor = 'FormCreateContractor',
  FormCreateTransaction = 'FormCreateTransaction',
  FormCreatePrice = 'FormCreatePrice',
  FormCreatePriceList = 'FormCreatePriceList',
  FormCreateCustomRole = 'FormCreateCustomRole',
  FormCreateCount = 'FormCreateCount',
  FormCreateCategory = 'FormCreateCategory',
  FormCreateCompany = 'FormCreateCompany',
  FormCreateMethod = 'FormCreateMethod',
  FormInviteUser = 'FormInviteUser',
  CreateOffer = 'CreateOffer',
  EditOffer = 'EditOffer',
  FormCreateOfferInventory = 'FormCreateOfferInventory',
  FormCreateProperty = 'FormCreateProperty',
  FormCreateVariation = 'FormCreateVariation',
  FormCreateWarehouse = 'FormCreateWarehouse',
  FormCreateWarehouseDocument = 'FormCreateWarehouseDocument',

  // ? ORDERS
  FormCreateOrder = 'FormCreateOrder',
  FormCreateOrdersGroup = 'FormCreateOrdersGroup',
  SelectOrderType = 'SelectOrderType',
  FormCreateOrderSlot = 'FormCreateOrderSlot',
  // sep DIRECTORIES
  DirVariationsTemplate = 'DirVariationsTemplate',
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
  [Modals.FormCreateCategory]: Forms.CreateCategory,
  [Modals.FormCreatePriceList]: Forms.CreatePriceList,
  [Modals.FormCreatePrice]: Forms.CreatePrice,
  [Modals.FormCreateCustomRole]: Forms.CreateCustomRole,
  [Modals.FormCreateCount]: Forms.CreateCount,
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
  [Modals.FormCreateVariation]: Forms.CreateVariation,
  [Modals.FormCreateProperty]: Forms.CreateProperty,

  // sep ORDERS
  [Modals.FormCreateOrder]: Forms.CreateOrder,
  [Modals.FormCreateOrdersGroup]: Forms.CreateOrdersGroup,
  [Modals.FormCreateOrderSlot]: Forms.CreateOrderSlot,
  [Modals.SelectOrderType]: Forms.SelectOrderType,
  // sep FINANCES
  [Modals.FormCreateBankAccount]: Forms.CreateBankAccount,
  // sep DIRECTORIES
  [Modals.DirVariationsTemplate]: DirVariationsTemplate,
  [Modals.DirProperties]: DirPoperties,
  // [Modals.DirTreeComponent]: DirTreeComp,
  // sep Modals props
  [Modals.PriceListOverview]: PriceListOverview,
  [Modals.ProductOverview]: ProductOverview,
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
  [Modals.FormCreateCategory]: FormPropTypes.FormCreateCategoryProps;
  [Modals.FormCreatePriceList]: FormPropTypes.FormCreatePriceListProps;
  [Modals.FormCreatePrice]: FormPropTypes.FormCreatePriceProps;
  [Modals.FormCreateCategory]: FormPropTypes.FormCreateCategoryProps;
  [Modals.FormCreateCount]: FormPropTypes.FormCreateCountProps;
  [Modals.FormCreateCompany]: FormPropTypes.FormCreateCompanyProps;
  [Modals.FormCreateCustomRole]: FormPropTypes.FormCreateCustomRoleProps;
  [Modals.FormCreateMethod]: FormPropTypes.FormCreateMethodProps;
  [Modals.FormInviteUser]: FormPropTypes.FormInviteUserProps;
  [Modals.FormCreateTag]: FormPropTypes.FormCreateTagProps;

  [Modals.FormCreateOfferInventory]: FormPropTypes.FormCreateProductInventoryProps;
  [Modals.FormCreateWarehouse]: FormPropTypes.FormCreateWarehouseProps;
  [Modals.FormCreateWarehouseDocument]: FormPropTypes.FormCreateWarehouseDocumentProps;
  // sep OFFERS
  [Modals.CreateOffer]: FormPropTypes.CreateOfferModalProps;
  [Modals.EditOffer]: FormPropTypes.EditOfferModalProps;
  [Modals.FormCreateProperty]: FormPropTypes.FormCreatePropertyProps;

  [Modals.FormCreateVariation]: FormPropTypes.FormCreateVariationProps;

  // sep ORDERS
  [Modals.FormCreateOrder]: FormPropTypes.FormCreateOrderProps;
  [Modals.FormCreateOrdersGroup]: FormPropTypes.FormCreateOrdersGroupProps;
  [Modals.SelectOrderType]: FormPropTypes.SelectOrderTypeModalProps;
  [Modals.FormCreateOrderSlot]: FormPropTypes.FormCreateOrderSlotProps;

  // sep DIRECTORIES
  [Modals.DirProperties]: DirPropertiesProps;
  [Modals.DirVariationsTemplate]: DirVariationsTemplateProps;
  // [Modals.DirTreeComponent]: IDirInTreeProps;
  // sep Modals props

  [Modals.PriceListOverview]: PriceListOverviewProps;
  [Modals.ProductOverview]: ProductOverviewProps;
  [Modals.SelectProductModal]: SelectProductModalProps;
  [Modals.AppFilter]: AppFilterProps;

  // sep FINANCES
  [Modals.FormCreateBankAccount]: FormCreateBankAccountProps;
}
