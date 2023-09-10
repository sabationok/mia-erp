import ModalForm, { ModalFormProps } from '../ModalForm';

export interface FormCreateVariationProps extends Omit<ModalFormProps, 'onSubmit'> {}
const FormCreateVariation: React.FC<FormCreateVariationProps> = ({ ...props }) => {
  return <ModalForm width={'480px'} title={'FormCreateVariation'} {...props}></ModalForm>;
};

export default FormCreateVariation;
