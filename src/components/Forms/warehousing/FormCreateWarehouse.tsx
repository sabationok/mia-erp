import { IWarehouseDto, WarehouseTypeEnum } from '../../../redux/warehouses/warehouses.types';
import { useAppForm } from '../../../hooks';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ModalForm, { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { enumToArray, enumToFilterOptions } from '../../../utils/fabrics';
import FormAfterSubmitOptions from '../components/FormAfterSubmitOptions';
import React, { useState } from 'react';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import FlexBox from '../../atoms/FlexBox';
import { t } from '../../../lang';
import { FormInputs } from '../components/atoms';
import { Text } from '../../atoms/Text';
import Switch from '../../atoms/Switch';

export interface FormCreateWarehouseProps extends Omit<ModalFormProps<any, any, IWarehouseFormData>, 'onSubmit' | ''> {
  onSubmit?: AppSubmitHandler<IWarehouseFormData, { isDefault: boolean }>;
  update?: string;
}
export interface IWarehouseFormData extends IWarehouseDto {}

export const warehouseTypeFilterOptions = enumToFilterOptions(WarehouseTypeEnum);

const validation = yup.object<IWarehouseFormData>().shape({
  label: yup.string().required(),
  code: yup.string().required(),
  manager: yup
    .object({
      _id: yup.string(),
    })
    .optional(),
  type: yup.string().oneOf(enumToArray(WarehouseTypeEnum)).required(),
  email: yup.string(),
  phone: yup.string(),
  location: yup.object({
    latitude: yup.number(),
    longitude: yup.number(),
  }),
  description: yup.string().max(250).optional(),
});

const FormCreateWarehouse: React.FC<FormCreateWarehouseProps> = ({ defaultState, onSubmit, ...p }) => {
  const {
    formState: { errors },
    register,
    setValue,
    handleSubmit,
    closeAfterSave,
    clearAfterSave,
    toggleAfterSubmitOption: toggleOption,
  } = useAppForm<IWarehouseFormData>({
    defaultValues: { ...defaultState },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const [isDefault, setAsDefault] = useState(false);
  const onValid = (data: IWarehouseFormData) => {
    onSubmit &&
      onSubmit(data, {
        closeAfterSave,
        clearAfterSave,
        isDefault,
      });
  };

  return (
    <ModalForm
      title={'Create warehouse'}
      {...p}
      onSubmit={handleSubmit(onValid, errors => {
        console.error('FormCreateWarehouse', errors);
      })}
      filterOptions={warehouseTypeFilterOptions}
      filterName={'type'}
      onFilterValueSelect={setValue}
      extraFooter={<FormAfterSubmitOptions {...{ closeAfterSave, clearAfterSave, toggleOption }} />}
    >
      <FormInputs>
        <FlexBox style={{ display: 'grid', gridTemplateColumns: '1fr 125px' }} gap={8}>
          <InputLabel label={t('label')} error={errors.label} required>
            <InputText placeholder={t('insertLabel')} {...register('label')} required autoFocus />
          </InputLabel>

          <InputLabel label={t('code')} error={errors.code} required>
            <InputText placeholder={t('insertCode')} {...register('code', { required: true })} required />
          </InputLabel>
        </FlexBox>

        <FlexBox fxDirection={'row'} gap={8}>
          <InputLabel label={t('email')} error={errors.email}>
            <InputText placeholder={t('email')} {...register('email')} />
          </InputLabel>

          <InputLabel label={t('phone')} error={errors.phone}>
            <InputText placeholder={t('phone')} {...register('phone')} />
          </InputLabel>
        </FlexBox>

        <FlexBox fxDirection={'row'} gap={8}>
          <InputLabel label={t('longitude')} error={errors.location}>
            <InputText placeholder={t('longitude')} {...register('location.longitude', { valueAsNumber: true })} />
          </InputLabel>

          <InputLabel label={t('latitude')} error={errors.location}>
            <InputText placeholder={t('latitude')} {...register('location.latitude', { valueAsNumber: true })} />
          </InputLabel>
        </FlexBox>

        <FlexBox
          fxDirection={'row'}
          gap={8}
          padding={'8px 0 0 8px'}
          alignItems={'center'}
          justifyContent={'space-between'}
        >
          <Text $weight={500} $size={12}>
            {'Склад по замовчуванню'}
          </Text>

          <Switch
            size={'32px'}
            checked={isDefault}
            onChange={e => {
              setAsDefault(e.checked);
            }}
          />
        </FlexBox>

        {/*<InputLabel label={t('comment')} error={errors.description}>*/}
        {/*  <TextareaPrimary placeholder={t('insertComment')} {...register('description')} maxLength={250} />*/}
        {/*</InputLabel>*/}
      </FormInputs>
    </ModalForm>
  );
};

export default FormCreateWarehouse;
