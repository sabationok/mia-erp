import { PropertyBaseEntity, PropertyLevelIsType } from '../../../../types/offers/properties.types';
import { useLoadersProvider } from '../../../../Providers/Loaders/LoaderProvider';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../../redux/reduxTypes.types';
import { useAppFormProvider } from '../../../../hooks/useAppForm.hook';
import { toReqData } from '../../../../utils';
import { omit } from 'lodash';
import { AccordionForm } from '../../../atoms/FormArea/AccordionForm';
import FlexBox from '../../../atoms/FlexBox';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { t } from '../../../../i18e';
import InputText from '../../../atoms/Inputs/InputText';
import ButtonSwitch from '../../../atoms/ButtonSwitch';
import React from 'react';
import { FormCreatePropertyLoaderKey, IPropertyFormData } from '../../../Modals/CreatePropertyModal';

export const PropertyInfoFormArea = ({
  parentLevelIs,
  currentLevelIs,
  updateId,
  parent,
}: {
  parentLevelIs?: PropertyLevelIsType;
  currentLevelIs?: PropertyLevelIsType;
  updateId?: string;
  parent?: PropertyBaseEntity;
}) => {
  const loaders = useLoadersProvider<FormCreatePropertyLoaderKey, { currentId: string }>();
  const offersSrv = useAppServiceProvider().get(AppModuleName.offers);
  const form = useAppFormProvider<IPropertyFormData>();

  const {
    formState: { errors },
    register,
    handleSubmit,
    formValues,
    setValue,
  } = form;

  const onValid = (data: IPropertyFormData) => {
    if (updateId) {
      offersSrv.updatePropertyById({
        data: { data: { _id: updateId, data: toReqData(omit(data, ['cmsConfigs', '_id'])) } },
        onLoading: loaders.onLoading('update'),
        onSuccess: ({ data }) => {
          loaders.setData('currentId', data._id);
        },
      });
    } else {
      offersSrv.createProperty({
        onLoading: loaders.onLoading('create'),
        data: {
          data: { data: toReqData(omit(data, ['cmsConfigs'])) },
        },
        onSuccess: ({ data }) => {
          loaders.setData('currentId', data._id);
        },
      });
    }
  };
  const selectableHandler = (checked: boolean) => {
    setValue('isSelectable', checked);
  };

  return (
    <AccordionForm
      isLoading={loaders.hasLoading}
      label={'Main info'}
      expandable={false}
      isOpen={true}
      hasOnSubmit
      onSubmit={handleSubmit(onValid)}
    >
      <FlexBox fxDirection={'row'} gap={16}>
        <InputLabel label={t('type')} disabled>
          <InputText placeholder={t('type')} {...register('type')} disabled />
        </InputLabel>

        <InputLabel label={t('Динамічна')} disabled>
          <InputText placeholder={t('type')} value={formValues.isSelectable ? 'Так' : 'Ні'} disabled />
        </InputLabel>
      </FlexBox>

      {parent && (
        <InputLabel label={t(parentLevelIs?.group ? 'group' : 'property')} disabled>
          <InputText
            placeholder={t(parentLevelIs?.group ? 'group' : 'property')}
            defaultValue={parent?.label ?? ''}
            disabled
          />
        </InputLabel>
      )}

      <InputLabel label={t('label')} error={errors.label} required>
        <InputText placeholder={t('insertLabel')} {...register('label')} autoFocus required />
      </InputLabel>

      {currentLevelIs?.prop && formValues?._id && (
        <InputLabel label={'Доступно для формування варіацій'} error={errors.isSelectable}>
          <ButtonSwitch name={'isSelectable'} value={formValues?.isSelectable} onChange={selectableHandler} />
        </InputLabel>
      )}
    </AccordionForm>
  );
};
export default PropertyInfoFormArea;
