import { AccordionForm, AccordionFormProps } from '../FormArea/AccordionForm';
import { AppSubmitHandler, useAppFormProvider } from '../../../hooks/useAppForm.hook';
import {
  PriceDiscountDto,
  PriceDiscountEntity,
  PriceDiscountRecord,
  PriceDiscountType,
} from '../../../types/price-management/discounts';
import { useCurrentDiscount } from '../../../hooks';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import ButtonsGroup from '../../atoms/ButtonsGroup';
import { t } from 'lang';
import { UUID } from '../../../types/utils.types';
import { useAppDispatch } from '../../../redux/store.store';
import { createDiscountThunk } from '../../../redux/priceManagement/discounts/discounts.thunks';
import { DiscountFilters } from '../../../data/priceManagement.data';
import FlexBox from '../../atoms/FlexBox';
import { useLoadersProvider } from '../../../Providers/Loaders/LoaderProvider';

export interface CreateDiscountFormData extends PriceDiscountDto {
  _id?: string;
  hasVolumeControl?: boolean;
}
export interface AddDiscountFormAreaProps extends AccordionFormProps {
  onAccept?: AppSubmitHandler<PriceDiscountDto>;
  defaultValues?: PriceDiscountRecord;
  onSuccess?: (data: PriceDiscountEntity) => void;
  priceId?: UUID;
  offerId?: UUID;
  discountId?: UUID;
  discount?: PriceDiscountEntity;
}

export function AddDiscountFormArea({ discount, onSuccess, priceId, ...props }: AddDiscountFormAreaProps) {
  const Discount = useCurrentDiscount(discount);
  const loaders = useLoadersProvider<'discount' | 'create' | 'update' | 'current'>();
  const form = useAppFormProvider<CreateDiscountFormData>();

  const { setValue, formValues, register, handleSubmit } = form;
  const dispatch = useAppDispatch();

  const onValid = (fData: PriceDiscountDto) => {
    dispatch(
      createDiscountThunk({
        data: {
          data: {
            ...fData,
            pricesIds: priceId ? [priceId] : undefined,
          },
        },
        onLoading: loaders.onLoading('discount'),
        onSuccess: ({ data }) => {
          onSuccess && onSuccess(data);
        },
      })
    );
  };

  return (
    <AccordionForm
      {...props}
      expandable
      isOpen
      label={t('Add discount')}
      onSubmit={handleSubmit(onValid)}
      isLoading={loaders.hasLoading}
    >
      <InputLabel label={t('Type')}>
        <ButtonsGroup
          value={formValues.type}
          onSelect={({ value }) => {
            setValue('type', value);
          }}
          options={DiscountFilters.Type}
        />
      </InputLabel>

      {formValues.type === PriceDiscountType.bonus && (
        <InputLabel label={t('Bonus balance')}>
          <ButtonsGroup
            value={formValues.balanceType}
            onSelect={({ value }) => {
              setValue('balanceType', value);
            }}
            options={DiscountFilters.BalanceProvider}
          />
        </InputLabel>
      )}

      <InputLabel label={t('Value type')}>
        <ButtonsGroup
          value={formValues.valueType}
          onSelect={({ value }) => {
            setValue('valueType', value);
          }}
          options={DiscountFilters.ValueType}
        />
      </InputLabel>

      <FlexBox fxDirection={'row'} gap={16}>
        <InputLabel label={'Value'}>
          <InputText type={'number'} step={'0.01'} min={0} {...register('value', { valueAsNumber: true })} />
        </InputLabel>

        <InputLabel label={t('Discount_Threshold')}>
          <InputText type={'number'} step={'0.01'} min={0} {...register('threshold', { valueAsNumber: true })} />
        </InputLabel>
      </FlexBox>

      {!!formValues.threshold && (
        <>
          <InputLabel label={t('Discount_Volume_Type')}>
            <ButtonsGroup
              value={formValues.volumeType}
              onSelect={({ value }) => {
                setValue('volumeType', value);
              }}
              options={DiscountFilters.VolumeType}
            />
          </InputLabel>
          <InputLabel label={t('Discount_Volume_Type')}>
            <ButtonsGroup
              value={formValues.thresholdType}
              onSelect={({ value }) => {
                setValue('thresholdType', value);
              }}
              options={DiscountFilters.ThresholdType}
            />
          </InputLabel>
        </>
      )}
    </AccordionForm>
  );
}
