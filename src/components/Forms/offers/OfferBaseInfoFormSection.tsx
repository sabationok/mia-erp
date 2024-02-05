import { FormSection } from '../FormSection';
import { OfferFormSectionProps } from './types';
import {
  IProduct,
  IProductFormData,
  IProductFullFormData,
  OfferTypeEnum,
  ProductStatusEnum,
} from '../../../types/products.types';
import { useAppForm } from '../../../hooks';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import InputText from '../../atoms/Inputs/InputText';
import FlexBox from '../../atoms/FlexBox';
import * as React from 'react';
import { useState } from 'react';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import { enumToFilterOptions, toReqData } from '../../../utils';
import useProductsService from '../../../hooks/useProductsService.hook';
import { useAppSelector } from '../../../redux/store.store';
import { MaybeNull } from '../../../types/utils.types';

export interface OfferBaseInfoFormSectionProps extends OfferFormSectionProps<IProductFullFormData> {
  type?: MaybeNull<OfferTypeEnum>;
  onSuccess?: (data: IProduct) => void;
  edit?: boolean;
}
const productsStatusOption = enumToFilterOptions(ProductStatusEnum);

export const OfferBaseInfoFormSection = ({
  defaultValues,
  edit,
  type,
  onSuccess,
  onSubmit,
  _id,
}: OfferBaseInfoFormSectionProps) => {
  const service = useProductsService();
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    register,
    registerSelect,
    ...appForm
  } = useAppForm<IProductFullFormData>({
    defaultValues: { ...defaultValues, type },
  });

  const {
    directories: { directories },
    products: { properties },
  } = useAppSelector();

  function onValid(sData: IProductFormData) {
    const productForSubmit = toReqData(sData, { ignorePaths: ['measurement'] });

    !edit
      ? service.create({
          data: { data: productForSubmit },
          onSuccess: onSuccess,
          onLoading: setIsLoading,
        })
      : service.updateById({
          data: { data: productForSubmit, _id },
          onSuccess: onSuccess,
          onLoading: setIsLoading,
        });
  }

  return (
    <FormSection title={t('Base info')} onSubmit={appForm.handleSubmit(onValid)} isLoading={isLoading}>
      <InputLabel label={t('label')} error={errors.label} required>
        <InputText placeholder={t('label')} {...register('label')} required autoFocus />
      </InputLabel>

      <FlexBox fxDirection={'row'} gap={6} fillWidth>
        <InputLabel label={t('sku')} error={errors.sku}>
          <InputText placeholder={t('sku')} {...register('sku')} />
        </InputLabel>

        <InputLabel label={'Штрих-код'} error={errors.barCode}>
          <InputText placeholder={'Штрих-код'} {...register('barCode')} />
        </InputLabel>
      </FlexBox>

      <CustomSelect
        {...registerSelect('brand', {
          options: directories[ApiDirType.BRANDS],
          label: t('brand'),
          placeholder: t('selectBrand'),
          multipleMode: true,
        })}
      />

      <CustomSelect
        {...registerSelect('approved', {
          options: productsStatusOption,
          label: t('status'),
          placeholder: t('status'),
        })}
      />

      <InputLabel label={t('description')} error={errors.description}>
        <TextareaPrimary placeholder={t('description')} {...register('description')} />
      </InputLabel>
    </FormSection>
  );
};
