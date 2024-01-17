import { useAppForm } from '../../../hooks';
import { IProductFormData, IProductReqData, ProductFilterOpt } from '../../../types/products.types';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';

export interface FormCreateOfferBaseInfoStepProps {
  copy?: boolean;
  id?: string;
  edit?: boolean;
  _id?: string;
  onSubmit?: AppSubmitHandler<IProductReqData>;
  filterOptions?: ProductFilterOpt[];
  defaultState?: IProductFormData;
  defaultValues?: IProductFormData;
}

const FormCreateOfferBaseInfoStep: React.FC<FormCreateOfferBaseInfoStepProps> = ({ defaultValues }) => {
  const form = useAppForm<IProductFormData>({ defaultValues });

  return <></>;
};
export default FormCreateOfferBaseInfoStep;
