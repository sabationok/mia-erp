import ModalForm, { ModalFormProps } from '../ModalForm';
import PriceListOverview, { PriceListOverviewProps } from '../Modals/Overviews/PriceListOverview';
import ProductOverview, { ProductOverviewProps } from '../Modals/Overviews/ProductOverview';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { IBaseDirItem } from '../Directories/dir.types';
import OrderOverview, { OrderOverviewProps } from '../Modals/Overviews/OrderOverview';
import SelectProductModal, { SelectProductModalProps } from '../Modals/SelectProductModal';
import AppFilter, { AppFilterProps } from '../Filter/AppFilter';
import DirVariationsTemplate, { DirVariationsTemplateProps } from '../Directories/DirVariationsTemplate';
import DirPoperties, { DirPropertiesProps } from '../Directories/DirPoperties';
import Forms, { FormPropTypes } from '../Forms';

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
  FormCreateOrder = 'FormCreateOrder',
  FormCreateMethod = 'FormCreateMethod',
  FormInviteUser = 'FormInviteUser',
  FormCreateOrderSlotItem = 'FormCreateOrderSlotItem',
  FormCreateProductInventory = 'FormCreateProductInventory',
  FormCreateVariationsTemplate = 'FormCreateVariationsTemplate',
  FormCreateProperty = 'FormCreateProperty',
  FormCreateVariation = 'FormCreateVariation',
  FormCreateWarehouse = 'FormCreateWarehouse',

  // * DIRECTORIES
  DirVariationsTemplate = 'DirVariationsTemplate',
  DirProperties = 'DirProperties',

  PriceListOverview = 'PriceListOverview',
  ProductOverview = 'ProductOverview',
  OrderOverview = 'OrderOverview',
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
  [Modals.FormCreateOrder]: Forms.CreateOrder,
  [Modals.FormCreateTag]: Forms.CreateTag,
  [Modals.FormCreateMethod]: Forms.CreateMethod,
  [Modals.FormInviteUser]: Forms.InviteUser,
  [Modals.FormCreateOrderSlotItem]: Forms.CreateOrderSlot,
  [Modals.FormCreateProductInventory]: Forms.CreateProductInventory,
  [Modals.FormCreateVariationsTemplate]: Forms.CreateVariationsTemplate,
  [Modals.FormCreateProperty]: Forms.CreateProperty,
  [Modals.FormCreateVariation]: Forms.CreateVariation,
  [Modals.FormCreateWarehouse]: Forms.CreateWarehouse,

  // * DIRECTORIES
  [Modals.DirVariationsTemplate]: DirVariationsTemplate,
  [Modals.DirProperties]: DirPoperties,

  // * Modals props
  [Modals.OrderOverview]: OrderOverview,
  [Modals.PriceListOverview]: PriceListOverview,
  [Modals.ProductOverview]: ProductOverview,
  [Modals.SelectProductModal]: SelectProductModal,
  [Modals.AppFilter]: AppFilter,
};

export interface ModalChildrenProps extends Record<Modals, any> {
  // * Base modal props
  [Modals.ModalForm]: ModalFormProps;

  // * Form props
  [Modals.FormCreateDirTreeComp]: FormPropTypes.FormCreateDirTreeCompProps<
    any,
    ApiDirType,
    IBaseDirItem<any, ApiDirType>
  >;
  [Modals.FormCreateActivity]: FormPropTypes.FormCreateCompanyActivityProps;
  [Modals.FormCreateContractor]: FormPropTypes.FormCreateContractorProps;
  [Modals.FormCreateTransaction]: FormPropTypes.FormCreateTransactionProps;
  [Modals.FormCreateCategory]: FormPropTypes.FormCreateCategoryProps;
  [Modals.FormCreatePriceList]: FormPropTypes.FormCreatePriceListProps;
  [Modals.FormCreatePrice]: FormPropTypes.FormCreatePriceProps;
  [Modals.FormCreateCategory]: FormPropTypes.FormCreateCategoryProps;
  [Modals.FormCreateCount]: FormPropTypes.FormCreateCountProps;
  [Modals.FormCreateCompany]: FormPropTypes.FormCreateCompanyProps;
  [Modals.FormCreateOrder]: FormPropTypes.FormCreateOrderProps;
  [Modals.FormCreateCustomRole]: FormPropTypes.FormCreateCustomRoleProps;
  [Modals.FormCreateMethod]: FormPropTypes.FormCreateMethodProps;
  [Modals.FormCreateTag]: FormPropTypes.FormCreateTagProps;
  [Modals.FormInviteUser]: FormPropTypes.FormInviteUserProps;
  [Modals.FormCreateOrderSlotItem]: FormPropTypes.FormCreateOrderSlotItemProps;
  [Modals.FormCreateProductInventory]: FormPropTypes.FormCreateProductInventoryProps;
  [Modals.FormCreateVariationsTemplate]: FormPropTypes.FormCreateVariationsTemplateProps;
  [Modals.FormCreateProperty]: FormPropTypes.FormCreatePropertyProps;
  [Modals.FormCreateVariation]: FormPropTypes.FormCreateVariationProps;
  [Modals.FormCreateWarehouse]: FormPropTypes.FormCreateWarehouseProps;

  // * DIRECTORIES
  [Modals.DirProperties]: DirPropertiesProps;
  [Modals.DirVariationsTemplate]: DirVariationsTemplateProps;

  // * Modals props

  [Modals.OrderOverview]: OrderOverviewProps;
  [Modals.PriceListOverview]: PriceListOverviewProps;
  [Modals.ProductOverview]: ProductOverviewProps;
  [Modals.SelectProductModal]: SelectProductModalProps;
  [Modals.AppFilter]: AppFilterProps;
}
