import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { ICustomerFormData } from '../../redux/customers/customers.types';
import ModalForm, { ModalFormProps } from '../ModalForm';
import { t } from '../../lang';
import styled from 'styled-components';
import FlexBox from '../atoms/FlexBox';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import ButtonGroup from '../atoms/ButtonGroup';
import { businessSubjectTypeFilterOptions } from '../../data/companies.data';
import { createDataForReq } from '../../utils/dataTransform';
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { useForm } from 'react-hook-form';

export interface FormCreateCustomerProps extends Omit<ModalFormProps<any, any, ICustomerFormData>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<ICustomerFormData>;
}

const FormCreateCustomer: React.FC<FormCreateCustomerProps> = ({ onSubmit, onClose, ...p }) => {
  const { register, setValue, handleSubmit, ...f } = useForm<ICustomerFormData>();
  const service = useAppServiceProvider()[ServiceName.customers];
  const onValid = (fData: FormCreateCustomerProps) => {
    const reqData = createDataForReq(fData);

    service.create({
      data: { data: reqData },
      onSuccess: () => {
        onClose && onClose();
      },
    });
  };

  return (
    <ModalForm title={t('Create customer')} {...p} onSubmit={handleSubmit(onValid)}>
      <Inputs padding={'0 8px 8px'}>
        <InputLabel label={t('type')}>
          <ButtonGroup
            options={businessSubjectTypeFilterOptions}
            onSelect={(_o, v) => {
              setValue('type', v);
            }}
          />
        </InputLabel>

        <InputLabel label={t('name')}>
          <InputText placeholder={t('name')} {...register('name')} />
        </InputLabel>

        <InputLabel label={t('secondName')}>
          <InputText placeholder={t('secondName')} {...register('secondName')} />
        </InputLabel>

        <InputLabel label={t('email')}>
          <InputText placeholder={t('email')} type={'email'} {...register('email', { required: true })} />
        </InputLabel>

        <InputLabel label={t('phone')}>
          <InputText placeholder={t('phone')} {...register('phone')} />
        </InputLabel>

        <InputLabel label={t('Birth date')}>
          <InputText placeholder={t('Birth date')} {...register('birthDate')} type={'datetime-local'} />
        </InputLabel>
      </Inputs>
    </ModalForm>
  );
};
const Inputs = styled(FlexBox)``;
export default FormCreateCustomer;
