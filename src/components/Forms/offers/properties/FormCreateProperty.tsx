import { ModalFormProps } from '../../../ModalForm';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { OfferTypeEnum } from '../../../../types/offers/offers.types';
import FlexBox from '../../../atoms/FlexBox';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { t } from '../../../../lang';
import InputText from '../../../atoms/Inputs/InputText';
import { useAppForm } from '../../../../hooks';
import {
  IPropertyDto,
  PropertyBaseEntity,
  PropertyFormData,
  PropertyLevelIsType,
} from '../../../../types/offers/properties.types';
import React from 'react';
import LangButtonsGroup from '../../../atoms/LangButtonsGroup';
import { AccordionForm } from '../../FormArea/AccordionForm';
import { getIdRef, toReqData } from '../../../../utils';
import ModalBase from '../../../atoms/Modal';
import { MaybeNull } from '../../../../types/utils.types';
import { omit, pick } from 'lodash';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import ButtonSwitch from '../../../atoms/ButtonSwitch';
import { useLoaders } from '../../../../Providers/Loaders/useLoaders.hook';
import { useProductsSelector } from '../../../../redux/selectors.store';

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

const FormCreateProperty: React.FC<FormCreatePropertyProps> = ({
  updateId,
  defaultState,
  parent,
  title,
  onClose,
  ...props
}) => {
  const offersSrv = useAppServiceProvider().offers;
  const dataMap = useProductsSelector().propertiesDataMap;
  const parentLevelIs: PropertyLevelIsType = { [parent?.levelType ?? 'group']: true };
  const currentLevelIs: PropertyLevelIsType = { [parent?.levelType ?? 'group']: true };
  const current = updateId ? dataMap?.[updateId] : undefined;

  const loaders = useLoaders<'create' | 'update' | 'current', { current?: Partial<PropertyBaseEntity> }>(
    { create: { content: 'Creating...' }, update: { content: 'Updating...' } },
    { current }
  );

  const form = useAppForm<IPropertyFormData>({
    defaultValues: !defaultState
      ? undefined
      : ({
          isSelectable: parent?.selectableType === 'dynamic' ?? false,
          ...defaultState,
          parent: parent ? getIdRef(parent) : undefined,
        } as IPropertyFormData),
    values: loaders.state?.current
      ? ({
          ...loaders.state?.current,
          parent: parent ? getIdRef(parent) : undefined,
        } as IPropertyFormData)
      : undefined,
  });

  const {
    // formState: { errors },
    register,
    handleSubmit,
    setValue,
    formValues,
  } = form;

  const selectableHandler = (checked: boolean) => {
    setValue('isSelectable', checked);
  };

  const onValid = (data: IPropertyFormData) => {
    if (updateId) {
      offersSrv.updatePropertyById({
        data: { _id: updateId, data: toReqData(omit(data, ['cmsConfigs'])) },
        onLoading: loaders.onLoading('update'),
        onSuccess: data => {
          loaders.setData('current', data);
        },
      });
    } else {
      offersSrv.createProperty({
        onLoading: loaders.onLoading('create'),
        data: {
          data: toReqData(omit(data, ['cmsConfigs'])),
        },
        onSuccess: data => {
          loaders.setData('current', data);
        },
      });
    }
  };

  return (
    <ModalBase
      isLoading={loaders.hasLoading}
      fillHeight
      title={title || formValues?._id ? 'Update property' : 'Create property'}
      onClose={onClose}
    >
      <FlexBox>
        <FlexBox padding={'4px 8px 8px'} flex={1} gap={12} fillWidth>
          <AccordionForm
            isLoading={loaders.hasLoading}
            label={'Main info'}
            expandable={false}
            isOpen={true}
            hasOnSubmit
            onSubmit={handleSubmit(onValid)}
          >
            <InputLabel label={t('type')} disabled>
              <InputText placeholder={t('type')} {...register('type')} disabled />
            </InputLabel>

            <InputLabel label={t('Доступно для формування варіацій')} disabled>
              <InputText placeholder={t('type')} value={formValues.isSelectable ? 'Так' : 'Ні'} disabled />
            </InputLabel>

            {parent && (
              <InputLabel label={t(parentLevelIs?.group ? 'group' : 'property')} disabled>
                <InputText
                  placeholder={t(parentLevelIs?.group ? 'group' : 'property')}
                  defaultValue={parent?.label ?? ''}
                  disabled
                />
              </InputLabel>
            )}

            <InputLabel label={t('label')} required>
              <InputText placeholder={t('insertLabel')} {...register('label')} autoFocus required />
            </InputLabel>

            {currentLevelIs?.prop && formValues?._id && (
              <InputLabel label={'Доступно для формування варіацій'}>
                <ButtonSwitch name={'isSelectable'} value={formValues?.isSelectable} onChange={selectableHandler} />
              </InputLabel>
            )}
          </AccordionForm>

          {formValues?._id && <PropertyCmsParamsForm defaultState={formValues} levelIs={currentLevelIs} />}
        </FlexBox>
      </FlexBox>
    </ModalBase>
  );
};
export const PropertyCmsParamsForm = ({
  defaultState,
}: {
  levelIs?: PropertyLevelIsType;
  defaultState?: MaybeNull<Partial<PropertyBaseEntity>>;
  onSubmit?: AppSubmitHandler<Pick<IPropertyDto, 'cmsConfigs'>, { levelIs?: PropertyLevelIsType }>;
}) => {
  const offersSrv = useAppServiceProvider().offers;
  const form = useAppForm<IPropertyFormData>({
    defaultValues: { ...defaultState } as IPropertyFormData,
  });
  const {
    formState: { errors },
    register,
    handleSubmit,
    formValues,
  } = form;

  const onValid = (data: IPropertyFormData) => {
    if (formValues._id) {
      offersSrv.updatePropertyById({ data: { _id: formValues._id, data: toReqData(pick(data, ['cmsConfigs'])) } });
    }

    // onSubmit && onSubmit(toReqData(pick(data, ['cmsConfigs'])), { levelIs });
  };
  return (
    <AccordionForm label={'Cms params'} expandable={true} isOpen={false} onSubmit={handleSubmit(onValid)}>
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

      <InputLabel disabled label={t('Colors')}>
        <InputText placeholder={t('Colors')} type={'color'} {...register('cmsConfigs.colors')} />
      </InputLabel>
    </AccordionForm>
  );
};

export default FormCreateProperty;
