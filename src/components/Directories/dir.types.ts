import { ModalFormProps } from '../ModalForm';
import { CategoryTypes } from '../../redux/categories/categories.types';
import { CountType } from '../../redux/counts/counts.types';
import { FilterOpt } from '../ModalForm/ModalFilter';

export interface DirBaseProps extends ModalFormProps {
  title: string;
}

export type CategoryFilterOpt<D = any> = FilterOpt<CategoryTypes, D>;
export type CountFilterOpt<D = any> = FilterOpt<CountType, D>;
