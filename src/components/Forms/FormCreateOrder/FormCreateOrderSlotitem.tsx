import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IOrderSlotItem } from '../../../redux/orders/orders.types';
import { useCallback, useState } from 'react';
import OrderSlotItemOverview from '../../Products/OrderSlotItemOverview';

export interface FormCreateOrderSlotItemProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrderSlotItem>;
}
const FormCreateOrderSlotItem: React.FC<FormCreateOrderSlotItemProps> = ({ onSubmit, ...props }) => {
  const [loadedData, setLoadedData] = useState<IOrderSlotItem>();

  const getData = useCallback(() => {}, []);
  return (
    <ModalForm width={'480px'} title={'Створення позиції для замовлення'} {...props}>
      {loadedData && <OrderSlotItemOverview item={loadedData} />}
    </ModalForm>
  );
};
export default FormCreateOrderSlotItem;
