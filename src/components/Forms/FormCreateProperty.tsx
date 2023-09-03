import ModalForm, { ModalFormProps } from '../ModalForm';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { IPropertyDto, ProductTypeEnum } from '../../redux/products/products.types';

export interface FormCreatePropertyProps extends Omit<ModalFormProps, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<IPropertyDto>;
  type?: ProductTypeEnum;
  create?: boolean;
  edit?: boolean;
}

const FormCreateProperty: React.FC<FormCreatePropertyProps> = ({ onSubmit, ...props }) => {
  return <ModalForm {...props}></ModalForm>;
};
export default FormCreateProperty;
