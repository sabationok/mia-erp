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

export interface FormCreateOrderProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrder>;
}

export interface FormCreateOrderState extends Omit<IOrder, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({ onSubmit, ...props }) => {
  const { directory: workers } = useDirectoriesSelector(ApiDirType.WORKERS);
  const { directory: paymentsMethods } = useDirectoriesSelector(ApiDirType.METHODS_PAYMENT);

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
      <FlexBox flex={1} padding={'8px 0'} overflow={'auto'}>
        <FlexBox padding={'0 16px 8px'}>
          <CustomSelect
            {...registerSelect('manager', {
              options: managersList,
              label: 'Менеджер',
              placeholder: 'Оберіть відповідального менеджера',
            })}
          />

          {/*<CustomSelect*/}
          {/*  {...registerSelect('payments', {*/}
          {/*    options: paymentsMethods,*/}
          {/*    label: 'Менеджер',*/}
          {/*    placeholder: 'Оберіть відповідального менеджера',*/}
          {/*  })}*/}
          {/*/>*/}
        </FlexBox>

        <FlexBox>
          <FormAccordeonItem renderHeader={'Вміст'}></FormAccordeonItem>

          <FormAccordeonItem renderHeader={'Замовник'}>
            <InputLabel label={'Замовник'}>
              <TextareaPrimary placeholder={'Введіть інформацію про замовника'} {...register('customer')} />
            </InputLabel>
          </FormAccordeonItem>

          <FormAccordeonItem renderHeader={'Отримувач'}>
            <InputLabel label={'Отримувач'}>
              <TextareaPrimary placeholder={'Введіть інформацію про отримувача'} {...register('receiver')} />
            </InputLabel>
          </FormAccordeonItem>

          <FormAccordeonItem renderHeader={'Інформація про відвантаження'}>
            <InputLabel label={'Місце призначення'}>
              <TextareaPrimary placeholder={'Введіть інформацію про призначення'} {...register('destination')} />
            </InputLabel>
          </FormAccordeonItem>

          <FormAccordeonItem renderHeader={'Додаткова інформація'}>
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
        </FlexBox>
      </FlexBox>
    </ModalForm>
  );
};
export default FormCreateOrder;
