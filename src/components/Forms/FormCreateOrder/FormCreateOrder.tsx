import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { ICreateOrderFormState, IOrder, IOrderSlot } from '../../../redux/orders/orders.types';
import { useAppForm } from '../../../hooks';
import { useCallback, useMemo, useState } from 'react';
import ModalFilter from '../../ModalForm/ModalFilter';
import OrderSlotsList from './components/OrderSlotsList';
import OrderMainInfoStep from './steps/OrderMainInfoStep';
import { OnlyUUID } from '../../../redux/global.types';
import { enumToFilterOptions } from '../../../utils/fabrics';
import styled from 'styled-components';
import { createStepsChecker } from '../../../utils';

// const orderValidation = yup.object().shape({
//   manager: yup.object().shape({ _id: yup.string() } as Record<keyof IUser, any>),
// } as Record<keyof IOrder, any>);

export interface FormCreateOrderProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect' | 'filterOptions'> {
  onSubmit?: AppSubmitHandler<IOrder>;
}

export enum OrderTabsEnum {
  content = 'content',
  // availability = 'availability',
  info = 'info',
  summary = 'summary',
  invoices = 'invoices',
}
export const FormCreateOrderTabs = enumToFilterOptions(OrderTabsEnum);

const checkStep = createStepsChecker(FormCreateOrderTabs);

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
    if (checkStep(currentTab)?.content) {
      return <OrderSlotsList list={content} onSelect={handleSelect} onRemove={handleRemove} />;
    }

    if (checkStep(currentTab)?.info) {
      return <OrderMainInfoStep form={form} />;
    }

    // if (checkStep(currentTab)?.availability) {
    // }
    if (checkStep(currentTab)?.summary) {
    }
    if (checkStep(currentTab)?.invoices) {
    }
  }, [currentTab, form, content, handleSelect, handleRemove]);

  const renderFilter = useMemo(() => {
    return <ModalFilter filterOptions={FormCreateOrderTabs} onChangeIndex={setCurrentTab} currentIndex={currentTab} />;
  }, [currentTab]);

  return (
    <StModalForm fitContentH fillHeight {...props} onSubmit={form.handleSubmit(onValid)} extraHeader={renderFilter}>
      {renderTab}
    </StModalForm>
  );
};

const StModalForm = styled(ModalForm)`
  @media screen and (min-width: 480px) {
    width: fit-content;
  }
`;

export default FormCreateOrder;
