import { ModalFormProps } from '../../ModalForm';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { LangKeyEnum, t } from '../../../lang';
import React, { useState } from 'react';
import { useAppForm } from '../../../hooks';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import FlexBox from '../../atoms/FlexBox';
import { IDeliveryMethod, ServiceMethodBase } from '../../../types/integrations.types';
import { useTranslatedMethodsList } from '../../../hooks/useTranslatedMethodsList.hook';
import { usePaymentsSelector } from '../../../redux/selectors.store';
import { DisabledStates, IBaseKeys } from '../../../types/utils.types';
import { omit, pick } from 'lodash';
import { useAppDispatch } from '../../../redux/store.store';
import ModalBase from '../../atoms/Modal';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { updateDeliveryMethodThunk } from 'redux/deliveries/deliveries.thunks';
import { toReqData } from '../../../utils';
import { AccordionForm } from 'components/atoms/FormArea/AccordionForm';
import InputText from 'components/atoms/Inputs/InputText';
import InputLabel from 'components/atoms/Inputs/InputLabel';
import ButtonSwitch from 'components/atoms/ButtonSwitch';
import TagButtonsFilter from '../../atoms/TagButtonsFilter';
import LangButtonsGroup from 'components/atoms/LangButtonsGroup';

export interface FormDeliveryMethodProps extends Omit<ModalFormProps<any, any, IDeliveryMethod>, 'onSubmit'> {
  _id?: string;
  create?: boolean;
  edit?: boolean;
  onSubmit?: AppSubmitHandler<IDeliveryMethodFormData, { logAfterSubmit?: boolean }>;
}
export interface IDeliveryMethodFormData
  extends Omit<IDeliveryMethod, Exclude<IBaseKeys, '_id'> | 'service' | 'extService'> {}

const validation = yup.object().shape({
  // label: yup.string().max(100),
  disabledForClient: yup.boolean().optional(),
  description: yup.string().max(250).optional(),
} as Record<keyof ServiceMethodBase | string, any>);

const FormDeliveryMethod: React.FC<FormDeliveryMethodProps> = ({ onSubmit, defaultState, ...props }) => {
  // const submitOptions = useAfterSubmitOptions();

  const loaders = useLoaders<'main' | keyof IDeliveryMethodFormData>();
  const pmntMethods = useTranslatedMethodsList(usePaymentsSelector().methods, { withFullLabel: true });
  const dispatch = useAppDispatch();
  const [langKey, setLangKey] = useState<LangKeyEnum>(LangKeyEnum.ua);
  const formMethods = useAppForm<IDeliveryMethodFormData>({
    defaultValues: { ...omit(defaultState, ['isDefault', 'athor', 'owner', 'editor', 'parent', 'value', 'service']) },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const {
    formState: { errors },
    handleSubmit,
    register,
    formValues,
    setValue,
    getFieldState,
  } = formMethods;

  const registerSwitch = (name: keyof DisabledStates) => {
    return {
      name,
      value: formValues?.disabledFor?.[name],
      onChange: (v: boolean) => {
        setValue(`disabledFor.${name}`, v, { shouldTouch: true, shouldDirty: true });
      },
    };
  };

  const getOnValid = (areaName?: keyof IDeliveryMethodFormData) => (fData: IDeliveryMethodFormData) => {
    const pickPaths: (keyof IDeliveryMethodFormData)[] | undefined = areaName ? [areaName] : undefined;

    const omitPaths: (keyof IDeliveryMethodFormData | string)[] | undefined = !areaName
      ? ['cmsConfigs', 'invoicingPolicy', 'paymentPolicy', 'isDefault', 'owner', 'author', 'editor']
      : undefined;

    // if (defaultState?.isDefault) {
    //   omitPaths?.push('label', 'type');
    // }

    const reqData = pickPaths ? pick(fData, ['_id', ...pickPaths]) : omitPaths ? omit(fData, omitPaths) : fData;

    dispatch(
      updateDeliveryMethodThunk({
        onLoading: loaders.onLoading(areaName || 'main'),
        data: {
          _id: fData._id,
          data: toReqData({ _id: fData._id, ...reqData }),
        },
      })
    );
  };

  const registerFormArea = (
    areaName?: keyof IDeliveryMethodFormData
  ): {
    canSubmit?: boolean;
    isLoading?: boolean;
    onSubmit?: (ev: React.BaseSyntheticEvent) => void;
  } => {
    if (!areaName) {
      return {
        isLoading: loaders.isLoading.main,
        canSubmit: true,
        onSubmit: handleSubmit(getOnValid(areaName)),
      };
    }
    return {
      isLoading: loaders.isLoading?.[areaName],
      canSubmit: getFieldState(areaName).isDirty,
      onSubmit: handleSubmit(getOnValid(areaName)),
    };
  };

  return (
    <ModalBase
      fillHeight
      title={props.title}
      onClose={props.onClose}
      // isLoading={isLoading}
      // onSubmit={handleSubmit(onValid)}
      // isValid={isValid}
      // extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <AccordionForm label={t('Main info')} {...registerFormArea()}>
        <InputLabel
          label={t('label')}
          error={errors.label}
          // disabled={defaultState?.isDefault}
          required={!defaultState?.isDefault}
        >
          <InputText
            placeholder={t('insertLabel')}
            {...register('label')}
            // disabled={defaultState?.isDefault}
            required={!defaultState?.isDefault}
            autoFocus={!defaultState?.isDefault}
          />
        </InputLabel>

        <InputLabel label={t('Type')} disabled={defaultState?.isDefault}>
          <InputText placeholder={t('Type')} {...register('type.internal')} disabled={defaultState?.isDefault} />
        </InputLabel>

        <InputLabel label={t('Type external')} disabled={defaultState?.isDefault}>
          <InputText
            placeholder={t('Type external')}
            {...register('type.external')}
            disabled={defaultState?.isDefault}
          />
        </InputLabel>

        <InputLabel label={t('Disabled for all')} error={errors?.disabledFor?.all}>
          <ButtonSwitch {...registerSwitch('all')} />
        </InputLabel>

        <InputLabel label={t('Disabled for customer')} error={errors?.disabledFor?.customer}>
          <ButtonSwitch {...registerSwitch('customer')} />
        </InputLabel>
      </AccordionForm>

      <AccordionForm label={t('Invoicing')} {...registerFormArea('invoicingPolicy')}>
        <FlexBox fxDirection={'row'} gap={8}>
          <InputLabel
            label={t('Min cost for delivery')}
            error={getFieldState('invoicingPolicy.configs.minCost.delivery').error}
          >
            <InputText
              placeholder={'Min cost'}
              type={'number'}
              align={'center'}
              {...register('invoicingPolicy.configs.minCost.delivery', { valueAsNumber: true })}
            />
          </InputLabel>

          <InputLabel
            label={t('Min cost for return')}
            error={getFieldState('invoicingPolicy.configs.minCost.return').error}
          >
            <InputText
              placeholder={'Min cost'}
              type={'number'}
              align={'center'}
              {...register('invoicingPolicy.configs.minCost.return', { valueAsNumber: true })}
            />
          </InputLabel>
        </FlexBox>
      </AccordionForm>

      <AccordionForm label={t('Payment')}>
        <InputLabel label={t('Available methods')}>
          <TagButtonsFilter
            options={pmntMethods}
            numColumns={1}
            multiple
            // onChangeIds={opt => {
            //   setValue('paymentPolicy', isString(opt.value) ? [opt.value] : opt.value, {
            //     shouldDirty: true,
            //     shouldTouch: true,
            //   });
            // }}
          />
        </InputLabel>

        {/*<InputLabel*/}
        {/*  label={t('Min cost for return')}*/}
        {/*  direction={'row'}*/}
        {/*  error={getFieldState('invoicingPolicy.configs.minCost.return').error}*/}
        {/*>*/}
        {/*  <InputText*/}
        {/*    placeholder={'Min cost'}*/}
        {/*    type={'number'}*/}
        {/*    align={'center'}*/}
        {/*    {...register('paymentPolicy.configs.minCost.return', { valueAsNumber: true })}*/}
        {/*  />*/}
        {/*</InputLabel>*/}
      </AccordionForm>

      <AccordionForm label={t('Cms params')} {...registerFormArea('cmsConfigs')}>
        <InputLabel label={t('Custom key')} error={errors?.cmsConfigs?.key}>
          <InputText placeholder={'Key'} {...register('cmsConfigs.key')} />
        </InputLabel>

        {/*<InputLabel label={t('External reference')} error={errors?.cmsConfigs?.extRef}>*/}
        {/*  <InputText placeholder={'Reference'} {...register('cmsConfigs.extRef')} />*/}
        {/*</InputLabel>*/}

        <InputLabel label={t('Language key')} error={errors?.cmsConfigs?.key}>
          <LangButtonsGroup
            disabled
            onChange={key => {
              setLangKey(key);
            }}
            value={langKey}
          />
        </InputLabel>

        {langKey && (
          <InputLabel disabled label={t('Label by lang key')} error={errors?.cmsConfigs?.labels?.[langKey]}>
            <InputText disabled placeholder={'Label'} {...register(`cmsConfigs.labels.${langKey}`)} />
          </InputLabel>
        )}
      </AccordionForm>
    </ModalBase>
  );
};

export default FormDeliveryMethod;
