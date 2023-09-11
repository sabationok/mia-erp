import ModalForm, { ModalFormProps } from '../ModalForm';
import { AppSubmitHandler } from '../../hooks/useAppForm.hook';
import { ProductTypeEnum } from '../../redux/products/products.types';
import FlexBox from '../atoms/FlexBox';
import InputLabel from '../atoms/Inputs/InputLabel';
import t from '../../lang';
import InputText from '../atoms/Inputs/InputText';
import { useAppForm } from '../../hooks';
import { IProperty, IPropertyBase, IPropertyDto } from '../../redux/products/properties.types';
import FormAfterSubmitOptions from './components/FormAfterSubmitOptions';

export interface FormCreatePropertyProps extends Omit<ModalFormProps<ProductTypeEnum, any, IPropertyBase>, 'onSubmit'> {
  onSubmit?: AppSubmitHandler<IPropertyDto, { isGroup?: boolean; isProperty?: boolean; isValue?: boolean }>;
  type?: ProductTypeEnum;
  create?: boolean;
  parent?: IProperty;
  edit?: boolean;
  isGroup?: boolean;
  isProperty?: boolean;
  isValue?: boolean;
}

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
  const { register, handleSubmit, setValue, toggleAfterSubmitOption, closeAfterSave, clearAfterSave } =
    useAppForm<IPropertyFormData>({ defaultValues: { ...defaultState, type } });

  const onValid = (data: IPropertyFormData) => {
    onSubmit && onSubmit(data, { closeAfterSave, clearAfterSave });
  };

  return (
    <ModalForm
      onSubmit={handleSubmit(onValid)}
      {...props}
      onOptSelect={(option, value, index) => {
        setValue('type', value);
      }}
      extraFooter={
        <FormAfterSubmitOptions
          toggleOption={toggleAfterSubmitOption}
          clearAfterSave={clearAfterSave}
          closeAfterSave={closeAfterSave}
        />
      }
    >
      <FlexBox padding={'4px 8px'} flex={1} fillWidth>
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

        {isGroup && (
          <InputLabel label={t('description')}>
            <InputText placeholder={t('description')} {...register('description')} />
          </InputLabel>
        )}
      </FlexBox>
    </ModalForm>
  );
};
export default FormCreateProperty;
