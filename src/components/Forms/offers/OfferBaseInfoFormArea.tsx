import { AccordionForm } from '../FormArea/AccordionForm';
import { OfferFormAreaProps } from './types';
import { IProductFormData, IProductFullFormData, OfferEntity, OfferTypeEnum } from '../../../types/offers/offers.types';
import { useAppForm } from '../../../hooks';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { t } from '../../../lang';
import InputText from '../../atoms/Inputs/InputText';
import FlexBox from '../../atoms/FlexBox';
import * as React from 'react';
import CustomSelect from '../../atoms/Inputs/CustomSelect';
import { ApiDirType } from '../../../redux/APP_CONFIGS';
import TextareaPrimary from '../../atoms/Inputs/TextareaPrimary';
import { toReqData } from '../../../utils';
import useOffersService from '../../../hooks/useOffersService.hook';
import { MaybeNull } from '../../../types/utils.types';
import { useOfferLoadersProvider } from '../../Modals/CreateOfferModal';
import { OfferStatusFilterOptions } from '../../../data';
import { useDirectorySelector, useWarehousesSelector } from '../../../redux/selectors.store';

export interface OfferBaseInfoFormAreaProps extends OfferFormAreaProps<IProductFullFormData> {
  type?: MaybeNull<OfferTypeEnum>;
  onSuccess?: (data: { data: OfferEntity }) => void;
  edit?: boolean;
}

export const OfferBaseInfoFormArea = ({ defaultValues, edit, type, onSuccess, _id }: OfferBaseInfoFormAreaProps) => {
  const { isLoading, onLoading } = useOfferLoadersProvider();
  const warehousesState = useWarehousesSelector();
  const service = useOffersService();
  const counterparties = useDirectorySelector(ApiDirType.COUNTERPARTIES).directory;

  const brandsList = useDirectorySelector(ApiDirType.BRANDS).directory;

  const {
    formState: { errors },
    register,
    registerSelect,
    formValues,
    ...appForm
  } = useAppForm<IProductFullFormData>({
    defaultValues: { ...defaultValues, type },
  });

  function onValid(sData: IProductFormData) {
    const productForSubmit = toReqData(sData, { ignorePaths: ['measurement'] });

    !edit
      ? service.create({
          data: {
            data: {
              data: productForSubmit,
            },
          },
          onSuccess: onSuccess,
          onLoading: onLoading('offer_create'),
        })
      : service.updateById({
          data: { data: { data: productForSubmit, _id } },
          onSuccess: onSuccess,
          onLoading: onLoading('offer_update'),
        });
  }

  return (
    <AccordionForm
      label={t('Base info')}
      isLoading={!edit ? isLoading?.offer_create : isLoading?.offer_update}
      onSubmit={appForm.handleSubmit(onValid)}
      onReset={appForm.reset}
      canSubmit={true}
      expandable={false}
    >
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
          options: brandsList,
          label: t('brand'),
          placeholder: t('selectBrand'),
        })}
      />

      <CustomSelect
        {...registerSelect('warehouse', {
          options: warehousesState.warehouses,
          label: t('Select warehouse'),
          placeholder: t('Select warehouse'),
        })}
      />

      <CustomSelect
        {...registerSelect('supplier', {
          options: counterparties,
          label: t('Select supplier'),
          placeholder: t('Select supplier'),
        })}
      />

      <CustomSelect
        {...registerSelect('approved', {
          options: OfferStatusFilterOptions,
          label: t('status'),
          placeholder: t('status'),
          value: formValues.approved,
          selectedValue: formValues.approved,
        })}
      />

      <InputLabel label={t('description')} error={errors.description}>
        <TextareaPrimary placeholder={t('description')} {...register('description')} />
      </InputLabel>
    </AccordionForm>
  );
};
