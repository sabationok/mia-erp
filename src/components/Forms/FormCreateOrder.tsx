import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { IOrder, IOrderForReq } from '../../redux/orders/orders.types';
import { useAppForm } from '../../hooks';
import InputLabel from '../atoms/Inputs/InputLabel';
import TextareaPrimary from '../atoms/Inputs/TextareaPrimary';
import { useMemo } from 'react';
import CustomSelect from '../atoms/Inputs/CustomSelect';
import { useDirectoriesSelector } from '../../redux/selectors.store';
import { ApiDirType } from '../../redux/APP_CONFIGS';
import { ContractorsTypesEnum } from '../../redux/contractors/contractors.types';

export interface FormCreateOrderProps extends Omit<ModalFormProps, 'onSubmit' | 'onSelect'> {
  onSubmit?: AppSubmitHandler<IOrderForReq>;
}

export interface FormCreateOrderState extends Omit<IOrder, '_id' | 'createdAt' | 'updatedAt' | 'deletedAt'> {}

const FormCreateOrder: React.FC<FormCreateOrderProps> = ({ onSubmit, ...props }) => {
  const { directory } = useDirectoriesSelector(ApiDirType.CONTRACTORS);

  const managersList = useMemo(() => directory.filter(el => el?.type === ContractorsTypesEnum.MANAGER), [directory]);
  const shipmentTypesList = useMemo(
    () => directory.filter(el => el?.type === ContractorsTypesEnum.SHIPMENT_TYPES),
    [directory]
  );
  const {
    formState: { errors, isValid },
    register,
    registerSelect,
    handleSubmit,
  } = useAppForm<FormCreateOrderState>();

  const renderManagerSelect = useMemo(() => {
    return (
      <CustomSelect
        {...registerSelect('manager', {
          options: managersList,
          label: 'Менеджер',
          placeholder: 'Оберіть відповідального менеджера',
        })}
      />
    );
  }, [managersList, registerSelect]);

  const renderTransporterSelect = useMemo(() => {
    return (
      <CustomSelect
        {...registerSelect('manager', {
          options: shipmentTypesList,
          label: 'Спосіб доставки',
          placeholder: 'Оберіть спосіб відвантаження',
        })}
      />
    );
  }, [registerSelect, shipmentTypesList]);
  const onValid = (data?: FormCreateOrderState) => {
    console.log('FormCreateOrder');
    console.log(data);
  };
  return (
    <ModalForm fillHeight {...props} isValid={isValid} onSubmit={handleSubmit(onValid)}>
      <FlexBox flex={1} gap={8} padding={'8px 16px'} overflow={'auto'}>
        {renderManagerSelect}

        <InputLabel label={'Замовник'} direction={'vertical'}>
          <TextareaPrimary placeholder={'Введіть інформацію про замовника'} {...register('customer')} />
        </InputLabel>

        <InputLabel label={'Отримувач'} direction={'vertical'}>
          <TextareaPrimary placeholder={'Введіть інформацію про отримувача'} {...register('receiver')} />
        </InputLabel>

        <InputLabel label={'Місце призначення'} direction={'vertical'}>
          <TextareaPrimary placeholder={'Введіть інформацію відвантаження'} {...register('destination')} />
        </InputLabel>

        {renderTransporterSelect}

        <InputLabel label={'Коментар'} direction={'vertical'}>
          <TextareaPrimary placeholder={'Введіть коментар до замовлення'} {...register('comment')} />
        </InputLabel>
        <InputLabel label={'Службовий коментар'} direction={'vertical'}>
          <TextareaPrimary
            placeholder={'Цей коментар будть бачити лише працівники компанії'}
            {...register('innerComment')}
          />
        </InputLabel>
      </FlexBox>
    </ModalForm>
  );
};
export default FormCreateOrder;
