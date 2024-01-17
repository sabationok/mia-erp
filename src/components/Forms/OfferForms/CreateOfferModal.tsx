import { ModalFormProps } from '../../ModalForm';
import { useAfterSubmitOptions } from '../components/FormAfterSubmitOptions';
import ModalBase from '../../Modal';
import { useAppSelector } from '../../../redux/store.store';
import { useAppForm } from '../../../hooks';
import { IProductFormData } from '../../../types/products.types';

export interface CreateOfferModalProps extends ModalFormProps<any> {}

const CreateOfferModal: React.FC<CreateOfferModalProps> = ({ onClose }) => {
  const submitOptions = useAfterSubmitOptions();
  const {
    directories: { directories },
    products: { properties },
  } = useAppSelector();
  const form = useAppForm<IProductFormData>({});
  const {
    formState: { errors },
    formValues,
    register,
    setValue,
    registerSelect,
    handleSubmit,
  } = form;
  return <ModalBase></ModalBase>;
};

export default CreateOfferModal;
