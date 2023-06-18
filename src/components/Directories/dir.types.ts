import { ModalFormProps } from '../ModalForm';
import { CategoryTypes } from '../../redux/categories/categories.types';
import { CountType } from '../../redux/counts/counts.types';
import { FilterOpt } from '../ModalForm/ModalFilter';
import { IBase } from '../../redux/global.types';
import { ICompany } from '../../redux/companies/companies.types';
import { ApiDirType } from '../../redux/APP_CONFIGS';

export interface DirBaseProps extends ModalFormProps {
  title: string;
}

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
