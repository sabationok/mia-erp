import {
  IPropertyDto,
  PropertyBaseEntity,
  PropertyLevelIsType,
  PropertyTypeEnum,
} from '../../../../types/offers/properties.types';
import { MaybeNull } from '../../../../types/utils.types';
import { AppSubmitHandler, useAppFormProvider } from '../../../../hooks/useAppForm.hook';
import { useLoadersProvider } from '../../../../Providers/Loaders/LoaderProvider';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../../redux/reduxTypes.types';
import { ObjectValues, toReqData } from '../../../../utils';
import { pick } from 'lodash';
import { AccordionForm } from '../../../atoms/FormArea/AccordionForm';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { LangKeyEnum, t } from '../../../../i18e';
import InputText from '../../../atoms/Inputs/InputText';
import LangButtonsGroup from '../../../atoms/LangButtonsGroup';
import React, { useState } from 'react';
import { FormCreatePropertyLoaderKey, IPropertyFormData } from '../../../Modals/CreatePropertyModal';
import FlexBox from '../../../atoms/FlexBox';
import ButtonIcon from '../../../atoms/ButtonIcon';

const recommendTypesOptions = ObjectValues(PropertyTypeEnum);
export const PropertyCmsParamsFormArea = (_: {
  levelIs?: PropertyLevelIsType;
  defaultState?: MaybeNull<Partial<PropertyBaseEntity>>;
  onSubmit?: AppSubmitHandler<Pick<IPropertyDto, 'cmsConfigs'>, { levelIs?: PropertyLevelIsType }>;
}) => {
  const loaders = useLoadersProvider<FormCreatePropertyLoaderKey>();
  const offersSrv = useAppServiceProvider().get(AppModuleName.offers);
  const form = useAppFormProvider<IPropertyFormData>();
  const [langKey, setLangKey] = useState(LangKeyEnum.ua);

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
        data: { data: { _id: formValues._id, data: toReqData(pick(data, ['cmsConfigs', '_id'])) } },
      });
    }

    // onSubmit && onSubmit(toReqData(pick(data, ['cmsConfigs'])), { levelIs });
  };
  return (
    <AccordionForm
      label={'Cms params'}
      expandable={true}
      canSubmit={!!form.formState.dirtyFields?.cmsConfigs}
      isLoading={loaders.isLoading?.update}
      isOpen={Object.values(formValues?.cmsConfigs ?? {}).some(el => !!el)}
      onSubmit={handleSubmit(onValid)}
    >
      <InputLabel label={t('Cms key')} error={errors?.cmsConfigs?.key}>
        <InputText placeholder={'Key'} {...register('cmsConfigs.key', { maxLength: 32, minLength: 1 })} />
      </InputLabel>

      <InputLabel label={t('Type')}>
        <InputText placeholder={t('type')} {...register('cmsConfigs.type', { maxLength: 32, minLength: 1 })} />
      </InputLabel>

      <FlexBox padding={'8px'} overflow={'auto'} fxDirection={'row'} flexWrap={'wrap'} gap={6}>
        {recommendTypesOptions.map(key => {
          const isActive = formValues.cmsConfigs?.type === key;
          return (
            <ButtonIcon
              key={key}
              variant={isActive ? 'filledSmall' : 'outlinedSmall'}
              onClick={() => {
                form.setValue('cmsConfigs.type', key, { shouldTouch: true, shouldDirty: true, shouldValidate: true });
              }}
            >
              {key}
            </ButtonIcon>
          );
        })}
      </FlexBox>

      <InputLabel label={t('Language key')}>
        <LangButtonsGroup
          disabled
          onChange={v => {
            setLangKey(v);
          }}
        />
      </InputLabel>

      <InputLabel disabled label={t('Label by lang key')} error={errors?.cmsConfigs?.labels?.[langKey]}>
        <InputText
          placeholder={'Label'}
          {...register(`cmsConfigs.labels.${langKey}`, { maxLength: 128, minLength: 1 })}
        />
      </InputLabel>

      <InputLabel label={t('Description')}>
        <InputText
          placeholder={t('description')}
          {...register('cmsConfigs.description', { maxLength: 128, minLength: 1 })}
        />
      </InputLabel>

      {/*<InputLabel disabled label={t('Colors')}>*/}
      {/*  <InputText placeholder={t('Colors')} type={'color'} {...register('cmsConfigs.colors')} />*/}
      {/*</InputLabel>*/}
    </AccordionForm>
  );
};
