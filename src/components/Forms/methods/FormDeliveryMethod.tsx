import ModalForm, { ModalFormProps } from '../../ModalForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { LangKeyEnum, t } from '../../../lang';
import React, { useState } from 'react';
import { useAppForm } from '../../../hooks';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../components/FormAfterSubmitOptions';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import FlexBox from '../../atoms/FlexBox';
import {
  ExtServiceMethodBase,
  IDeliveryMethod,
  IInvoicingMethod,
} from '../../../redux/integrations/integrations.types';
import ButtonSwitch from '../../atoms/ButtonSwitch';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { useInvoicesSelector } from '../../../redux/selectors.store';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { Text } from '../../atoms/Text';
import InputText from '../../atoms/Inputs/InputText';
import { IBaseKeys } from '../../../redux/global.types';
import ButtonsGroup from '../../atoms/ButtonsGroup';
import { enumToFilterOptions } from '../../../utils/fabrics';

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
} as Record<keyof ExtServiceMethodBase | string, any>);

const LangButtonsGroup = ({ onChange }: { onChange?: (value: LangKeyEnum) => void }) => {
  return (
    <ButtonsGroup
      disabled
      options={enumToFilterOptions(LangKeyEnum)}
      onSelect={info => onChange && onChange(info.value)}
    />
  );
};

const FormDeliveryMethod: React.FC<FormDeliveryMethodProps> = ({ onSubmit, defaultState, ...props }) => {
  const submitOptions = useAfterSubmitOptions();
  const [isLoading, setIsLoading] = useState(false);
  const invoicingMethods = useTranslatedMethodsList(useInvoicesSelector().methods, { withFullLabel: true });

  const formMethods = useAppForm<IDeliveryMethodFormData>({
    defaultValues: { ...defaultState },
    resolver: yupResolver(validation),
    reValidateMode: 'onChange',
  });
  const {
    formState: { errors, isValid },
    handleSubmit,
    registerSelect,
    register,
    reset,
    formValues,
  } = formMethods;

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
          if (submitOptions.state.clear) {
          }
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
            {t('Invoicing configs')}
          </Text>
        </BorderedBox>

        <CustomSelect
          {...registerSelect('invoicing.method', {
            options: invoicingMethods,
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
