import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IProductInventoryFormData } from '../../../redux/warehouses/warehouses.types';

export interface FormCreateInventoryProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IProductInventoryFormData>;
  update?: string;
}
const FormCreateInventory: React.FC<FormCreateInventoryProps> = ({ onClose, title, onSubmit }) => {
  // const warehousingS = useAppServiceProvider()[ServiceName.warehouses];

  return <ModalForm title={title || ''}></ModalForm>;
};
export default FormCreateInventory;
