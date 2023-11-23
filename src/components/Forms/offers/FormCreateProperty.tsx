import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { OfferTypeEnum } from '../../../redux/products/products.types';
import FlexBox from '../../atoms/FlexBox';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import InputText from '../../atoms/Inputs/InputText';
import { useAppForm } from '../../../hooks';
import {
  IProperty,
  IPropertyBase,
  IPropertyDto,
  PropertyTypeEnum,
} from '../../../redux/products/properties/properties.types';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../components/FormAfterSubmitOptions';
import ButtonsGroup, { ButtonGroupSelectHandler } from '../../atoms/ButtonsGroup';
import { enumToFilterOptions } from '../../../utils/fabrics';
import { Text } from '../../atoms/Text';
import styled from 'styled-components';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';

const propCmsTypeFilterOptions = enumToFilterOptions(PropertyTypeEnum);
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
export enum IsSelectableEnum {
  No = 'No',
  Yes = 'Yes',
}
const filterOptions = enumToFilterOptions(IsSelectableEnum);

export interface IPropertyFormData extends IPropertyDto {}

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
    registerSelect,
  } = useAppForm<IPropertyFormData>({
    defaultValues: { ...defaultState, type },
  });

  const onValid = (data: IPropertyFormData) => {
    onSubmit && onSubmit(data, { ...submitOptions.state });
  };
  const handleIsSelectableByUser: ButtonGroupSelectHandler<IsSelectableEnum> = info => {
    setValue('isSelectable', info?.option?.value === 'Yes');
  };

  return (
    <ModalForm
      onSubmit={handleSubmit(onValid)}
      fillHeight
      {...props}
      onOptSelect={(option, value, index) => {
        setValue('type', value);
      }}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
    >
      <FlexBox padding={'4px 8px 8px'} flex={1} fillWidth>
        <InputLabel label={t('type')} disabled>
          <InputText placeholder={t('type')} {...register('type')} disabled />
        </InputLabel>

        {(isProperty || isValue) && (
          <InputLabel label={t(isProperty ? 'group' : 'property')} disabled>
            <InputText
              placeholder={t(isProperty ? 'group' : 'property')}
              defaultValue={defaultState?.parent?.label || defaultState?.parent?.label}
              disabled
            />
          </InputLabel>
        )}

        <InputLabel label={t('label')} required>
          <InputText placeholder={t('insertLabel')} {...register('label')} autoFocus required />
        </InputLabel>

        {isProperty && (
          <InputLabel label={'Доступно для формування варіацій'}>
            <ButtonsGroup
              options={filterOptions}
              onSelect={handleIsSelectableByUser}
              defaultIndex={defaultState?.isSelectable ? 1 : 0}
            />
          </InputLabel>
        )}

        {isValue && (
          <>
            <Text>{'Is value'}</Text>
          </>
        )}

        <CmsConfigs margin={'8px 0 0'} fillWidth>
          <CmsConfigsHeader padding={'8px'} justifyContent={'flex-end'} fxDirection={'row'} fillWidth>
            <Text $size={13} $weight={500}>
              {t('Cms configs')}
            </Text>
          </CmsConfigsHeader>

          <InputLabel label={t('Configs key')}>
            <InputText placeholder={t('Key')} {...register('cmsConfigs.key')} />
          </InputLabel>

          {isGroup && (
            <InputLabel label={t('Description')}>
              <InputText placeholder={t('description')} {...register('cmsConfigs.description')} />
            </InputLabel>
          )}

          {isGroup && (
            <InputLabel label={t('Cms type')}>
              <CustomSelect
                {...registerSelect('cmsConfigs.type', {
                  options: propCmsTypeFilterOptions,
                  placeholder: t('Select cms type'),
                })}
              />
            </InputLabel>
          )}
        </CmsConfigs>
      </FlexBox>
    </ModalForm>
  );
};

const CmsConfigs = styled(FlexBox)``;

const CmsConfigsHeader = styled(FlexBox)`
  border-top: 1px solid ${p => p.theme.modalBorderColor};
  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;
export default FormCreateProperty;
