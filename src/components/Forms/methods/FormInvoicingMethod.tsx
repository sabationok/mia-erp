import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../components/FormAfterSubmitOptions';
import React, { useState } from 'react';
import { useAppForm } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import InputText from '../../atoms/Inputs/InputText';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import { Text } from '../../atoms/Text';
import FlexBox from '../../atoms/FlexBox';
import LangButtonsGroup from '../../atoms/LangButtonsGroup';
import { IInvoicingMethod, ServiceMethodBase } from '../../../types/integrations.types';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { IBaseKeys } from '../../../redux/global.types';
import * as yup from 'yup';
import styled from 'styled-components';
import { useTransactionsSelector } from '../../../redux/selectors.store';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';

export interface FormInvoicingMethodProps {}

export interface FormInvoicingMethodProps extends Omit<ModalFormProps<any, any, IInvoicingMethod>, 'onSubmit'> {
  _id?: string;
  create?: boolean;
  edit?: boolean;
  onSubmit?: AppSubmitHandler<IInvoicingMethodFormData, { logAfterSubmit?: boolean }>;
}

export interface IInvoicingMethodFormData extends Omit<IInvoicingMethod, IBaseKeys | 'service' | 'extService'> {}

const validation = yup.object().shape({
  // label: yup.string().max(100),
  disabledForClient: yup.boolean().optional(),
  description: yup.string().max(250).optional(),
} as Record<keyof ServiceMethodBase | string, any>);

const FormInvoicingMethod: React.FC<FormInvoicingMethodProps> = ({ onSubmit, defaultState, ...props }) => {
  const submitOptions = useAfterSubmitOptions();
  const bankAccounts = useTransactionsSelector().bankAccounts;
  const [isLoading, setIsLoading] = useState(false);

  const formMethods = useAppForm<IInvoicingMethodFormData>({
    defaultValues: { ...defaultState },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const {
    formState: { errors, isValid },
    handleSubmit,
    register,
    registerSelect,
    reset,
  } = formMethods;

  // useEffect(() => {
  //   console.log(formValues);
  // }, [formValues]);
  const onValid = (fData: IInvoicingMethodFormData) => {
    onSubmit &&
      onSubmit(fData, {
        ...submitOptions.state,
        onLoading: setIsLoading,
        onSuccess: () => {
          if (submitOptions.state.clear) {
            reset({});
          }
        },
      });
  };

  return (
    <ModalForm
      title={defaultState?._id ? t('Update invoicing method') : t('Create invoicing method')}
      {...props}
      fillHeight
      isLoading={isLoading}
      onSubmit={handleSubmit(onValid)}
      isValid={isValid}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <Inputs>
        {!defaultState?.isDefault && (
          <>
            <InputLabel label={t('label')} error={errors.label} required>
              <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
            </InputLabel>

            <InputLabel label={t('Type')} error={errors.label} required>
              <InputText placeholder={t('Type')} {...register('type')} required />
            </InputLabel>
          </>
        )}

        <InputLabel label={t('Disabled')} error={errors.disabled}>
          <ButtonSwitch />
        </InputLabel>

        <InputLabel label={t('Disabled for client')} error={errors.disabledForClient}>
          <ButtonSwitch />
        </InputLabel>

        <BorderedBox>
          <Text $size={13} $weight={600}>
            {t('Invoicing policy')}
          </Text>
        </BorderedBox>

        <CustomSelect
          {...registerSelect('bankAccount', {
            label: t('Recipient bank account'),
            placeholder: t('Select recipient bank account'),
          })}
          options={bankAccounts}
        />

        <FlexBox fxDirection={'row'} gap={8}>
          {/*<InputLabel label={t('Min cost for delivery')} error={errors?.invoicing?.minCost?.delivery}>*/}
          {/*  <InputText*/}
          {/*    placeholder={'Min cost'}*/}
          {/*    type={'number'}*/}
          {/*    align={'center'}*/}
          {/*    {...register('invoicing.minCost.delivery', { valueAsNumber: true })}*/}
          {/*  />*/}
          {/*</InputLabel>*/}

          {/*<InputLabel label={t('Min cost for return')} error={errors?.invoicing?.minCost?.return}>*/}
          {/*  <InputText*/}
          {/*    placeholder={'Min cost'}*/}
          {/*    type={'number'}*/}
          {/*    align={'center'}*/}
          {/*    {...register('invoicing.minCost.return', { valueAsNumber: true })}*/}
          {/*  />*/}
          {/*</InputLabel>*/}
        </FlexBox>

        <BorderedBox>
          <Text $size={13} $weight={600}>
            {t('Cms configs')}
          </Text>
        </BorderedBox>

        <InputLabel label={t('Cms key')} error={errors?.cmsConfigs?.key}>
          <InputText placeholder={'Key'} {...register('cmsConfigs.key')} />
        </InputLabel>

        <InputLabel label={t('Language key')} error={errors?.cmsConfigs?.key}>
          <LangButtonsGroup />
        </InputLabel>

        <InputLabel label={t('Label by lang key')} error={errors?.cmsConfigs?.labels?.ua}>
          <InputText placeholder={'Label'} {...register('cmsConfigs.labels.ua')} />
        </InputLabel>
      </Inputs>
    </ModalForm>
  );
};
const Inputs = styled(FlexBox)`
  padding: 0 8px 8px;

  background-color: inherit;
`;

const BorderedBox = styled(FlexBox)`
  padding: 8px;

  margin: 8px 0 0;
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
  border-top: 1px solid ${p => p.theme.modalBorderColor};
`;
export default FormInvoicingMethod;
