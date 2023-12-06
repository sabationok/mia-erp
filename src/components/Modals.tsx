import ModalForm, { ModalFormProps } from './ModalForm';
import PriceListOverview, { PriceListOverviewProps } from './Modals/Overviews/PriceListOverview';
import ProductOverview, { ProductOverviewProps } from './Overviews/ProductOverview';
import SelectProductModal, { SelectProductModalProps } from './Modals/SelectProductModal';
import AppFilter, { AppFilterProps } from './Filter/AppFilter';
import DirVariationsTemplate, { DirVariationsTemplateProps } from './Directories/DirVariationsTemplate';
import DirPoperties, { DirPropertiesProps } from './Directories/DirProperties/DirProperties';
import Forms, { FormPropTypes } from './Forms';
import { FormCreateBankAccountProps } from './Forms/finances/FormCreateBankAccount';

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
  FormCreateProduct = 'FormCreateProduct',
  FormCreateProductInventory = 'FormCreateProductInventory',
  FormCreateProperty = 'FormCreateProperty',
  FormCreateVariation = 'FormCreateVariation',
  FormCreateWarehouse = 'FormCreateWarehouse',
  FormCreateWarehouseDocument = 'FormCreateWarehouseDocument',

  // ? ORDERS
  FormCreateOrder = 'FormCreateOrder',
  FormCreateOrdersGroup = 'FormCreateOrdersGroup',
  SelectOrderType = 'SelectOrderType',
  FormCreateOrderSlot = 'FormCreateOrderSlot',
  // * DIRECTORIES
  DirVariationsTemplate = 'DirVariationsTemplate',
  DirProperties = 'DirProperties',
  // DirTreeComponent = 'DirTreeComponent',

  // * FINANCES
  FormCreateBankAccount = 'FormCreateBankAccount',

  PriceListOverview = 'PriceListOverview',
  ProductOverview = 'ProductOverview',
  SelectProductModal = 'SelectProductModal',
  AppFilter = 'AppFilter',
}

export const ModalChildrenMap: Record<Modals, React.FC<any>> = {
  // * Base modal
  [Modals.ModalForm]: ModalForm,

  // * Forms
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

  [Modals.FormCreateProductInventory]: Forms.CreateProductInventory,
  [Modals.FormCreateProperty]: Forms.CreateProperty,
  [Modals.FormCreateVariation]: Forms.CreateVariation,
  [Modals.FormCreateWarehouse]: Forms.CreateWarehouse,
  [Modals.FormCreateProduct]: Forms.CreateProduct,
  [Modals.FormCreateWarehouseDocument]: Forms.CreateWarehouseDocument,
  // * ORDERS
  [Modals.FormCreateOrder]: Forms.CreateOrder,
  [Modals.FormCreateOrdersGroup]: Forms.CreateOrdersGroup,
  [Modals.FormCreateOrderSlot]: Forms.CreateOrderSlot,
  [Modals.SelectOrderType]: Forms.SelectOrderType,
  // * FINANCES
  [Modals.FormCreateBankAccount]: Forms.CreateBankAccount,
  // * DIRECTORIES
  [Modals.DirVariationsTemplate]: DirVariationsTemplate,
  [Modals.DirProperties]: DirPoperties,
  // [Modals.DirTreeComponent]: DirTreeComp,
  // * Modals props
  [Modals.PriceListOverview]: PriceListOverview,
  [Modals.ProductOverview]: ProductOverview,
  [Modals.SelectProductModal]: SelectProductModal,
  [Modals.AppFilter]: AppFilter,
};

export interface ModalChildrenProps extends Record<Modals, any> {
  // * Base modal props
  [Modals.ModalForm]: ModalFormProps;

  // * Form props
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
  [Modals.FormCreateProductInventory]: FormPropTypes.FormCreateProductInventoryProps;
  [Modals.FormCreateProduct]: FormPropTypes.FormCreateProductProps;
  [Modals.FormCreateProperty]: FormPropTypes.FormCreatePropertyProps;
  [Modals.FormCreateVariation]: FormPropTypes.FormCreateVariationProps;
  [Modals.FormCreateWarehouse]: FormPropTypes.FormCreateWarehouseProps;
  [Modals.FormCreateWarehouseDocument]: FormPropTypes.FormCreateWarehouseDocumentProps;

  // * ORDERS
  [Modals.FormCreateOrder]: FormPropTypes.FormCreateOrderProps;
  [Modals.FormCreateOrdersGroup]: FormPropTypes.FormCreateOrdersGroupProps;
  [Modals.SelectOrderType]: FormPropTypes.SelectOrderTypeModalProps;
  [Modals.FormCreateOrderSlot]: FormPropTypes.FormCreateOrderSlotProps;

  // * DIRECTORIES
  [Modals.DirProperties]: DirPropertiesProps;
  [Modals.DirVariationsTemplate]: DirVariationsTemplateProps;
  // [Modals.DirTreeComponent]: IDirInTreeProps;
  // * Modals props

  [Modals.PriceListOverview]: PriceListOverviewProps;
  [Modals.ProductOverview]: ProductOverviewProps;
  [Modals.SelectProductModal]: SelectProductModalProps;
  [Modals.AppFilter]: AppFilterProps;

  // * FINANCES
  [Modals.FormCreateBankAccount]: FormCreateBankAccountProps;
}
