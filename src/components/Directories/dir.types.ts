import { ModalFormProps } from '../ModalForm';
import { CategoryTypes, ICategory } from '../../redux/categories/categories.types';
import { CountType, ICount } from '../../redux/counts/counts.types';
import { FilterOpt } from '../ModalForm/ModalFilter';
import { IBase } from '../../redux/global.types';
import { ICompany } from '../../redux/companies/companies.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { IActivity } from '../../redux/companyActivities/activities.types';

export interface DirBaseProps extends ModalFormProps {
  title: string;
}

export interface IDirInTreeProps<TData = ICount | ICategory | IActivity, V extends string | undefined = any>
  extends DirBaseProps {
  filterOptions?: FilterOpt<V>[];
  type?: V;
  createParentTitle?: string;
  dirType: ApiDirType;
  filterSearchPath?: keyof IBaseDirItem<TData>;
  filterDefaultValue?: V;
}

export interface DirCategoriesProps extends IDirInTreeProps<ICategory, CategoryTypes> {}

export interface DirCountsProps extends IDirInTreeProps<ICount, CountType> {}

export interface DirMarksProps extends IDirInTreeProps {}

export interface DirActivitiesProps extends IDirInTreeProps<IActivity> {}

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
