import { AccordionForm, AccordionFormProps } from '../../atoms/FormArea/AccordionForm';
import { AppSubmitHandler, useAppFormProvider } from '../../../hooks/useAppForm.hook';
import {
  PriceDiscountDto,
  PriceDiscountEntity,
  PriceDiscountRecord,
  PriceDiscountType,
} from '../../../types/price-management/discounts';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import ButtonsGroup, { ButtonGroupSelectHandler } from '../../atoms/ButtonsGroup';
import { t } from 'lang';
import { UUID } from '../../../types/utils.types';
import { useAppDispatch } from '../../../redux/store.store';
import { createDiscountThunk, updateDiscountThunk } from '../../../redux/priceManagement/discounts/discounts.thunks';
import { DiscountFilters } from '../../../data/priceManagement.data';
import FlexBox from '../../atoms/FlexBox';
import { useLoadersProvider } from '../../../Providers/Loaders/LoaderProvider';
import { toReqData } from '../../../utils';
import { omit } from 'lodash';
import { Path } from 'react-hook-form';

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

export function DiscountBaseInfoFormArea({ discount, onSuccess, priceId, ...props }: AddDiscountFormAreaProps) {
  // const Discount = useCurrentDiscount(discount);
  const loaders = useLoadersProvider<'discount' | 'create' | 'update' | 'current'>();
  const form = useAppFormProvider<CreateDiscountFormData>();

  const { setValue, unregister, formValues, register, handleSubmit } = form;
  const dispatch = useAppDispatch();
  const registerOnSelect = (name: Path<CreateDiscountFormData>): ButtonGroupSelectHandler<any> => {
    return info => {
      setValue(name, info.value, { shouldDirty: true, shouldTouch: true });
      console.log(info);
      if (name === 'type' && info.value !== PriceDiscountType.bonus) {
        unregister('balanceType');
      }
    };
  };
  // useEffect(() => {
  //   console.log('formValues', formValues);
  // }, [formValues]);
  const onValid = (fData: CreateDiscountFormData) => {
    !fData._id
      ? dispatch(
          createDiscountThunk({
            data: {
              data: {
                ...toReqData(omit(fData, ['cmsConfigs'])),
              },
            },
            onLoading: loaders.onLoading('discount'),
            onSuccess: ({ data }) => {
              onSuccess && onSuccess(data);
            },
          })
        )
      : dispatch(
          updateDiscountThunk({
            data: {
              data: { ...toReqData(omit(fData, ['cmsConfigs'])), _id: fData._id },
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
          options={DiscountFilters.Type}
          form={form}
          name={'type'}
          value={formValues.type}
          onSelect={registerOnSelect('type')}
        />
      </InputLabel>

      {formValues.type === PriceDiscountType.bonus && (
        <InputLabel label={t('Bonus balance')}>
          <ButtonsGroup
            value={formValues.balanceType}
            onSelect={registerOnSelect('balanceType')}
            options={DiscountFilters.BalanceProvider}
          />
        </InputLabel>
      )}

      <InputLabel label={t('Value type')}>
        <ButtonsGroup
          value={formValues.valueType}
          onSelect={registerOnSelect('valueType')}
          options={DiscountFilters.ValueType}
        />
      </InputLabel>

      <FlexBox fxDirection={'row'} gap={16} alignItems={'flex-end'}>
        <InputLabel label={t('Value')} error={form.formState?.errors?.value} required>
          <InputText
            type={'number'}
            align={'center'}
            required
            step={0.01}
            min={0.01}
            {...register('value', { valueAsNumber: true, required: true })}
          />
        </InputLabel>

        <InputLabel label={t('Discount threshold')} error={form.formState?.errors?.threshold}>
          <InputText
            align={'center'}
            type={'number'}
            step={0.01}
            min={0.01}
            {...register('threshold', { valueAsNumber: true })}
          />
        </InputLabel>

        <InputLabel label={t('Discount limit')} error={form.formState?.errors?.limit}>
          <InputText
            align={'center'}
            type={'number'}
            step={0.01}
            min={0.01}
            {...register('limit', { valueAsNumber: true })}
          />
        </InputLabel>
      </FlexBox>

      {!!formValues.threshold && (
        <>
          <InputLabel label={t('Discount threshold type')} error={form.formState?.errors?.thresholdType}>
            <ButtonsGroup
              value={formValues.thresholdType}
              onSelect={registerOnSelect('thresholdType')}
              options={DiscountFilters.ThresholdType}
            />
          </InputLabel>
        </>
      )}

      {!!formValues.limit && (
        <>
          <InputLabel label={t('Discount limit type')} error={form.formState?.errors?.limitType}>
            <ButtonsGroup
              value={formValues.limitType}
              onSelect={registerOnSelect('limitType')}
              options={DiscountFilters.LimitType}
            />
          </InputLabel>
        </>
      )}

      {(!!formValues.limit || !!formValues.threshold) && (
        <>
          <InputLabel
            label={'Від якої суми рахуємо?' || t('Discount source volume')}
            // helperText={t('Від якої суми буде вираховуватись')}
          >
            <ButtonsGroup
              value={formValues.sourceVolume}
              onSelect={registerOnSelect('sourceVolume')}
              options={DiscountFilters.SourceVolume}
            />
          </InputLabel>
          <InputLabel
            label={'На яку суму орієнтуємось?' || t('Discount target volume')}
            // helperText={t('На яку суму орієнтуватись')}
          >
            <ButtonsGroup
              value={formValues.targetVolume}
              onSelect={registerOnSelect('targetVolume')}
              options={DiscountFilters.TargetVolume}
            />
          </InputLabel>
        </>
      )}

      <InputLabel label={t('Label')} error={form.formState?.errors?.label}>
        <InputText {...register('label')} />
      </InputLabel>

      <InputLabel label={t('Promo code')} error={form.formState?.errors?.promoCode} disabled>
        <InputText {...register('promoCode')} disabled />
      </InputLabel>
    </AccordionForm>
  );
}
