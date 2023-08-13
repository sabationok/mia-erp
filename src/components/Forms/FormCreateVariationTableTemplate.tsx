import ModalForm, { ModalFormProps } from '../ModalForm';

export interface FormCreateVariationTableTemplateProps extends Omit<ModalFormProps, 'onSubmit'> {}
const FormCreateVariationTableTemplate: React.FC<FormCreateVariationTableTemplateProps> = ({ ...props }) => {
  return <ModalForm title={'FormCreateVariationTableTemplate'} {...props}></ModalForm>;
};
export default FormCreateVariationTableTemplate;
