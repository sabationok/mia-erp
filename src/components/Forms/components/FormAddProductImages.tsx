import ModalForm, { ModalFormProps } from '../../ModalForm';
import { OfferImageSlotEntity } from '../../../types/offers/offers.types';

export interface FormAddProductImagesProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  defaultState?: OfferImageSlotEntity[];
  onSubmit?: (imageData: OfferImageSlotEntity) => void;
  onSelect?: (imageData: OfferImageSlotEntity) => void;
}

const FormAddProductImages: React.FC<FormAddProductImagesProps> = ({ defaultState }) => {
  // const { control, register } = useForm();
  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
  //   control, // control props comes from useForm (optional: if you are using FormContext)
  //   name: 'test', // unique name for your Field Array
  // });

  return <ModalForm title={'Add image to product'}></ModalForm>;
};

export default FormAddProductImages;
