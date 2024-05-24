import { ModalFormProps } from '../../../ModalForm';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { OfferTypeEnum } from '../../../../types/offers/offers.types';
import FlexBox from '../../../atoms/FlexBox';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { t } from '../../../../lang';
import InputText from '../../../atoms/Inputs/InputText';
import { useAppForm } from '../../../../hooks';
import { IProperty, IPropertyBase, IPropertyDto, PropertyFormData } from '../../../../types/offers/properties.types';
import ButtonSwitch from '../../../atoms/ButtonSwitch';
import React from 'react';
import LangButtonsGroup from '../../../atoms/LangButtonsGroup';
import { AccordionForm } from '../../FormArea/AccordionForm';
import { toReqData } from '../../../../utils';
import ModalBase from '../../../atoms/Modal';
import TabSelector from '../../../atoms/TabSelector';
import { MaybeNull, PartialRecord } from '../../../../types/utils.types';
import { pick } from 'lodash';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';

export interface FormCreatePropertyProps extends Omit<ModalFormProps<OfferTypeEnum, any, IPropertyBase>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<IPropertyDto, { isGroup?: boolean; isProperty?: boolean; isValue?: boolean }>;
  type?: OfferTypeEnum;
  create?: boolean;
  parent?: IProperty;
  edit?: boolean;
  levelIs: PropertyLevelIsType;
  isGroup?: boolean;
  isProperty?: boolean;
  isValue?: boolean;
}

export interface IPropertyFormData extends PropertyFormData {}
export type PropertyLevelIsType = PartialRecord<'value' | 'group' | 'prop', boolean>;
// function getLevelIs(prop: IPropertyBase): Record<PropertyLevelIsType, boolean> {
//   if (prop.parent) {
//     return {};
//   }
//   if (!prop.parent) {
//     return {};
//   }
//   if (prop.childrenList && prop.parent) {
//     return {};
//   }
// }
const FormCreateProperty: React.FC<FormCreatePropertyProps> = ({
  onSubmit,
  isGroup,
  isProperty,
  isValue,
  defaultState,
  type,
  parent,
  filterOptions,
  title,
  ...props
}) => {
  const offersSrv = useAppServiceProvider().offers;

  const levelIs: PropertyLevelIsType = {
    group: isGroup,
    prop: isProperty,
    value: isValue,
  };
  // const submitOptions = useAfterSubmitOptions();
  const form = useAppForm<IPropertyFormData>({
    defaultValues: { isSelectable: false, ...defaultState, type } as IPropertyFormData,
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
    if (formValues._id) {
      offersSrv.updatePropertyById({ data: { _id: formValues._id, data: toReqData(pick(data, ['cmsConfigs'])) } });
    }
    onSubmit && onSubmit(toReqData(data), { isGroup, isProperty, isValue });
  };

  return (
    <ModalBase fillHeight title={title}>
      <FlexBox>
        {filterOptions && (
          <TabSelector
            filterOptions={filterOptions}
            onOptSelect={(_o, value, _i) => {
              setValue('type', value);
            }}
          />
        )}
        <FlexBox padding={'4px 8px 8px'} flex={1} gap={12} fillWidth>
          <AccordionForm
            label={'Main info'}
            expandable={false}
            isOpen={true}
            hasOnSubmit
            onSubmit={handleSubmit(onValid)}
          >
            <InputLabel label={t('type')} disabled>
              <InputText placeholder={t('type')} {...register('type')} disabled />
            </InputLabel>

            {(levelIs.prop || levelIs.value) && (
              <InputLabel label={t(isProperty ? 'group' : 'property')} disabled>
                <InputText
                  placeholder={t(isProperty ? 'group' : 'property')}
                  defaultValue={defaultState?.parent?.label ?? ''}
                  disabled
                />
              </InputLabel>
            )}

            <InputLabel label={t('label')} required>
              <InputText placeholder={t('insertLabel')} {...register('label')} autoFocus required />
            </InputLabel>

            {levelIs.prop && (
              <InputLabel label={'Доступно для формування варіацій'}>
                <ButtonSwitch name={'isSelectable'} value={!!formValues?.isSelectable} onChange={selectableHandler} />
              </InputLabel>
            )}
          </AccordionForm>

          <PropertyCmsParamsForm
            defaultState={defaultState}
            levelIs={levelIs}
            onSubmit={(data, options) => {
              onSubmit && onSubmit(data, options);
            }}
          />

          {/*{isProperty && (*/}
          {/*  <InputLabel label={t('Cms type')}>*/}
          {/*    <CustomSelect*/}
          {/*      {...registerSelect('cmsConfigs.type', {*/}
          {/*        options: propCmsTypeFilterOptions,*/}
          {/*        placeholder: t('Select cms type'),*/}
          {/*      })}*/}
          {/*    />*/}
          {/*  </InputLabel>*/}
          {/*)}*/}
        </FlexBox>
      </FlexBox>
    </ModalBase>
  );
};
export const PropertyCmsParamsForm = ({
  levelIs,
  onSubmit,
  defaultState,
}: {
  levelIs?: PropertyLevelIsType;
  defaultState?: MaybeNull<Partial<IPropertyBase>>;
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
    // setValue,
    formValues,
  } = form;

  const onValid = (data: IPropertyFormData) => {
    if (formValues._id) {
      offersSrv.updatePropertyById({ data: { _id: formValues._id, data: toReqData(pick(data, ['cmsConfigs'])) } });
    }

    onSubmit && onSubmit(toReqData(pick(data, ['cmsConfigs'])), { levelIs });
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

      {levelIs?.group && (
        <InputLabel label={t('Description')}>
          <InputText placeholder={t('description')} {...register('cmsConfigs.description')} />
        </InputLabel>
      )}

      {levelIs?.group && formValues?.cmsConfigs?.key === 'color' && (
        <InputLabel disabled label={t('Colors')}>
          <InputText placeholder={t('Colors')} type={'color'} {...register('cmsConfigs.colors')} />
        </InputLabel>
      )}
    </AccordionForm>
  );
};

export default FormCreateProperty;
