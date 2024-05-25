import { IPropertyDto, PropertyBaseEntity, PropertyLevelIsType } from '../../../../types/offers/properties.types';
import { MaybeNull } from '../../../../types/utils.types';
import { AppSubmitHandler, useAppFormProvider } from '../../../../hooks/useAppForm.hook';
import { useLoadersProvider } from '../../../../Providers/Loaders/LoaderProvider';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../../redux/reduxTypes.types';
import { toReqData } from '../../../../utils';
import { pick } from 'lodash';
import { AccordionForm } from '../../FormArea/AccordionForm';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { t } from '../../../../lang';
import InputText from '../../../atoms/Inputs/InputText';
import LangButtonsGroup from '../../../atoms/LangButtonsGroup';
import React from 'react';
import { FormCreatePropertyLoaderKey, IPropertyFormData } from './FormCreateProperty';

export const PropertyCmsParamsFormArea = (_: {
  levelIs?: PropertyLevelIsType;
  defaultState?: MaybeNull<Partial<PropertyBaseEntity>>;
  onSubmit?: AppSubmitHandler<Pick<IPropertyDto, 'cmsConfigs'>, { levelIs?: PropertyLevelIsType }>;
}) => {
  const loaders = useLoadersProvider<FormCreatePropertyLoaderKey>();
  const offersSrv = useAppServiceProvider().get(AppModuleName.offers);
  const form = useAppFormProvider<IPropertyFormData>();

  const {
    formState: { errors },
    register,
    handleSubmit,
    formValues,
  } = form;

  const onValid = (data: IPropertyFormData) => {
    if (formValues._id) {
      offersSrv.updatePropertyById({
        onLoading: loaders.onLoading('update'),
        onSuccess: loaders.onSuccess('update', d => loaders.setData('current', d)),
        data: { _id: formValues._id, data: toReqData(pick(data, ['cmsConfigs', '_id'])) },
      });
    }

    // onSubmit && onSubmit(toReqData(pick(data, ['cmsConfigs'])), { levelIs });
  };
  return (
    <AccordionForm
      label={'Cms params'}
      expandable={true}
      isOpen={Object.values(formValues?.cmsConfigs ?? {}).some(el => !!el)}
      onSubmit={handleSubmit(onValid)}
    >
      <InputLabel label={t('Cms key')} error={errors?.cmsConfigs?.key}>
        <InputText placeholder={'Key'} {...register('cmsConfigs.key')} />
      </InputLabel>

      <InputLabel label={t('Language key')}>
        <LangButtonsGroup disabled />
      </InputLabel>

      <InputLabel disabled label={t('Label by lang key')} error={errors?.cmsConfigs?.labels?.ua}>
        <InputText placeholder={'Label'} {...register('cmsConfigs.labels.ua')} />
      </InputLabel>

      <InputLabel label={t('Description')}>
        <InputText placeholder={t('description')} {...register('cmsConfigs.description')} />
      </InputLabel>

      {/*<InputLabel disabled label={t('Colors')}>*/}
      {/*  <InputText placeholder={t('Colors')} type={'color'} {...register('cmsConfigs.colors')} />*/}
      {/*</InputLabel>*/}
    </AccordionForm>
  );
};
