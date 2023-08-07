import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IOrderSlot } from '../../../redux/orders/orders.types';
import { useCallback, useState } from 'react';
import OrderSlotOverview from '../../Products/OrderSlotOverview';

export interface FormCreateOrderSlotItemProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrderSlot>;
}
const FormCreateOrderSlot: React.FC<FormCreateOrderSlotItemProps> = ({ onSubmit, ...props }) => {
  const [loadedData, setLoadedData] = useState<IOrderSlot>();

  const getData = useCallback(() => {}, []);
  return (
    <ModalForm width={'480px'} title={'Створення позиції для замовлення'} {...props}>
      {loadedData && <OrderSlotOverview slot={loadedData} />}
    </ModalForm>
  );
};
export default FormCreateOrderSlot;
