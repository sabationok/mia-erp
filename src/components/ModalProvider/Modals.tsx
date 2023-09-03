import ModalForm, { ModalFormProps } from '../ModalForm';
import PriceListOverview, { PriceListOverviewProps } from '../Modals/Overviews/PriceListOverview';
import ProductOverview, { ProductOverviewProps } from '../Modals/Overviews/ProductOverview';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { IBaseDirItem } from '../Directories/dir.types';
import OrderOverview, { OrderOverviewProps } from '../Modals/Overviews/OrderOverview';
import SelectProductModal, { SelectProductModalProps } from '../Modals/SelectProductModal';
import AppFilter, { AppFilterProps } from '../Filter/AppFilter';
import DirVariationsTemplate, { DirVariationsTemplateProps } from '../Directories/DirVariationsTemplate';
import * as Forms from '../Forms';
import DirPoperties, { DirPropertiesProps } from '../Directories/DirPoperties';

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
  [Modals.FormCreateDirTreeComp]: Forms.FormCreateDirTreeComp,
  [Modals.FormCreateActivity]: Forms.FormCreateActivity,
  [Modals.FormCreateContractor]: Forms.FormCreateContractor,
  [Modals.FormCreateTransaction]: Forms.FormCreateTransaction,
  [Modals.FormCreateCategory]: Forms.FormCreateCategory,
  [Modals.FormCreatePriceList]: Forms.FormCreatePriceList,
  [Modals.FormCreatePrice]: Forms.FormCreatePrice,
  [Modals.FormCreateCustomRole]: Forms.FormCreateCustomRole,
  [Modals.FormCreateCount]: Forms.FormCreateCount,
  [Modals.FormCreateCompany]: Forms.FormCreateCompany,
  [Modals.FormCreateOrder]: Forms.FormCreateOrder,
  [Modals.FormCreateTag]: Forms.FormCreateTag,
  [Modals.FormCreateMethod]: Forms.FormCreateMethod,
  [Modals.FormInviteUser]: Forms.FormInviteUser,
  [Modals.FormCreateOrderSlotItem]: Forms.FormCreateOrderSlot,
  [Modals.FormCreateProductInventory]: Forms.FormCreateProductInventory,
  [Modals.FormCreateVariationsTemplate]: Forms.FormCreateVariationsTemplate,
  [Modals.FormCreateProperty]: Forms.FormCreateProperty,

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
  [Modals.FormCreateDirTreeComp]: Forms.FormCreateDirTreeCompProps<any, ApiDirType, IBaseDirItem<any, ApiDirType>>;
  [Modals.FormCreateActivity]: Forms.FormCreateCompanyActivityProps;
  [Modals.FormCreateContractor]: Forms.FormCreateContractorProps;
  [Modals.FormCreateTransaction]: Forms.FormCreateTransactionProps;
  [Modals.FormCreateCategory]: Forms.FormCreateCategoryProps;
  [Modals.FormCreatePriceList]: Forms.FormCreatePriceListProps;
  [Modals.FormCreatePrice]: Forms.FormCreatePriceProps;
  [Modals.FormCreateCategory]: Forms.FormCreateCategoryProps;
  [Modals.FormCreateCount]: Forms.FormCreateCountProps;
  [Modals.FormCreateCompany]: Forms.FormCreateCompanyProps;
  [Modals.FormCreateOrder]: Forms.FormCreateOrderProps;
  [Modals.FormCreateCustomRole]: Forms.FormCreateCustomRoleProps;
  [Modals.FormCreateMethod]: Forms.FormCreateMethodProps;
  [Modals.FormCreateTag]: Forms.FormCreateTagProps;
  [Modals.FormInviteUser]: Forms.FormInviteUserProps;
  [Modals.FormCreateOrderSlotItem]: Forms.FormCreateOrderSlotItemProps;
  [Modals.FormCreateProductInventory]: Forms.FormCreateProductInventoryProps;
  [Modals.FormCreateVariationsTemplate]: Forms.FormCreateVariationsTemplateProps;
  [Modals.FormCreateProperty]: Forms.FormCreatePropertyProps;

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
