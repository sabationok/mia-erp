import { ModalFormProps } from '../ModalForm';
import { CategoryTypes, ICategory, ICategoryFormData } from '../../redux/directories/categories.types';
import { CountType, ICount, ICountFormData } from '../../redux/directories/counts.types';
import { FilterOpt } from '../ModalForm/ModalFilter';
import { IBase } from '../../redux/global.types';
import { ICompany } from '../../redux/companies/companies.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { IActivity, IActivityFormData } from '../../redux/companyActivities/activities.types';
import { IDirInTreeProps } from './DirTreeComp';
import { IModalProviderContext } from '../ModalProvider/ModalProvider';
import { DirectoriesService } from '../../hooks/useDirService.hook';

export interface DirBaseProps extends ModalFormProps {
  title: string;
}

export interface DirectoriesFormProps<ItemType = any, ItemDataType = any, FormData = any>
  extends Omit<ModalFormProps, 'onSubmit'> {
  _id?: string;
  type?: ItemType;
  data?: ItemDataType;
  parent?: Partial<ItemDataType>;
  create?: boolean;
  edit?: boolean;
  onSubmit?: (data: FormData) => void;
}

export type RegisterChangeArchiveStatus<ItemDataType = any, ItemType = any> = {
  modalService: IModalProviderContext;
  serviceDispatcher: DirectoriesService['changeArchiveStatus'];
  type?: ItemType;
  findById: (id: string) => ItemDataType | undefined;
};

export type ActionsCreatorOptions<
  DirType extends ApiDirType = any,
  ItemType = any,
  CreateDTO = any,
  UpdateDTO = any,
  ItemDataType = any
> = {
  modalService: IModalProviderContext;
  dirService: DirectoriesService<DirType, ItemType, CreateDTO, UpdateDTO, ItemDataType>;
  type?: ItemType;
  findById: (id: string) => ItemDataType | undefined;
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

export interface DirCountsProps
  extends IDirInTreeProps<ApiDirType.COUNTS, CountType, ICountFormData, ICountFormData, ICount> {}

export interface DirActivitiesProps
  extends IDirInTreeProps<ApiDirType.ACTIVITIES, any, IActivityFormData, IActivityFormData, IActivity> {}

export interface DirMarksProps extends IDirInTreeProps {}

export type CategoryFilterOpt<D = any> = FilterOpt<CategoryTypes, D>;
export type CountFilterOpt<D = any> = FilterOpt<CountType, D>;

export interface IBaseDirItem<Type = any, DirType extends ApiDirType = any> extends IBase {
  name?: string;
  label?: string;
  dirType?: DirType;
  type?: Type;
  description?: string;
  def?: string;
  owner?: Pick<ICompany, '_id' | 'name' | 'email'>;
  parent?: IBaseDirItem<Type>;
  childrenList?: IBaseDirItem<Type>[];
}
