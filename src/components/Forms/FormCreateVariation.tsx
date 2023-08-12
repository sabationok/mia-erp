import ModalForm, { ModalFormProps } from '../ModalForm';

export interface FormCreateVariationProps extends Omit<ModalFormProps, 'onSubmit'> {}
const FormCreateVariation: React.FC<FormCreateVariationProps> = ({ ...props }) => {
  return (
    <ModalForm width={'480px'} {...props}>
      FormCreateVariationProps
    </ModalForm>
  );
};

export default FormCreateVariation;
