import ModalForm, { ModalFormProps } from '../../../ModalForm';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { OfferTypeEnum } from '../../../../types/offers/offers.types';
import FlexBox from '../../../atoms/FlexBox';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { t } from '../../../../lang';
import InputText from '../../../atoms/Inputs/InputText';
import { useAppForm } from '../../../../hooks';
import { IProperty, IPropertyBase, IPropertyDto, PropertyFormData } from '../../../../types/offers/properties.types';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../components/FormAfterSubmitOptions';
import ButtonSwitch from '../../../atoms/ButtonSwitch';
import React from 'react';
import LangButtonsGroup from '../../../atoms/LangButtonsGroup';
import { AccordionFormArea } from '../../FormArea/AccordionForm';
import { toReqData } from '../../../../utils';

export interface FormCreatePropertyProps extends Omit<ModalFormProps<OfferTypeEnum, any, IPropertyBase>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<IPropertyDto, { isGroup?: boolean; isProperty?: boolean; isValue?: boolean }>;
  type?: OfferTypeEnum;
  create?: boolean;
  parent?: IProperty;
  edit?: boolean;

  isGroup?: boolean;
  isProperty?: boolean;
  isValue?: boolean;
}

export interface IPropertyFormData extends PropertyFormData {}

const FormCreateProperty: React.FC<FormCreatePropertyProps> = ({
  onSubmit,
  isGroup,
  isProperty,
  isValue,
  defaultState,
  type,
  parent,
  ...props
}) => {
  const submitOptions = useAfterSubmitOptions();
  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
    formValues,
  } = useAppForm<IPropertyFormData>({
    defaultValues: { isSelectable: false, ...defaultState, type } as IPropertyFormData,
  });

  const selectableHandler = (checked: boolean) => {
    setValue('isSelectable', checked);
  };

  const onValid = (data: IPropertyFormData) => {
    onSubmit && onSubmit(toReqData(data), { ...submitOptions.state, isGroup, isProperty, isValue });
  };

  return (
    <ModalForm
      onSubmit={handleSubmit(onValid)}
      fillHeight
      {...props}
      onOptSelect={(_o, value, _i) => {
        setValue('type', value);
      }}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FlexBox padding={'4px 8px 8px'} flex={1} gap={12} fillWidth>
        <AccordionFormArea label={'Main info'} expandable={false} isOpen={true}>
          <InputLabel label={t('type')} disabled>
            <InputText placeholder={t('type')} {...register('type')} disabled />
          </InputLabel>

          {(isProperty || isValue) && (
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

          {isProperty && (
            <InputLabel label={'Доступно для формування варіацій'}>
              <ButtonSwitch name={'isSelectable'} value={!!formValues?.isSelectable} onChange={selectableHandler} />
            </InputLabel>
          )}
        </AccordionFormArea>

        <AccordionFormArea label={'Cms params'} expandable={true} isOpen={false} disabled>
          <InputLabel label={t('Cms key')} error={errors?.cmsConfigs?.key}>
            <InputText placeholder={'Key'} {...register('cmsConfigs.key')} />
          </InputLabel>

          <InputLabel label={t('Language key')}>
            <LangButtonsGroup disabled />
          </InputLabel>

          <InputLabel label={t('Label by lang key')} error={errors?.cmsConfigs?.labels?.ua}>
            <InputText placeholder={'Label'} {...register('cmsConfigs.labels.ua')} />
          </InputLabel>

          {isGroup && (
            <InputLabel label={t('Description')}>
              <InputText placeholder={t('description')} {...register('cmsConfigs.description')} />
            </InputLabel>
          )}

          {isValue && defaultState?.parent?.cmsConfigs?.type === 'color' && (
            <InputLabel label={t('Colors')}>
              <InputText placeholder={t('Colors')} type={'color'} {...register('cmsConfigs.colors')} />
            </InputLabel>
          )}
        </AccordionFormArea>
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
    </ModalForm>
  );
};

export default FormCreateProperty;
