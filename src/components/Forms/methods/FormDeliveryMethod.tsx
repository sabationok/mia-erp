import ModalForm, { ModalFormProps } from '../../ModalForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import React, { useState } from 'react';
import { useAppForm } from '../../../hooks';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import FlexBox from '../../atoms/FlexBox';
import { IDeliveryMethod, IInvoicingMethod, ServiceMethodBase } from '../../../types/integrations.types';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useInvoicesSelector } from '../../../redux/selectors.store';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { Text } from '../../atoms/Text';
import InputText from '../../atoms/Inputs/InputText';
import { IBaseKeys } from '../../../redux/app-redux.types';
import LangButtonsGroup from '../../atoms/LangButtonsGroup';
import { DisabledStates } from '../../../types/utils.types';

export interface FormDeliveryMethodProps extends Omit<ModalFormProps<any, any, IDeliveryMethod>, 'onSubmit'> {
  _id?: string;
  create?: boolean;
  edit?: boolean;
  onSubmit?: AppSubmitHandler<IDeliveryMethodFormData, { logAfterSubmit?: boolean }>;
}

export interface IDeliveryMethodFormData
  extends Omit<IDeliveryMethod, IBaseKeys | 'service' | 'extService' | 'invoicing'> {
  invoicing?: {
    method: Pick<IInvoicingMethod, '_id' | 'type' | 'label'>;
    minCost?: {
      delivery?: number;
      return?: number;
    };
  };
}

const validation = yup.object().shape({
  // label: yup.string().max(100),
  disabledForClient: yup.boolean().optional(),
  description: yup.string().max(250).optional(),
} as Record<keyof ServiceMethodBase | string, any>);

const FormDeliveryMethod: React.FC<FormDeliveryMethodProps> = ({ onSubmit, defaultState, ...props }) => {
  const submitOptions = useAfterSubmitOptions();
  const [isLoading, setIsLoading] = useState(false);
  const invMethods = useTranslatedMethodsList(useInvoicesSelector().methods, { withFullLabel: true });

  const formMethods = useAppForm<IDeliveryMethodFormData>({
    defaultValues: { ...defaultState },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const {
    formState: { errors, isValid },
    handleSubmit,
    registerSelect,
    register,
    reset,
    formValues,
    setValue,
  } = formMethods;

  const registerSwitch = (name: keyof DisabledStates) => {
    return {
      name,
      value: formValues?.disabledFor ? !!formValues?.disabledFor[name] : undefined,
      onchange: (v: boolean) => {
        setValue(`disabledFor.${name}`, v, { shouldTouch: true });
      },
    };
  };

  // useEffect(() => {
  //   console.log(formValues);
  // }, [formValues]);
  const onValid = (fData: IDeliveryMethodFormData) => {
    onSubmit &&
      onSubmit(fData, {
        ...submitOptions.state,
        onLoading: setIsLoading,
        onError: () => {
          reset();
        },
      });
  };

  return (
    <ModalForm
      {...props}
      fillHeight
      isLoading={isLoading}
      onSubmit={handleSubmit(onValid)}
      isValid={isValid}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <Inputs>
        {defaultState?.isDefault && (
          <>
            <InputLabel
              label={t('label')}
              error={errors.label}
              disabled={formValues.isDefault}
              required={!formValues.isDefault}
            >
              <InputText
                placeholder={t('insertLabel')}
                {...register('label')}
                disabled={formValues.isDefault}
                required={!formValues.isDefault}
                autoFocus={!formValues.isDefault}
              />
            </InputLabel>

            <InputLabel
              label={t('Type')}
              error={errors.label}
              disabled={formValues.isDefault}
              required={!formValues.isDefault}
            >
              <InputText
                placeholder={t('Type')}
                {...register('type.internal')}
                disabled={formValues.isDefault}
                required={!formValues.isDefault}
              />
            </InputLabel>
          </>
        )}

        <InputLabel label={t('Disabled for all')} error={errors?.disabledFor?.all}>
          <ButtonSwitch {...registerSwitch('all')} />
        </InputLabel>

        <InputLabel label={t('Disabled for customer')} error={errors?.disabledFor?.customer}>
          <ButtonSwitch {...registerSwitch('customer')} />
        </InputLabel>

        <BorderedBox>
          <Text $size={13} $weight={600}>
            {t('Invoicing configs')}
          </Text>
        </BorderedBox>

        <CustomSelect
          {...registerSelect('invoicing.method', {
            options: invMethods,
            placeholder: t('Select method'),
            label: t('Invoicing method'),
          })}
        />

        <FlexBox fxDirection={'row'} gap={8}>
          <InputLabel label={t('Min cost for delivery')} error={errors?.invoicing?.minCost?.delivery}>
            <InputText
              placeholder={'Min cost'}
              type={'number'}
              align={'center'}
              {...register('invoicing.minCost.delivery', { valueAsNumber: true })}
            />
          </InputLabel>

          <InputLabel label={t('Min cost for return')} error={errors?.invoicing?.minCost?.return}>
            <InputText
              placeholder={'Min cost'}
              type={'number'}
              align={'center'}
              {...register('invoicing.minCost.return', { valueAsNumber: true })}
            />
          </InputLabel>
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
export default FormDeliveryMethod;
