import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { ICreateOrderFormState, IOrder, IOrderSlot } from '../../../redux/orders/orders.types';
import { useAppForm } from '../../../hooks';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import { IUser } from '../../../redux/auth/auth.types';
import { FilterOpt } from '../../ModalForm/ModalFilter';
import FormCreateOrderProductsList from './FormCreateOrderProductsList';
import FormCreateOrderMainInfo from './FormCreateOrderMainInfo';
import { OnlyUUID } from '../../../redux/global.types';

const orderValidation = yup.object().shape({
  manager: yup.object().shape({ _id: yup.string() } as Record<keyof IUser, any>),
} as Record<keyof IOrder, any>);

export interface FormCreateOrderProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect' | 'filterOptions'> {
  onSubmit?: AppSubmitHandler<IOrder>;
}

export const FormCreateOrderTabs: FilterOpt[] = [
  { label: 'Info', value: 'info' },
  { label: 'Products', value: 'products' },
];

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({ defaultState, onSubmit, ...props }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [content, setContent] = useState<IOrderSlot[]>([]);

  const form = useAppForm<ICreateOrderFormState>({
    defaultValues: defaultState,
  });

  const handleSelect = useCallback((slot: IOrderSlot) => {
    setContent(prev => [...prev, slot]);
  }, []);
  const handleRemove = useCallback((slot: OnlyUUID) => {
    setContent(prev => prev.filter(el => el._id !== slot._id));
  }, []);

  const onValid = (data?: ICreateOrderFormState) => {
    console.log('FormCreateOrderData =======================================');
    console.log(data);
  };

  const renderTab = useMemo(() => {
    if (currentTab === 0) return <FormCreateOrderMainInfo form={form} />;
    if (currentTab === 1)
      return <FormCreateOrderProductsList list={content} onSelect={handleSelect} onRemove={handleRemove} />;
  }, [currentTab, form, content, handleSelect, handleRemove]);

  return (
    <ModalForm
      fillHeight
      width={'480px'}
      {...props}
      onOptSelect={(_o, _v, index) => setCurrentTab(index)}
      filterOptions={FormCreateOrderTabs}
      onSubmit={form.handleSubmit(onValid)}
    >
      {renderTab}
    </ModalForm>
  );
};

export default FormCreateOrder;
