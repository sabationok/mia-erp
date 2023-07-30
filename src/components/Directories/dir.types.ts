import { ModalFormProps } from '../ModalForm';
import { CategoryTypes, ICategory, ICategoryFormData } from '../../redux/directories/directories.types';
import { CountType, ICount, ICountFormData } from '../../redux/directories/counts.types';
import { FilterOpt } from '../ModalForm/ModalFilter';
import { IBase } from '../../redux/global.types';
import { ICompany } from '../../redux/companies/companies.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { IActivity, IActivityFormData } from '../../redux/companyActivities/activities.types';
import { IModalProviderContext } from '../ModalProvider/ModalProvider';
import { DirectoriesService } from '../../hooks/useDirService.hook';
import { DirTableCompProps } from './DirTableComp';
import { AppSubmitHandler, UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';
import { IProduct } from '../../redux/products/products.types';
import { IOrder } from '../../redux/orders/orders.types';

export interface DirBaseProps extends ModalFormProps {
  title: string;
}

export interface DirectoriesFormProps<
  ItemType = any,
  ItemDataType = any,
  FormData = any,
  DirType extends ApiDirType = any
> extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  type?: ItemType;
  data?: ItemDataType;
  parent?: Partial<ItemDataType>;
  create?: boolean;
  edit?: boolean;
  dirType?: DirType;
  onSubmit?: AppSubmitHandler<FormData>;
}

export type RegisterChangeArchiveStatus<ItemDataType = any, ItemType = any> = {
  modalService: IModalProviderContext;
  serviceDispatcher: DirectoriesService['changeArchiveStatus'];
  type?: ItemType;
  findById: (id: string) => ItemDataType | undefined;
};

export interface IDirInTreeProps<
  DirType extends ApiDirType = any,
  ItemType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = any
> extends DirBaseProps {
  filterOptions?: FilterOpt<ItemType>[];
  type?: ItemType;
  createParentTitle?: string;
  dirType: DirType;
  filterSearchPath?: keyof IBaseDirItem<ItemType>;
  filterDefaultValue?: ItemType;
  availableLevels?: number;

  actionsCreator: (options: ActionsCreatorOptions<DirType, ItemType, CreateDTO, UpdateDTO, ItemDataType>) => {
    onCreateChild?: (parentId: string, parent: IBaseDirItem<ItemType>, options?: UseAppFormAfterSubmitOptions) => void;
    onCreateParent?: (options?: UseAppFormAfterSubmitOptions) => void;
    onUpdateItem?: (id: string, options?: UseAppFormAfterSubmitOptions) => void;
    onDeleteItem?: (id: string, options?: UseAppFormAfterSubmitOptions) => void;
    onChangeArchiveStatus?: (id: string, status: boolean, options?: UseAppFormAfterSubmitOptions) => void;
  };
}

export type ActionsCreatorOptions<
  DirType extends ApiDirType = any,
  ItemType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = any
> = {
  modalService: IModalProviderContext;
  dirService: DirectoriesService<DirType, ItemType, CreateDTO, UpdateDTO, ItemDataType>;
  dirType: DirType;
  type?: ItemType;
  findById?: (id: string) => ItemDataType | undefined;
};
export type DirInTreeActionsCreatorOptions<
  DirType extends ApiDirType = any,
  ItemType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = any,
  Service = any
> = {
  modalService: IModalProviderContext;
  dirType: DirType;
  service: Service;
  type?: ItemType;
  findById?: (id: string) => ItemDataType | undefined;
};
export type RegisterCreateChildReturn = (parentId: string) => void;
export type RegisterUpdateItem<ItemDataType = any, ItemType = any> = {
  modalService: IModalProviderContext;
  serviceDispatcher: DirectoriesService['update'];
  type?: ItemType;
  findById: (id: string) => ItemDataType | undefined;
};

export interface DirCategoriesProps
  extends IDirInTreeProps<ApiDirType.CATEGORIES_TR, CategoryTypes, ICategoryFormData, ICategoryFormData, ICategory> {}

export interface DirProductCategoriesProps
  extends IDirInTreeProps<ApiDirType.CATEGORIES_PROD, any, ICategoryFormData, ICategoryFormData, ICategory> {}

export interface DirBrandsProps
  extends IDirInTreeProps<ApiDirType.BRANDS, any, ICategoryFormData, ICategoryFormData, ICategory> {}

export interface DirCountsProps
  extends IDirInTreeProps<ApiDirType.COUNTS, CountType, ICountFormData, ICountFormData, ICount> {}

export interface DirActivitiesProps
  extends IDirInTreeProps<ApiDirType.ACTIVITIES, any, IActivityFormData, IActivityFormData, IActivity> {}

export interface DirMarksProps extends IDirInTreeProps<ApiDirType.MARKS> {}

export interface DirStatusOrderProps extends IDirInTreeProps<ApiDirType.STATUSES_ORDER> {}

export interface DirStatusRefundProps extends IDirInTreeProps<ApiDirType.STATUSES_REFUND> {}

export interface DirStatusDeliveryProps extends IDirInTreeProps<ApiDirType.STATUSES_SHIPMENT> {}

export interface DirProjectsProps extends DirTableCompProps<ApiDirType.PROJECTS> {}

export type ActivityType = 'BASE' | 'ADDS';

export type CategoryFilterOpt<D = any> = FilterOpt<CategoryTypes, D>;

export type CountFilterOpt<D = any> = FilterOpt<CountType, D>;
export type ActivityFilterOpt<D = any> = FilterOpt<ActivityType, D>;

export interface IBaseDirItem<Type = any, DirType extends ApiDirType = any> extends IBase {
  dirType?: DirType;
  owner?: Pick<ICompany, '_id' | 'name' | 'email'>;
  products?: IProduct[];
  orders?: IOrder[];
  parent?: IBaseDirItem<Type, DirType>;
  childrenList?: IBaseDirItem<Type, DirType>[];
  type?: Type;
  name?: string;
  label?: string;
  status?: 'ARCHIVED' | 'DELETED' | 'ACTIVE';
  taxCode?: string | number;
  description?: string;
  manufacturer?: string;
  email?: string;
  phone?: string;
  def?: string;
}
