import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IOrder, IOrderSlot } from '../../../redux/orders/orders.types';
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
  { label: 'Main', value: 'main' },
  { label: 'Products', value: 'products' },
];

export interface FormCreateOrderState extends Omit<IOrder, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({ defaultState, onSubmit, ...props }) => {
  const [currentTab, setCurrentTab] = useState<number>(0);
  const [content, setContent] = useState<IOrderSlot[]>([]);

  const {
    formState: { errors, ...formStateOthers },
    register,
    registerSelect,
    handleSubmit,
  } = useAppForm<FormCreateOrderState>({
    defaultValues: defaultState,
  });

  const handleSelect = useCallback((slot: IOrderSlot) => {
    setContent(prev => [...prev, slot]);
  }, []);
  const handleRemove = useCallback((slot: OnlyUUID) => {
    setContent(prev => prev.filter(el => el._id !== slot._id));
  }, []);

  const onValid = (data?: FormCreateOrderState) => {
    console.log('FormCreateOrderData =======================================');
    console.log(data);
  };

  const renderTab = useMemo(() => {
    if (currentTab === 0)
      return (
        <FormCreateOrderMainInfo
          register={register}
          registerSelect={registerSelect}
          formState={{ errors, ...formStateOthers }}
        />
      );
    if (currentTab === 1)
      return <FormCreateOrderProductsList list={content} onSelect={handleSelect} onRemove={handleRemove} />;
  }, [currentTab, register, registerSelect, errors, formStateOthers, content, handleSelect, handleRemove]);

  return (
    <ModalForm
      fillHeight
      width={'480px'}
      {...props}
      onOptSelect={(_o, _v, index) => setCurrentTab(index)}
      filterOptions={FormCreateOrderTabs}
      onSubmit={handleSubmit(onValid)}
    >
      {renderTab}
    </ModalForm>
  );
};

export default FormCreateOrder;
