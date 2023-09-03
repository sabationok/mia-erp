import { ModalFormProps } from '../ModalForm';
import {
  CategoryTrTypeEnum,
  CategoryTypes,
  ICategory,
  ICategoryFormData,
} from '../../redux/directories/directories.types';
import { CountsTypesEnum, CountType, ICount, ICountFormData } from '../../redux/directories/counts.types';
import { FilterOpt } from '../ModalForm/ModalFilter';
import { IBase } from '../../redux/global.types';
import { ICompany } from '../../redux/companies/companies.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { IModalProviderContext } from '../ModalProvider/ModalProvider';
import { DirectoriesService } from '../../hooks/useDirService.hook';
// import { DirTableCompProps } from './DirTableComp';
import { AppSubmitHandler, UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';
import { ContractorsTypesEnum } from '../../redux/contractors/contractors.types';
import { ProductTypeEnum } from '../../redux/products/products.types';

export interface ItemTypeByDirType extends Record<ApiDirType, any> {
  [ApiDirType.CATEGORIES_TR]: CategoryTrTypeEnum;
  [ApiDirType.CATEGORIES_PROD]: ProductTypeEnum;
  [ApiDirType.PROPERTIES_PRODUCTS]: ProductTypeEnum;
  [ApiDirType.CONTRACTORS]: ContractorsTypesEnum;
  [ApiDirType.COUNTS]: CountsTypesEnum;
}

export interface IBaseDirItem<Type = any, DirType extends ApiDirType = any> extends IBase {
  dirType?: DirType;
  owner?: Pick<ICompany, '_id' | 'name' | 'email'>;
  // products?: IProduct[];
  // orders?: IOrder[];
  parent?: IBaseDirItem<Type, DirType>;
  childrenList?: IBaseDirItem<Type, DirType>[];
  type?: Type;
  name?: string;
  secondName?: string;
  label?: string;
  status?: 'ARCHIVED' | 'DELETED' | 'ACTIVE';
  taxCode?: string | number;
  personalTaxCode?: string | number;
  description?: string;
  manufacturer?: string;
  email?: string;
  phone?: string;
  code?: string | number;
}
export interface IDirItemBase<DirType extends ApiDirType = any, ItemType = any>
  extends IBaseDirItem<ItemType, DirType> {}
export interface DirBaseProps extends ModalFormProps {
  title: string;
}
export type DirectoryItemType = ContractorsTypesEnum & CountsTypesEnum & CategoryTrTypeEnum;
export interface DirectoriesFormProps<
  ItemType = any,
  ItemDataType = any,
  FormData = any,
  DirType extends ApiDirType = any
> extends Omit<ModalFormProps<any, any, ItemDataType>, 'onSubmit'> {
  _id?: string;
  type?: ItemType;
  data?: ItemDataType;
  parent?: Partial<ItemDataType>;
  create?: boolean;
  edit?: boolean;
  dirType?: DirType;
  onSubmit?: AppSubmitHandler<FormData, { logAfterSubmit?: boolean }>;
}
export interface GetDirInTreeActionsCreatorOptions {
  createParentTitle?: string;
  createChildTitle?: string;
  updateItemTitle?: string;
}

export interface IDirInTreeProps<
  DirType extends ApiDirType = any,
  ItemType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType extends IDirItemBase = any,
  Service = any
> extends DirBaseProps {
  filterOptions?: FilterOpt<ItemType>[];
  type?: ItemType;
  createParentTitle?: string;
  dirType: DirType;
  filterSearchPath?: keyof IBaseDirItem<ItemType>;
  filterDefaultValue?: ItemType;
  availableLevels?: number;

  editing?: boolean;
  creatingParent?: boolean;
  creatingChild?: boolean;
  changeDisableStatus?: boolean;
  changeArchiveStatus?: boolean;

  actionsCreator: DirInTreeActionsCreatorType<DirType, ItemType, ItemDataType, Service>;
}

// (options: ActionsCreatorOptions<DirType, ItemType, CreateDTO, UpdateDTO, ItemDataType>) => {
//   onCreateChild?: (parentId: string, parent: IBaseDirItem<ItemType>, options?: UseAppFormAfterSubmitOptions) => void;
//   onCreateParent?: (options?: UseAppFormAfterSubmitOptions) => void;
//   onUpdateItem?: (id: string, options?: UseAppFormAfterSubmitOptions) => void;
//   onDeleteItem?: (id: string, options?: UseAppFormAfterSubmitOptions) => void;
//   onChangeArchiveStatus?: (id: string, status: boolean, options?: UseAppFormAfterSubmitOptions) => void;
// }

export type ActionsCreatorOptions<
  DirType extends ApiDirType = any,
  ItemType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = any
> = {
  modalService: IModalProviderContext;
  service: DirectoriesService<DirType, ItemType, CreateDTO, UpdateDTO, ItemDataType>;
  dirType: DirType;
  type?: ItemType;
  findById?: (id: string) => ItemDataType | undefined;
};
export type DirInTreeActionsCreatorOptions<
  DirType extends ApiDirType = any,
  ItemType = any,
  ItemDataType = any,
  Service = any
> = {
  modalService: IModalProviderContext;
  dirType: DirType;
  service: Service;
  type?: ItemType;
  findById?: (id: string) => ItemDataType | undefined;
};
export type DirInTreeActionsCreatorType<
  DirType extends ApiDirType = any,
  ItemType = any,
  ItemDataType extends IDirItemBase = any,
  Service = any
> = (options: DirInTreeActionsCreatorOptions<DirType, ItemType, ItemDataType, Service>) => {
  onCreateChild?: (parentId: string, parent: IBaseDirItem, options?: UseAppFormAfterSubmitOptions) => void;
  onCreateParent?: (options?: UseAppFormAfterSubmitOptions) => void;
  onUpdate?: (id: string, data: ItemDataType, options?: UseAppFormAfterSubmitOptions) => void;
  onDelete?: (id: string, options?: UseAppFormAfterSubmitOptions) => void;
  onChangeArchiveStatus?: (id: string, status: boolean, options?: UseAppFormAfterSubmitOptions) => void;
  onChangeDisableStatus?: (id: string, status: boolean, options?: UseAppFormAfterSubmitOptions) => void;
};

export interface DirCategoriesProps
  extends IDirInTreeProps<ApiDirType.CATEGORIES_TR, CategoryTypes, ICategoryFormData, ICategoryFormData, ICategory> {}

export interface DirProductCategoriesProps
  extends IDirInTreeProps<ApiDirType.CATEGORIES_PROD, any, ICategoryFormData, ICategoryFormData, ICategory> {}

// export interface DirBrandsProps
//   extends IDirInTreeProps<ApiDirType.BRANDS, any, ICategoryFormData, ICategoryFormData, ICategory> {}

export interface DirCountsProps
  extends IDirInTreeProps<ApiDirType.COUNTS, CountType, ICountFormData, ICountFormData, ICount> {}
export interface IActivity extends IBaseDirItem {}

export interface IActivityFormData extends Omit<IActivity, '_id' | 'createdAt' | 'updatedAt'> {}
export interface DirActivitiesProps
  extends IDirInTreeProps<ApiDirType.ACTIVITIES, any, IActivityFormData, IActivityFormData, IActivity> {}
export interface IBrand extends IBaseDirItem {}

export interface IProductCategoryDirItem extends IBaseDirItem<any, ApiDirType.CATEGORIES_PROD> {}
export interface IBrandFormData extends Omit<IBrand, '_id' | 'createdAt' | 'updatedAt'> {}
export interface DirBrandsProps
  extends IDirInTreeProps<ApiDirType.BRANDS, any, IBrandFormData, IBrandFormData, IBrand> {}

// ? PRODUCTS PROPERTIES
export interface IPropertyDirItem extends IBaseDirItem {}

export interface IPropertyFormData extends Omit<IPropertyDirItem, '_id' | 'createdAt' | 'updatedAt' | 'childrenList'> {}

export interface DirPropertiesProps
  extends IDirInTreeProps<
    ApiDirType.PROPERTIES_PRODUCTS,
    any,
    IPropertyFormData,
    IPropertyFormData,
    IPropertyDirItem
  > {}

export interface DirMarksProps extends IDirInTreeProps<ApiDirType.MARKS> {}

export interface ITagDirItem extends IBaseDirItem<ContractorsTypesEnum, ApiDirType.TAGS> {}
export interface DirTagsProps extends IDirInTreeProps<ApiDirType.TAGS> {}

export interface ISupplierDirItem extends IBaseDirItem<ContractorsTypesEnum.SUPPLIER, ApiDirType.CONTRACTORS> {}
export interface ICustomerDirItem extends IBaseDirItem<ContractorsTypesEnum.CUSTOMER, ApiDirType.CONTRACTORS> {
  secondName?: string;
}
export interface IShipmentDirItem extends IBaseDirItem<any, ApiDirType.METHODS_SHIPMENT> {}
export interface ICommunicationDirItem extends IBaseDirItem<any, ApiDirType.METHODS_COMMUNICATION> {}
export interface IPaymentDirItem extends IBaseDirItem<any, ApiDirType.METHODS_PAYMENT> {}
// ???
export interface IWarehouse extends IBaseDirItem {}
export interface IWarehouseFormData extends Omit<IWarehouse, '_id' | 'createdAt' | 'updatedAt'> {}
export interface DirWarehousesProps
  extends IDirInTreeProps<ApiDirType.WAREHOUSES, any, IWarehouseFormData, IWarehouseFormData, IWarehouse> {}
export interface IWarehouseDirItem extends IBaseDirItem<any, ApiDirType.WAREHOUSES> {
  code?: string | number;
}

export type MethodDirType = ApiDirType.METHODS_SHIPMENT | ApiDirType.METHODS_COMMUNICATION | ApiDirType.METHODS_PAYMENT;
export type IMethodDirItem = IShipmentDirItem | ICommunicationDirItem | IPaymentDirItem;

// export interface DirStatusOrderProps extends IDirInTreeProps<ApiDirType.STATUSES_ORDER> {}

// export interface DirStatusRefundProps extends IDirInTreeProps<ApiDirType.STATUSES_REFUND> {}

// export interface DirStatusDeliveryProps extends IDirInTreeProps<ApiDirType.STATUSES_SHIPMENT> {}

// export interface DirProjectsProps extends DirTableCompProps<ApiDirType.PROJECTS> {}

// export type ActivityType = 'BASE' | 'ADDS';

export type CategoryFilterOpt<D = any> = FilterOpt<CategoryTypes, D>;

export type CountFilterOpt<D = any> = FilterOpt<CountType, D>;
// export type ActivityFilterOpt<D = any> = FilterOpt<ActivityType, D>;
