import {
  CreatePropertyDto,
  PropertyBaseEntity,
  PropertyCmsTypeEnum,
  PropertyFormData,
  PropertyLevelIsType,
  UpdatePropertyDto,
} from '../../../../types/offers';
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
import { useState } from 'react';
import { FormCreatePropertyLoaderKey } from '../../../Modals/CreatePropertyModal';
import FlexBox from '../../../atoms/FlexBox';
import ButtonIcon from '../../../atoms/ButtonIcon';

const propCmsTypesOptions = ObjectValues(PropertyCmsTypeEnum);
export const PropertyCmsParamsFormArea = (_: {
  levelIs?: PropertyLevelIsType;
  defaultState?: MaybeNull<Partial<PropertyBaseEntity>>;
  onSubmit?: AppSubmitHandler<Pick<CreatePropertyDto, 'cmsParams'>, { levelIs?: PropertyLevelIsType }>;
}) => {
  const loaders = useLoadersProvider<FormCreatePropertyLoaderKey>();
  const offersSrv = useAppServiceProvider().get(AppModuleName.offers);
  const form = useAppFormProvider<PropertyFormData>();
  const [langKey, setLangKey] = useState(LangKeyEnum.ua);

  const {
    formState: { errors },
    register,
    handleSubmit,
    formValues,
  } = form;

  const onValid = (data: PropertyFormData) => {
    if (formValues._id) {
      offersSrv.properties?.update({
        onLoading: loaders.onLoading('update'),
        onSuccess: loaders.onSuccess('update'),
        data: { data: toReqData(pick(data, ['cmsParams', '_id'])) as UpdatePropertyDto },
      });
    }

    // onSubmit && onSubmit(toReqData(pick(data, ['cmsParams'])), { levelIs });
  };
  return (
    <AccordionForm
      label={'Cms params'}
      expandable={true}
      canSubmit={!!form.formState.dirtyFields?.cmsParams}
      isLoading={loaders.isLoading?.update}
      isOpen={Object.values(formValues?.cmsParams ?? {}).some(el => !!el)}
      onSubmit={handleSubmit(onValid)}
    >
      <InputLabel label={t('Cms key')} $error={errors?.cmsParams?.key}>
        <InputText placeholder={'Key'} {...register('cmsParams.key', { maxLength: 32, minLength: 1 })} />
      </InputLabel>

      <InputLabel label={t('Type')}>
        <InputText placeholder={t('type')} {...register('cmsParams.type', { maxLength: 32, minLength: 1 })} />
      </InputLabel>

      <FlexBox padding={'8px'} overflow={'auto'} fxDirection={'row'} flexWrap={'wrap'} gap={6}>
        {propCmsTypesOptions.map(key => {
          const isActive = formValues.cmsParams?.type === key;
          return (
            <ButtonIcon
              key={key}
              variant={isActive ? 'filledSmall' : 'outlinedSmall'}
              onClick={() => {
                form.setValue('cmsParams.type', key, { shouldTouch: true, shouldDirty: true, shouldValidate: true });
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

      <InputLabel disabled label={t('Label by lang key')} $error={errors?.cmsParams?.label?.base?.[langKey]}>
        <InputText
          placeholder={'Label'}
          {...register(`cmsParams.label.base.${langKey}`, { maxLength: 225, minLength: 1 })}
        />
      </InputLabel>

      <InputLabel label={t('Description')} $error={errors?.cmsParams?.label?.base?.[langKey]}>
        <InputText
          placeholder={t('description')}
          {...register(`cmsParams.extra.description.${langKey}`, { maxLength: 500, minLength: 1 })}
        />
      </InputLabel>

      {/*<InputLabel disabled label={t('Colors')}>*/}
      {/*  <InputText placeholder={t('Colors')} type={'color'} {...register('cmsParams.colors')} />*/}
      {/*</InputLabel>*/}
    </AccordionForm>
  );
};
