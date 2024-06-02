import ModalForm, { ModalFormProps } from 'components/ModalForm';

import * as yup from 'yup';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../components/FormAfterSubmitOptions';
import { useAppForm } from '../../../hooks';
import { BankAccountDestinationType, BankAccountFormData } from '../../../types/finances/bank-accounts.types';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormInputs } from '../components/atoms';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import { enumToFilterOptions, toReqData } from '../../../utils';
import { t } from '../../../lang';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import styled from 'styled-components';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { createApiCall, TransactionsApi } from '../../../api';
import { ToastService } from '../../../services';

export interface FormCreateBankAccountProps extends Omit<ModalFormProps<any, BankAccountFormData>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<BankAccountFormData>;
}

export const BankAccountTypeFilterOptions = enumToFilterOptions(BankAccountDestinationType);

const validation = yup.object().shape({
  label: yup.string().required(),
  description: yup.string().max(250).optional(),
});

const FormCreateBankAccount: React.FC<FormCreateBankAccountProps> = ({ defaultState, onSubmit, ...props }) => {
  const submitOptions = useAfterSubmitOptions();

  const {
    formState: { errors, isValid },
    register,
    handleSubmit,
    registerSelect,
  } = useAppForm<BankAccountFormData>({
    defaultValues: { ...defaultState },
    resolver: yupResolver(validation),
    reValidateMode: 'onChange',
  });

  const onValid = (fData: BankAccountFormData) => {
    console.log('FormCreateBankAccount on valid', { defaultState, fData });

    createApiCall(
      {
        data: { data: toReqData(fData), params: { withMethod: true } },
        onSuccess: data => {
          props?.onClose && props?.onClose();
          ToastService.success(`${data.label} created`);
        },
      },
      TransactionsApi.createBankAccount
    );
    //
    // onSubmit &&
    //   onSubmit(fData, {
    //     ...submitOptions.state,
    //   });
  };
  return (
    <ModalForm
      {...props}
      onSubmit={handleSubmit(onValid)}
      isValid={isValid}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FormInputs>
        <InputLabel label={t('label')} error={errors.label} required>
          <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
        </InputLabel>

        <InputLabel label={t('IBAN')} error={errors.iban} required>
          <InputText placeholder={t('IBAN')} {...register('iban')} required />
        </InputLabel>

        <InputLabel label={t('Account holder')} error={errors.holder}>
          <InputText placeholder={t('Holder')} {...register('holder')} />
        </InputLabel>

        <InputLabel label={t('Tax ID')} error={errors.taxId}>
          <InputText placeholder={t('Tax ID')} {...register('taxId')} />
        </InputLabel>

        <CustomSelect
          {...registerSelect('type', { options: BankAccountTypeFilterOptions })}
          {...{
            label: t('Select type'),
            placeholder: t('Type'),
          }}
        />

        <BorderedBox padding={'8px 0'}>
          <Text $size={12} $weight={600} $padding={'8px'}>
            {t('Bank details')}
          </Text>

          <InputLabel label={t('label')} error={errors.bank?.label}>
            <InputText placeholder={t('insertLabel')} {...register('bank.label')} />
          </InputLabel>

          <InputLabel label={t('Country')} error={errors.bank?.label}>
            <InputText placeholder={t('Country')} {...register('bank.country')} />
          </InputLabel>

          <InputLabel label={t('Tax ID')} error={errors.bank?.taxId}>
            <InputText placeholder={t('Tax ID')} {...register('bank.taxId')} />
          </InputLabel>
        </BorderedBox>
      </FormInputs>
    </ModalForm>
  );
};

const BorderedBox = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
`;

export default FormCreateBankAccount;
