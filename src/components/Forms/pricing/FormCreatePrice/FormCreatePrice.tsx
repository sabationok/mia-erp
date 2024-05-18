import ModalForm, { ModalFormProps } from '../../../ModalForm';
import FlexBox from '../../../atoms/FlexBox';
import { IPriceFormData } from '../../../../types/price-management/priceManagement.types';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { useAppForm } from '../../../../hooks';
import FormProductSelectorForPricing from './FormProductSelectorForPricing';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { useCallback, useState } from 'react';
import { OfferEntity } from '../../../../types/offers/offers.types';
import { usePriceListsSelector, useProductsSelector } from '../../../../redux/selectors.store';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../components/FormAfterSubmitOptions';
import { t } from '../../../../lang';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { Path } from 'react-hook-form';
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
  onSubmit: AppSubmitHandler<IPriceFormData>;
  offer?: OfferEntity;
  variation?: VariationEntity;
  update?: string;
}
export type PriceFormDataPath = Path<IPriceFormData>;
const FormCreatePrice: React.FC<FormCreatePriceProps> = ({ defaultState, update, offer, onSubmit, ...props }) => {
  const productInState = useProductsSelector().currentOffer;
  const currentProduct = offer || productInState;
  const { lists } = usePriceListsSelector();
  const [showPriceListSelect, setShowPriceListSelect] = useState(false);
  const loaders = useLoaders<'price'>();

  const service = useAppServiceProvider()[ServiceName.priceManagement];

  const submitOptions = useAfterSubmitOptions();

  const priceForm = useAppForm<IPriceFormData>({
    defaultValues: {
      in: 0,
      out: 0,
      commission: { amount: 0, percentage: 0 },
      ...defaultState,
      offer: currentProduct,
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

  const handleSelectPriceList: OnRowClickHandler = useCallback(
    data => {
      data?._id && setValue('list._id', data?._id);
    },
    [setValue]
  );

  const onValid = (formData: IPriceFormData) => {
    const dataForReq = toReqData(formData);

    if (update) {
      service.updatePriceById({
        data: { data: { _id: update, data: dataForReq }, updateCurrent: true },
        onLoading: loaders.onLoading('price'),
        onSuccess: (data, meta) => {
          submitOptions.state?.close && props?.onClose && props?.onClose();
          ToastService.success('Price updated');
        },
      });
      return;
    } else {
      service.addPriceToList({
        data: { data: { data: dataForReq as never }, updateCurrent: true },
        onLoading: loaders.onLoading('price'),
        onSuccess: (data, meta) => {
          ToastService.success('Price created');
          submitOptions.state?.close && props?.onClose && props?.onClose();
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
      isLoading={loaders.isLoading?.price}
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
        {!currentProduct && (
          <FormProductSelectorForPricing
            title={'Select product for pricing'}
            disabled={!defaultState?.list?._id}
            selected={formValues?.offer}
            variation={formValues.variation}
            onChange={(p, v) => {
              setValue('offer', p);
              setValue('variation', v);
            }}
          />
        )}

        <FormPriceInputs
          form={priceForm}
          handleBlur={(_name, callback) => {
            return ev => {
              callback && callback(ev);
              recalculateValues();
            };
          }}
        />

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
          <InputLabel label={t('Select price list')} error={showPriceListSelect && errors.list}>
            <FlexBox fillWidth style={{ height: 250 }} padding={'0 2px'} overflow={'hidden'}>
              <TableList
                tableTitles={priceListColumns}
                tableData={lists}
                isSearch={false}
                onRowClick={handleSelectPriceList}
              />
            </FlexBox>
          </InputLabel>
        )}
      </FlexBox>
    </ModalForm>
  );
};

export default FormCreatePrice;
// if (!canCount) {
//   setValue('markupAmount', 0);
//   setValue('commissionAmount', 0);
//   setValue('markupPercentage', 0);
//   setValue('commissionPercentage', 0);
//   toast.info(`canCount: ${!canCount}`);
// }
// {/*<FlexBox fxDirection={'row'} gap={12}>*/}
// {/*  <InputLabel label={'Націнка, у %'} direction={'vertical'}>*/}
// {/*    <InputText placeholder={'Введіть % націнки'} type={'number'} {...register('markupPercentage')} />*/}
// {/*  </InputLabel>*/}

// {/*  <InputLabel label={'Націнка, фіксована'} direction={'vertical'}>*/}
// {/*    <InputText placeholder={'Введіть суму націнки'} type={'number'} {...register('markupAmount')} />*/}
// {/*  </InputLabel>*/}
// {/*</FlexBox>*/}
