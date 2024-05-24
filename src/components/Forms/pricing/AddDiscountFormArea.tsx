import { AccordionForm, AccordionFormProps } from '../FormArea/AccordionForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import {
  DiscountValueTypeEnum,
  PriceBonusProviderEnum,
  PriceDiscountDto,
  PriceDiscountEntity,
  PriceDiscountRecord,
  PriceDiscountType,
  PriceDiscountVolumeType,
} from '../../../types/price-management/discounts';
import { useAppForm } from '../../../hooks';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import ButtonsGroup from '../../atoms/ButtonsGroup';
import { enumToFilterOptions } from '../../../utils';
import { t } from 'lang';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { isStringOrNumberSchema } from '../validation';
import { apiCall, DiscountsApi } from '../../../api';
import { UUID } from '../../../types/utils.types';

export interface CreateDiscountFormData extends PriceDiscountDto {
  hasVolumeControl?: boolean;
}
export interface AddDiscountFormAreaProps extends AccordionFormProps {
  onAccept?: AppSubmitHandler<PriceDiscountDto>;
  defaultValues?: PriceDiscountRecord;
  onSuccess?: (data: PriceDiscountEntity) => void;
  priceId: UUID;
}
const PriceDiscountTypeOptions = enumToFilterOptions(PriceDiscountType, { labelPrefix: 'Discount' });
const PriceBonusProviderOptions = enumToFilterOptions(PriceBonusProviderEnum, { labelPrefix: 'Discount' });
const DiscountValueTypeOptions = enumToFilterOptions(DiscountValueTypeEnum, { labelPrefix: 'Discount' });
const PriceDiscountVolumeOptions = enumToFilterOptions(PriceDiscountVolumeType, { labelPrefix: 'Discount' });

const schema = yup.object().shape({
  value: isStringOrNumberSchema,
});

export function AddDiscountFormArea({ onSuccess, priceId, ...props }: AddDiscountFormAreaProps) {
  const form = useAppForm<CreateDiscountFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      type: PriceDiscountType.bonus,
    },
  });

  const { setValue, formValues, register, handleSubmit } = form;

  const onValid = (fData: PriceDiscountDto) => {
    apiCall(DiscountsApi.create, {
      data: {
        ...fData,
        price: { _id: priceId },
      },
      onSuccess,
    });
  };

  return (
    <AccordionForm {...props} expandable isOpen label={t('Add discount')} onSubmit={handleSubmit(onValid)}>
      <InputLabel label={t('Type')}>
        <ButtonsGroup
          value={formValues.type}
          onSelect={({ value }) => {
            setValue('type', value);
          }}
          options={PriceDiscountTypeOptions}
        />
      </InputLabel>

      <InputLabel label={t('Value type')}>
        <ButtonsGroup
          onSelect={({ value }) => {
            setValue('valueType', value);
          }}
          options={DiscountValueTypeOptions}
        />
      </InputLabel>

      <InputLabel label={'Value'}>
        <InputText type={'number'} step={'0.01'} min={0} {...register('value', { valueAsNumber: true })} />
      </InputLabel>

      {formValues.type === PriceDiscountType.bonus && (
        <InputLabel label={t('Bonus balance')}>
          <ButtonsGroup
            onSelect={({ value }) => {
              setValue('balanceType', value);
            }}
            options={PriceBonusProviderOptions}
          />
        </InputLabel>
      )}

      <InputLabel label={t('Discount_Threshold')}>
        <InputText type={'number'} step={'0.01'} min={0} {...register('threshold', { valueAsNumber: true })} />
      </InputLabel>

      {!!formValues.threshold && (
        <InputLabel label={t('Discount_Volume_Type')}>
          <ButtonsGroup
            onSelect={({ value }) => {
              setValue('volumeType', value);
            }}
            options={PriceDiscountVolumeOptions}
          />
        </InputLabel>
      )}
    </AccordionForm>
  );
}
