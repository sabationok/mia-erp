import { ModalFormProps } from '../../../ModalForm';
import { AppFormProvider, useAppFormProvider } from '../../../../hooks/useAppForm.hook';
import { OfferTypeEnum } from '../../../../types/offers/offers.types';
import FlexBox from '../../../atoms/FlexBox';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { t } from '../../../../lang';
import InputText from '../../../atoms/Inputs/InputText';
import { useAppForm } from '../../../../hooks';
import { PropertyBaseEntity, PropertyFormData, PropertyLevelIsType } from '../../../../types/offers/properties.types';
import React, { useEffect } from 'react';
import { AccordionForm } from '../../FormArea/AccordionForm';
import { getIdRef, toReqData } from '../../../../utils';
import ModalBase from '../../../atoms/Modal';
import { omit } from 'lodash';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useLoaders } from '../../../../Providers/Loaders/useLoaders.hook';
import { useProductsSelector } from '../../../../redux/selectors.store';
import { LoadersProvider, useLoadersProvider } from '../../../../Providers/Loaders/LoaderProvider';
import { AppModuleName } from '../../../../redux/reduxTypes.types';
import { PropertyCmsParamsFormArea } from './PropertyCmsParamsFormArea';
import ButtonSwitch from '../../../atoms/ButtonSwitch';

export interface FormCreatePropertyProps
  extends Omit<ModalFormProps<OfferTypeEnum, any, PropertyBaseEntity>, 'onSubmit'> {
  create?: boolean;
  parent?: PropertyBaseEntity;
  edit?: boolean;
  updateId?: string;
  parentLevelIs?: PropertyLevelIsType;
  currentLevelIs?: PropertyLevelIsType;
}

export interface IPropertyFormData extends PropertyFormData {}
export type FormCreatePropertyLoaderKey = 'create' | 'update' | 'current';
const FormCreateProperty: React.FC<FormCreatePropertyProps> = ({
  updateId,
  defaultState,
  parent,
  title,
  onClose,
  ...props
}) => {
  const dataMap = useProductsSelector().propertiesDataMap;
  const parentLevelIs: PropertyLevelIsType = { [parent?.levelType ?? 'group']: true };
  const currentLevelIs: PropertyLevelIsType = { [parent?.levelType ?? 'group']: true };

  const loaders = useLoaders<
    FormCreatePropertyLoaderKey,
    { current?: Partial<PropertyBaseEntity>; currentId?: string }
  >(
    {
      create: { content: 'Creating...' },
      update: { content: 'Updating...' },
      current: { content: 'Fetching...' },
    },
    { current: updateId ? dataMap?.[updateId] : undefined, currentId: updateId }
  );
  const currentProp = loaders.state?.currentId ? dataMap?.[loaders.state?.currentId] : undefined;

  useEffect(() => {
    console.log('current', currentProp);
  }, [currentProp]);
  const form = useAppForm<IPropertyFormData>({
    defaultValues: !defaultState
      ? undefined
      : ({
          isSelectable: parent?.isSelectable ?? false,
          ...defaultState,
          parent: parent ? getIdRef(parent) : undefined,
        } as IPropertyFormData),
    values: currentProp
      ? ({
          ...currentProp,
          parent: parent ? getIdRef(parent) : undefined,
        } as IPropertyFormData)
      : undefined,
  });

  const { formValues } = form;

  return (
    <ModalBase
      isLoading={loaders.hasLoading}
      fillHeight
      title={t(updateId ? 'Update property' : 'Create property')}
      onClose={onClose}
    >
      <AppFormProvider value={form}>
        <LoadersProvider value={loaders}>
          {/*<FlexBox>*/}

          <PropertyInfoFormArea
            updateId={updateId}
            parent={parent}
            parentLevelIs={parentLevelIs}
            currentLevelIs={currentLevelIs}
          />

          <FlexBox padding={'4px 8px 8px'} flex={1} gap={12} fillWidth>
            {formValues?._id && <PropertyCmsParamsFormArea levelIs={currentLevelIs} />}
          </FlexBox>

          {/*</FlexBox>*/}
        </LoadersProvider>
      </AppFormProvider>
    </ModalBase>
  );
};

export default FormCreateProperty;

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
        data: { _id: updateId, data: toReqData(omit(data, ['cmsConfigs'])) },
        onLoading: loaders.onLoading('update'),
        onSuccess: data => {
          loaders.setData('currentId', data._id);
        },
      });
    } else {
      offersSrv.createProperty({
        onLoading: loaders.onLoading('create'),
        data: {
          data: toReqData(omit(data, ['cmsConfigs'])),
        },
        onSuccess: data => {
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
