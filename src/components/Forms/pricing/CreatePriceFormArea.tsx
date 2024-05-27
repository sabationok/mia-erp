import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useCallback, useState } from 'react';
import { useAppForm } from '../../../hooks';
import { IPriceFormData, PriceFormDataPath } from '../../../types/price-management/price-management.types';
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
import { ModalFormProps } from '../../ModalForm';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { OfferEntity } from '../../../types/offers/offers.types';
import { VariationEntity } from '../../../types/offers/variations.types';

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

export interface FormCreatePriceAreaProps
  extends Omit<ModalFormProps<any, any, IPriceFormData>, 'onSubmit' | 'afterSubmit'> {
  onSubmit?: AppSubmitHandler<IPriceFormData>;
  offer?: OfferEntity;
  variation?: VariationEntity;
  update?: string;
}

export const CreatePriceFormArea = ({ update, offer, defaultState }: FormCreatePriceAreaProps) => {
  const loaders = usePriceModalFormLoaders();
  // ! const Offer = useCurrentOffer(offer);

  const service = useAppServiceProvider()[ServiceName.priceManagement];
  const offersSrv = useAppServiceProvider()[ServiceName.offers];
  const [isDefault, setIsDefault] = useState(false);

  const priceForm = useAppForm<IPriceFormData>({
    defaultValues: {
      in: 0,
      out: 0,
      commission: { amount: 0, percentage: 0 },
      markup: { amount: 0, percentage: 0 },
      offer: offer,
      ...defaultState,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const { formValues, setValue, handleSubmit } = priceForm;

  const { in: cost, out: price } = formValues;

  const recalculateValues = useCallback(
    (_name?: PriceFormDataPath) => {
      const Cost = new FormPriceDecimal(cost ?? 0);
      const Price = new FormPriceDecimal(price ?? 0);
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
    [cost, price, setValue]
  );

  const onSetAsDefault = async (offerId: string, priceId: string) => {
    offersSrv.setDefaults({
      data: { _id: offerId, defaults: { price: { _id: priceId } } },
      onSuccess: () => {
        setIsDefault(false);
        // submitOptions.state?.close && props?.onClose && props?.onClose();
      },
      onLoading: loaders.onLoading('set_default'),
    });
  };
  const onValid = (formData: IPriceFormData) => {
    const dataForReq = toReqData(formData);
    if (!formData?.offer?._id) {
      ToastService.warning('Not passed offer id');
      return;
    }
    if (update) {
      service.updatePriceById({
        data: { data: { _id: update, data: dataForReq }, updateCurrent: true },
        onLoading: loaders.onLoading('update'),
        onSuccess: loaders.onSuccess('update', (data, meta) => {
          if (isDefault && formData.offer?._id) {
            onSetAsDefault(formData.offer?._id, data._id);
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

          if (isDefault && formData.offer?._id) {
            onSetAsDefault(formData.offer?._id, data._id);
          } else {
            // submitOptions.state?.close && props?.onClose && props?.onClose();
          }
        },
      });
    }
  };

  return (
    <AccordionForm
      expandable={false}
      isOpen
      label={t('Main info')}
      isLoading={loaders.hasLoading}
      onSubmit={handleSubmit(onValid, e => {
        ToastService.warning('Invalid form data');
        console.error('[Validation error]', e);
      })}
    >
      <FlexBox padding={'0 0 8px'} flex={1} overflow={'auto'}>
        <FormPriceInputs
          form={priceForm}
          handleOnBlur={(_name, callback) => {
            return ev => {
              callback && callback(ev);
              recalculateValues();
            };
          }}
        />

        <FlexBox padding={'8px'} fxDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Text>{t('Set as default')}</Text>
          <Switch
            size={'34px'}
            checked={isDefault}
            onChange={ev => {
              setIsDefault(ev.checked);
            }}
          />
        </FlexBox>
      </FlexBox>
    </AccordionForm>
  );
};
