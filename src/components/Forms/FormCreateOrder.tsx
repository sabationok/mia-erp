import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { IOrder } from '../../redux/orders/orders.types';
import { useAppForm } from '../../hooks';
import InputLabel from '../atoms/Inputs/InputLabel';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { useMemo } from 'react';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import { useDirectoriesSelector } from '../../redux/selectors.store';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { ContractorsTypesEnum } from '../../redux/contractors/contractors.types';
import FormAccordeonItem from './components/FormAccordeonItem';
import { usePermissionsSelector } from '../../hooks/usePermissionsService.hook';
import styled from 'styled-components';

export interface FormCreateOrderProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrder>;
}

export interface FormCreateOrderState extends Omit<IOrder, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({ onSubmit, ...props }) => {
  const { directory: workers } = useDirectoriesSelector(ApiDirType.WORKERS);
  const { directory: paymentsMethods } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);
  const { directory: shipmentMethods } = useDirectoriesSelector(ApiDirType.METHODS_SHIPMENT);
  const { directory: communicationMethods } = useDirectoriesSelector(ApiDirType.METHODS_COMMUNICATION);
  const { permissions } = usePermissionsSelector();

  const managersList = useMemo(
    () => (workers ? workers?.filter(el => el?.type === ContractorsTypesEnum.MANAGER) : undefined),
    [workers]
  );

  const {
    formState: { isValid },
    register,
    registerSelect,
    handleSubmit,
  } = useAppForm<FormCreateOrderState>();

  const onValid = (data?: FormCreateOrderState) => {
    console.log('FormCreateOrder');
    console.log(data);
  };

  return (
    <ModalForm fillHeight {...props} isValid={isValid} onSubmit={handleSubmit(onValid)}>
      <FlexBox flex={1} padding={'8px 16px'} overflow={'hidden'}>
        <CustomSelect
          {...registerSelect('manager', {
            options: managersList,
            label: 'Менеджер',
            placeholder: 'Оберіть відповідального менеджера',
            required: true,
          })}
        />
        <CustomSelect
          {...registerSelect('paymentMethod', {
            options: paymentsMethods,
            label: 'Тип оплати',
            placeholder: 'Оберіть тип оплати',
            required: true,
          })}
        />{' '}
        <CustomSelect
          {...registerSelect('shipmentMethod', {
            options: shipmentMethods,
            label: 'Спосіб відвантаження',
            placeholder: 'Оберіть спосіб відвантаження',
            required: true,
          })}
        />
        <CustomSelect
          {...registerSelect('communicationMethod', {
            options: communicationMethods,
            label: 'Спосіб звязку',
            placeholder: "Оберіть спосіб зв'язку",
            required: true,
          })}
        />
        {false && (
          <GridBox style={{ minHeight: 'max-content' }} overflow={'scroll'}>
            <FormAccordeonItem open renderHeader={'Замовник'}>
              <InputLabel label={'Замовник'}>
                <TextareaPrimary placeholder={'Введіть інформацію про замовника'} {...register('customer')} />
              </InputLabel>
            </FormAccordeonItem>
            <FormAccordeonItem open renderHeader={'Отримувач'}>
              <InputLabel label={'Отримувач'}>
                <TextareaPrimary placeholder={'Введіть інформацію про отримувача'} {...register('receiver')} />
              </InputLabel>
            </FormAccordeonItem>
            <FormAccordeonItem open renderHeader={'Місце призначення'}>
              <InputLabel label={'Місце призначення'}>
                <TextareaPrimary placeholder={'Введіть інформацію про призначення'} {...register('destination')} />
              </InputLabel>
            </FormAccordeonItem>
            <FormAccordeonItem open renderHeader={'Додаткова інформація'}>
              <InputLabel label={'Коментар'}>
                <TextareaPrimary placeholder={'Введіть коментар до замовлення'} {...register('comment')} />
              </InputLabel>
              <InputLabel label={'Службовий коментар'}>
                <TextareaPrimary
                  placeholder={'Цей коментар будть бачити лише працівники компанії'}
                  {...register('innerComment')}
                />
              </InputLabel>
            </FormAccordeonItem>
          </GridBox>
        )}
      </FlexBox>
    </ModalForm>
  );
};

const GridBox = styled(FlexBox)`
  //display: grid;
  //grid-template-columns: 1fr;
  overflow: auto;

  min-height: max-content;
`;
export default FormCreateOrder;
