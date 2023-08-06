import ModalForm, { ModalFormProps } from '../../ModalForm';
import FlexBox from '../../atoms/FlexBox';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IOrder, IOrderSlotItem } from '../../../redux/orders/orders.types';
import { useAppForm } from '../../../hooks';
import styled from 'styled-components';
import { useCallback, useMemo, useState } from 'react';
import * as yup from 'yup';
import { IUser } from '../../../redux/auth/auth.types';
import { FilterOpt } from '../../ModalForm/ModalFilter';
import FormCreateOrderProductsList from './FormCreateOrderProductsList';
import FormCreateOrderMainInfo from './FormCreateOrderMainInfo';
import { IProduct } from '../../../redux/products/products.types';
import { OnlyUUID } from '../../../redux/global.types';

const orderValidation = yup.object().shape({
  manager: yup
    .object()
    .shape({ _id: yup.string().required() } as Record<keyof IUser, any>)
    .required(),
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

  const {
    formState: { isValid, errors, ...formStateOthers },
    formValues,
    register,
    registerSelect,
    setValue,
    handleSubmit,
  } = useAppForm<FormCreateOrderState>({
    defaultValues: defaultState,
  });

  const handleSelect = useCallback(
    (item: IOrderSlotItem | IProduct) => {
      if (Array.isArray(formValues.content)) {
        setValue('content', [...formValues.content, item]);
      } else {
        setValue('content', [item]);
      }
    },
    [formValues.content, setValue]
  );

  const handleRemove = useCallback(
    (item: OnlyUUID) => {
      if (Array.isArray(formValues.content)) {
        setValue(
          'content',
          formValues.content.filter(el => el._id !== item._id)
        );
      }
    },
    [formValues.content, setValue]
  );

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
          formState={{ isValid, errors, ...formStateOthers }}
        />
      );
    if (currentTab === 1)
      return (
        <FormCreateOrderProductsList
          setValue={setValue}
          list={formValues.content}
          onSelect={handleSelect}
          onRemove={handleRemove}
        />
      );
  }, [
    currentTab,
    register,
    registerSelect,
    isValid,
    errors,
    formStateOthers,
    setValue,
    formValues.content,
    handleSelect,
    handleRemove,
  ]);

  return (
    <ModalForm
      fillHeight
      width={'480px'}
      {...props}
      onOptSelect={(_o, _v, index) => setCurrentTab(index)}
      filterOptions={FormCreateOrderTabs}
      isValid={isValid}
      onSubmit={handleSubmit(onValid)}
    >
      {renderTab}
    </ModalForm>
  );
};

const Container = styled(FlexBox)`
  position: relative;
  overflow: auto;
`;

export default FormCreateOrder;
