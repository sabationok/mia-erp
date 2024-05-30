import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useCallback, useState } from 'react';
import { useAppForm, useCurrentOffer, useCurrentPrice } from '../../../hooks';
import {
  IPriceFormData,
  OfferPriceTypeEnum,
  PriceEntity,
  PriceFormDataPath,
} from '../../../types/price-management/price-management.types';
import { yupResolver } from '@hookform/resolvers/yup';
import FormPriceInputs, { FormPriceDecimal } from './FormCreatePrice/FormPriceInputs';
import { toReqData } from '../../../utils';
import { ToastService } from '../../../services';
import { AccordionForm } from '../FormArea/AccordionForm';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { t } from '../../../lang';
import Switch from '../../atoms/Switch';
import { usePriceModalFormLoaders } from '../../Modals/CreatePriceModal';
import * as yup from 'yup';
import { isNumberStringSchema, UUIDRefSchema, UUIDSchema } from '../validation';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { OfferEntity } from '../../../types/offers/offers.types';
import { VariationEntity } from '../../../types/offers/variations.types';
import InputLabel from '../../atoms/Inputs/InputLabel';
import { PriceTypeOptions } from '../../../data/priceManagement.data';
import ButtonsGroup from '../../atoms/ButtonsGroup';

const validation = yup.object().shape({
  in: isNumberStringSchema.nullable(),
  out: isNumberStringSchema.required(),
  list: UUIDRefSchema.nullable(),
  offer: UUIDRefSchema.required(),
  variation: UUIDRefSchema.nullable(),
  offerId: UUIDSchema.nullable(),
  variationId: UUIDSchema.nullable(),
  listId: UUIDSchema.nullable(),
});

export interface FormCreatePriceAreaProps {
  onSubmit?: AppSubmitHandler<IPriceFormData>;
  offer?: OfferEntity;
  price?: PriceEntity;
  variation?: VariationEntity;
  updateId?: string;
  defaultState?: IPriceFormData;

  title?: string;
  expandable?: boolean;
  isOpen?: boolean;
}

export const CreatePriceFormArea = ({
  price,
  updateId,
  offer,
  defaultState,
  expandable,
  isOpen,
  title,
}: FormCreatePriceAreaProps) => {
  const loaders = usePriceModalFormLoaders();
  const Offer = useCurrentOffer(offer);
  const Price = useCurrentPrice(price ?? { _id: updateId });

  const service = useAppServiceProvider()[ServiceName.priceManagement];
  const offersSrv = useAppServiceProvider()[ServiceName.offers];
  const [isDefault, setIsDefault] = useState(false);

  const form = useAppForm<IPriceFormData>({
    defaultValues: {
      _id: updateId,
      type: OfferPriceTypeEnum.fixed,
      in: 0,
      out: 0,
      commission: { amount: 0, percentage: 0 },
      markup: { amount: 0, percentage: 0 },
      offer: Offer,
      ...defaultState,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const { formValues, setValue, handleSubmit } = form;

  const { in: costValue, out: priceValue } = formValues;

  const recalculateValues = useCallback(
    (_name?: PriceFormDataPath) => {
      const Cost = new FormPriceDecimal(costValue ?? 0);
      const Price = new FormPriceDecimal(priceValue ?? 0);
      const CommissionAmount = Price.minus(Cost);
      const CommissionPercentage = CommissionAmount.div(Price).times(100);

      setValue('in', Cost.toFixed(2));
      setValue('out', Price.toFixed(2));

      setValue('commission', {
        amount: CommissionAmount.toFixed(2),
        percentage: CommissionPercentage.toFixed(2),
      });

      setValue('markup', {
        amount: CommissionAmount.toFixed(2),
        percentage: CommissionPercentage.toFixed(2),
      });
    },
    [costValue, priceValue, setValue]
  );

  const onSetAsDefault = async (offerId: string, priceId: string) => {
    offersSrv.setDefaults({
      data: { data: { _id: offerId, defaults: { price: { _id: priceId } } } },
      onLoading: loaders.onLoading('set_default'),
    });
  };
  const onValid = (fData: IPriceFormData) => {
    const dataForReq = toReqData(fData);
    if (!fData?.offer?._id) {
      ToastService.warning('Not passed offer id');
      return;
    }
    if (fData?._id) {
      service.updatePriceById({
        data: { data: { _id: fData?._id, data: dataForReq }, updateCurrent: true },
        onLoading: loaders.onLoading('update'),
        onSuccess: loaders.onSuccess('update', (data, meta) => {
          if (isDefault && fData.offer?._id) {
            onSetAsDefault(fData.offer?._id, data._id);
          } else {
            // submitOptions.state?.close && props?.onClose && props?.onClose();
          }
        }),
      });
      return;
    } else {
      service.addPriceToList({
        data: { data: { data: dataForReq as never }, updateCurrent: true },
        onLoading: loaders.onLoading('create'),
        onSuccess: (data, meta) => {
          loaders.setData('create', data);
          form.setValue('_id', data._id);

          if (isDefault && fData.offer?._id) {
            onSetAsDefault(fData.offer?._id, data._id);
          } else {
            // submitOptions.state?.close && props?.onClose && props?.onClose();
          }
        },
      });
    }
  };

  return (
    <AccordionForm
      expandable={expandable ?? false}
      isOpen={isOpen ?? true}
      label={title ?? t('Main info')}
      isLoading={loaders.hasLoading}
      onSubmit={handleSubmit(onValid, e => {
        ToastService.warning('Invalid form data');
        console.error('[Validation error]', e);
      })}
    >
      <FlexBox padding={'0 0 8px'} flex={1} overflow={'auto'}>
        <InputLabel label={t('type')}>
          <ButtonsGroup value={formValues.type} options={PriceTypeOptions} onSelect={o => setValue('type', o.value)} />
        </InputLabel>

        <FormPriceInputs
          form={form}
          handleOnBlur={(_name, callback) => {
            return ev => {
              callback && callback(ev);
              recalculateValues();
            };
          }}
        />

        <FlexBox padding={'0 8px'} fxDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Text>{t('Set as default')}</Text>
          <Switch
            size={'44px'}
            disabled={!Offer?.price?._id || Offer?.price?._id === Price?._id}
            checked={!Offer?.price?._id || Offer?.price?._id === Price?._id || isDefault}
            onChange={ev => {
              setIsDefault(ev.checked);
            }}
          />
        </FlexBox>
      </FlexBox>
    </AccordionForm>
  );
};
