import ModalForm, { ModalFormProps } from '../../../ModalForm';
import FlexBox from '../../../atoms/FlexBox';
import { IPriceFormData, PriceFormDataPath } from '../../../../types/price-management/price-management.types';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { useAppForm } from '../../../../hooks';
import { useCallback, useState } from 'react';
import { OfferEntity } from '../../../../types/offers/offers.types';
import { useOffersSelector, usePriceManagementSelector } from '../../../../redux/selectors.store';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../components/FormAfterSubmitOptions';
import { t } from '../../../../lang';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { toReqData } from '../../../../utils';
import { OnRowClickHandler } from '../../../TableList/tableTypes.types';
import TableList from '../../../TableList/TableList';
import { priceListColumns } from '../../../../data/priceManagement.data';
import { UUIDRefSchema } from '../../validation';
import { VariationEntity } from '../../../../types/offers/variations.types';
import { ToastService } from '../../../../services';
import FormPriceInputs, { FormPriceDecimal } from './FormPriceInputs';
import { Text } from '../../../atoms/Text';
import Switch from '../../../atoms/Switch';
import { useLoaders } from '../../../../Providers/Loaders/useLoaders.hook';
import { UUID } from '../../../../types/utils.types';

const isStringOrNumber = yup
  .mixed()
  .test('is-string-or-number', 'Value must be a string or a number', function (value: any) {
    return typeof value === 'string' || typeof value === 'number';
  });

const validation = yup.object().shape({
  in: isStringOrNumber,
  out: isStringOrNumber.required(),
  list: UUIDRefSchema.optional(),
  offer: UUIDRefSchema.required(),
  variation: UUIDRefSchema.optional(),
});

export interface FormCreatePriceProps
  extends Omit<ModalFormProps<any, any, IPriceFormData>, 'onSubmit' | 'afterSubmit'> {
  onSubmit?: AppSubmitHandler<IPriceFormData>;
  offer?: OfferEntity;
  variation?: VariationEntity;
  update?: string;
}
const FormCreatePrice: React.FC<FormCreatePriceProps> = ({ defaultState, update, offer, onSubmit, ...props }) => {
  const service = useAppServiceProvider()[ServiceName.priceManagement];
  const offersSrv = useAppServiceProvider()[ServiceName.offers];
  const productInState = useOffersSelector().currentOffer;
  const currentOffer = offer || productInState;

  const loaders = useLoaders<'price' | 'set_default'>({
    price: { content: 'Creating...' },
    set_default: { content: 'Updating offer...' },
  });
  const [showPriceListSelect, setShowPriceListSelect] = useState(false);
  const [isDefault, setIsDefault] = useState(false);

  const submitOptions = useAfterSubmitOptions();

  const priceForm = useAppForm<IPriceFormData>({
    defaultValues: {
      in: 0,
      out: 0,
      commission: { amount: 0, percentage: 0 },
      markup: { amount: 0, percentage: 0 },
      ...defaultState,
      offer: currentOffer,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });
  const {
    formState: { errors },
    formValues,
    setValue,
    handleSubmit,
  } = priceForm;

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

  const onSetAsDefault = (offerId: string, priceId: string) => {
    offersSrv.setDefaults({
      data: { _id: offerId, defaults: { price: { _id: priceId } } },
      onSuccess: () => {
        setIsDefault(false);
        submitOptions.state?.close && props?.onClose && props?.onClose();
      },
      onLoading: loaders.onLoading('set_default'),
    });
  };
  const onValid = (formData: IPriceFormData) => {
    const dataForReq = toReqData(formData);

    if (update) {
      service.updatePriceById({
        data: { data: { _id: update, data: dataForReq }, updateCurrent: true },
        onLoading: loaders.onLoading('price'),
        onSuccess: (data, meta) => {
          ToastService.success('Price updated');

          if (isDefault && formData.offer?._id) {
            onSetAsDefault(formData.offer?._id, data._id);
          } else {
            submitOptions.state?.close && props?.onClose && props?.onClose();
          }
        },
      });
      return;
    } else {
      service.addPriceToList({
        data: { data: { data: dataForReq as never }, updateCurrent: true },
        onLoading: loaders.onLoading('price'),
        onSuccess: (data, meta) => {
          ToastService.success('Price created');

          if (isDefault && formData.offer?._id) {
            onSetAsDefault(formData.offer?._id, data._id);
          } else {
            submitOptions.state?.close && props?.onClose && props?.onClose();
          }
        },
      });
    }

    // onSubmit &&
    //   onSubmit(dataForReq as never, {
    //     closeAfterSave,
    //     clearAfterSave,
    //   });
  };

  return (
    <ModalForm
      isLoading={loaders.hasLoading}
      onSubmit={handleSubmit(onValid, e => {
        ToastService.warning('Invalid form data');
        console.log(e);
      })}
      fillHeight
      title={`${update ? 'Edit' : 'Create'} price for: ${
        formValues?.offer?.label || formValues?.variation?.label || '---'
      }`}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
      {...props}
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
            onChange={ev => {
              setIsDefault(ev.checked);
            }}
          />
        </FlexBox>

        <FlexBox padding={'8px'} fxDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Text>{t('Add to price list')}</Text>
          <Switch
            size={'34px'}
            onChange={ev => {
              setShowPriceListSelect(ev.checked);
            }}
          />
        </FlexBox>

        {showPriceListSelect && (
          <PriceListSelectArea
            error={errors?.list?.message}
            onSelect={info => {
              setValue('list._id', info);
            }}
          />
        )}
      </FlexBox>
    </ModalForm>
  );
};

export default FormCreatePrice;

const PriceListSelectArea = ({ onSelect }: { onSelect?: (info: UUID) => void; error?: string }) => {
  const { lists } = usePriceManagementSelector();

  const handleSelectPriceList: OnRowClickHandler = data => {
    data?.rowId && onSelect && onSelect(data?.rowId);
  };

  return (
    <FlexBox fillWidth style={{ height: 250 }} padding={'8px 4px'} overflow={'hidden'}>
      <TableList
        tableTitles={priceListColumns}
        tableData={lists}
        hasSearch={false}
        onRowClick={handleSelectPriceList}
      />
    </FlexBox>
  );
};
