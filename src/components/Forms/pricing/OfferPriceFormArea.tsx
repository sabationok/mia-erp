import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useCallback } from 'react';
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
import { AccordionForm } from '../../atoms/FormArea/AccordionForm';
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
import ButtonsGroup from '../../atoms/ButtonsGroup';
import { PriceTypeOptions } from '../../../data/priceManagement.data';
import { useAppDispatch } from '../../../redux/store.store';
import { setOfferDefaultsAction } from '../../../redux/products/offers.slice';

const validation = yup.object().shape({
  in: isNumberStringSchema.optional(),
  out: isNumberStringSchema.optional(),
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

export const OfferPriceFormArea = ({
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
  const Price = useCurrentPrice(price ?? { _id: updateId }) || Offer?.price;
  const dispatch = useAppDispatch();
  const service = useAppServiceProvider().get(ServiceName.priceManagement);
  const offersSrv = useAppServiceProvider().get(ServiceName.offers);

  // const [isDefault, setIsDefault] = useState(!Offer?.price);

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
      setAsDefault: !Offer?.price?._id,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const { formValues, setValue, handleSubmit } = form;

  const setIsDefault = (checked: boolean) => {
    setValue('setAsDefault', checked, { shouldTouch: true, shouldDirty: true });
  };
  const { in: costValue, out: priceValue } = formValues;

  const recalculateValues = useCallback(
    (_name?: PriceFormDataPath) => {
      const Cost = new FormPriceDecimal(costValue ?? 0);
      const Price = new FormPriceDecimal(priceValue ?? 0);
      const CommissionAmount = Price.minus(Cost);
      const CommissionPercentage = CommissionAmount.div(Price).times(100);

      if (Price.lte(0)) {
        setValue('in', Cost.toFixed(2));
        return;
      } else if (Cost.lte(0)) {
        setValue('out', Price.toFixed(2));
        return;
      }

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
    if (Offer?.price?._id && Offer?.price?._id === priceId) return;

    offersSrv.updateById({
      data: { data: { _id: offerId, data: { price: { _id: priceId } } } },
      onLoading: loaders.onLoading('set_default_price'),
      onSuccess: d => {},
    });
  };
  const onValid = ({ setAsDefault, ...fData }: IPriceFormData) => {
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
          if (Offer?._id && Offer?.price?._id === data?._id) {
            dispatch(setOfferDefaultsAction({ offerId: Offer?._id, data: { price: data } }));
          }

          if (setAsDefault && fData.offer?._id) {
            onSetAsDefault(fData.offer?._id, data._id);
          }
        }),
      });
      return;
    } else {
      service.addPriceToList({
        data: { data: { data: dataForReq as never }, updateCurrent: true },
        onLoading: loaders.onLoading('price'),
        onSuccess: data => {
          loaders.setData('create', data);
          form.setValue('_id', data._id);

          if (setAsDefault && fData.offer?._id) {
            onSetAsDefault(fData.offer?._id, data._id);
          } else {
            // submitOptions.state?.close && props?.onClose && props?.onClose();
          }
        },
      });
    }
  };

  const canSubmit = Object.values(form.formState.dirtyFields).some(el => !!el);

  return (
    <AccordionForm
      expandable={expandable ?? false}
      isOpen={isOpen ?? true}
      label={title ?? t('Main info')}
      isLoading={loaders.isLoading?.price || loaders.isLoading?.update || loaders.isLoading?.set_default_price}
      canSubmit={canSubmit}
      onSubmit={handleSubmit(onValid, e => {
        ToastService.warning('Invalid form data');
        console.error('[Validation error]', e);
      })}
    >
      <FlexBox padding={'0 0 8px'} flex={1} overflow={'auto'}>
        <InputLabel label={t('type')}>
          <ButtonsGroup
            value={formValues.type}
            options={PriceTypeOptions}
            onSelect={o => setValue('type', o.value, { shouldTouch: true, shouldDirty: true })}
          />
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

        <FlexBox padding={'0 8px 0 0'} fxDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Text>{t('Is default')}</Text>
          <Switch
            size={'44px'}
            disabled={Offer?.price?._id === Price?._id}
            checked={formValues.setAsDefault}
            onChange={ev => {
              setIsDefault(ev.checked);
            }}
          />
        </FlexBox>
      </FlexBox>
    </AccordionForm>
  );
};
