import ModalForm, { ModalFormProps } from '../../../ModalForm';
import FlexBox from '../../../atoms/FlexBox';
import { IPriceFormData } from '../../../../types/price-management/priceManagement.types';
import { AppSubmitHandler } from '../../../../hooks/useAppForm.hook';
import { useAppForm } from '../../../../hooks';
import FormProductSelectorForPricing from './FormProductSelectorForPricing';
import InputLabel from '../../../atoms/Inputs/InputLabel';
import { useCallback, useMemo } from 'react';
import { OfferEntity } from '../../../../types/offers/offers.types';
import { usePriceListsSelector, useProductsSelector } from '../../../../redux/selectors.store';
import FormAfterSubmitOptions, { useAfterSubmitOptions } from '../../components/FormAfterSubmitOptions';
import { t } from '../../../../lang';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { Path } from 'react-hook-form';
import { toReqData } from '../../../../utils/data-transform';
import { OnRowClickHandler } from '../../../TableList/tableTypes.types';
import TableList from '../../../TableList/TableList';
import { priceListColumns } from '../../../../data/priceManagement.data';
import { UUIDRefSchema } from '../../validation';
import { VariationEntity } from '../../../../types/offers/variations.types';
import { ToastService } from '../../../../services';
import FormPriceInputs from './FormPriceInputs';

const validation = yup.object().shape({
  in: yup.number(),
  out: yup.number(),
  list: UUIDRefSchema.required(),
  product: UUIDRefSchema.required(),
  variation: UUIDRefSchema,
});

export interface FormCreatePriceProps
  extends Omit<ModalFormProps<any, any, IPriceFormData>, 'onSubmit' | 'afterSubmit'> {
  onSubmit: AppSubmitHandler<IPriceFormData>;
  product?: OfferEntity;
  variation?: VariationEntity;
  update?: string;
}
export type PriceFormDataPath = Path<IPriceFormData>;

const FormCreatePrice: React.FC<FormCreatePriceProps> = ({ defaultState, update, product, onSubmit, ...props }) => {
  const productInState = useProductsSelector().currentOffer;
  const { lists } = usePriceListsSelector();

  const service = useAppServiceProvider()[ServiceName.priceManagement];
  const currentProduct = useMemo(() => {
    return product || productInState;
  }, [product, productInState]);

  const submitOptions = useAfterSubmitOptions();

  const priceForm = useAppForm<IPriceFormData>({
    defaultValues: {
      in: 0,
      out: 0,
      commission: { amount: 0, percentage: 0 },
      ...defaultState,
      product: currentProduct,
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
    (name?: PriceFormDataPath) => {
      const parseFloatFromValue = (v?: number) => parseFloat(v?.toString() ?? '0');
      const costNum = parseFloatFromValue(cost);

      const priceNum = parseFloatFromValue(price);

      const calculatedCommissionAmount = priceNum - costNum;
      const calculatedCommissionPercentage = (calculatedCommissionAmount / priceNum) * 100;

      setValue('commission', {
        amount: calculatedCommissionAmount ? Number(calculatedCommissionAmount.toFixed(2)) : 0,
        percentage: calculatedCommissionPercentage ? Number(calculatedCommissionPercentage.toFixed(2)) : 0,
      });

      setValue('markup', {
        amount: calculatedCommissionAmount ? Number(calculatedCommissionAmount.toFixed(2)) : 0,
        percentage: calculatedCommissionPercentage ? Number(calculatedCommissionPercentage.toFixed(2)) : 0,
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
        onSuccess: (data, meta) => {
          submitOptions.state?.close && props?.onClose && props?.onClose();
          ToastService.success('Price updated');
        },
      });
      return;
    } else {
      service.addPriceToList({
        data: { data: { data: dataForReq as never }, updateCurrent: true },
        onSuccess: (data, meta) => {
          submitOptions.state?.close && props?.onClose && props?.onClose();
          ToastService.success('Price created');
        },
      });
    }

    // onSubmit &&
    //   onSubmit(dataForReq as never, {
    //     closeAfterSave,
    //     clearAfterSave,
    //   });
  };

  // useEffect(() => {
  //   // const throttledCallback=_.throttle(recalculateValues)
  //   throttleCallback(recalculateValues);
  // }, [cost, price, recalculateValues]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <ModalForm
      onSubmit={handleSubmit(onValid, e => {
        ToastService.warning('Invalid form data');
        console.log(e);
      })}
      fillHeight
      title={`${update ? 'Edit' : 'Create'} price for: ${formValues?.variation?.label || '---'}`}
      extraFooter={<FormAfterSubmitOptions {...submitOptions} />}
      {...props}
    >
      <FlexBox padding={'0 0 8px'} flex={1} overflow={'auto'}>
        <FormProductSelectorForPricing
          selected={formValues.product}
          disabled={!defaultState?.list?._id}
          title={'Select product for pricing'}
          variation={formValues.variation}
          onChange={(p, v) => {
            setValue('product', p);
            setValue('variation', v);
          }}
        />

        <InputLabel label={t('Select price list')} error={errors.list}>
          <FlexBox fillWidth style={{ height: 250 }} padding={'0 2px'} overflow={'hidden'}>
            <TableList
              tableTitles={priceListColumns}
              tableData={lists}
              isSearch={false}
              onRowClick={handleSelectPriceList}
            />
          </FlexBox>
        </InputLabel>

        <FormPriceInputs
          form={priceForm}
          handleBlur={(name, callback) => {
            return ev => {
              console.log({ name }, { ev });
              callback && callback(ev);
              recalculateValues();
            };
          }}
        />
      </FlexBox>
    </ModalForm>
  );
};
// const Inputs = styled.div`
//   display: grid;
//   grid-template-columns: 2fr 2fr;
//
//   gap: 8px;
//
//   padding: 0 8px;
// `;
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
