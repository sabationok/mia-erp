import ModalForm, { ModalFormProps } from '../../ModalForm';
import FlexBox from '../../atoms/FlexBox';
import { IPriceFormData } from '../../../redux/priceManagement/priceManagement.types';
import { AppSubmitHandler } from '../../../hooks/useAppForm.hook';
import { useAppForm } from '../../../hooks';
import FormProductSelectorForPricing from './FormProductSelectorForPricing';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import { useCallback, useEffect, useMemo } from 'react';
import { IProduct } from '../../../redux/products/products.types';
import { usePriceListsSelector, useProductsSelector } from '../../../redux/selectors.store';
import FormAfterSubmitOptions from '../components/FormAfterSubmitOptions';
import { t } from '../../../lang';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import styled from 'styled-components';
import { Path } from 'react-hook-form';
import { createDataForReq } from '../../../utils/dataTransform';
import { OnRowClickHandler } from '../../TableList/tableTypes.types';
import TableList from '../../TableList/TableList';
import { priceListColumns } from '../../../data/priceManagement.data';
import { objUUIDSchema } from '../validation';
import _ from 'lodash';
import { AnyFn } from '../../../utils/types';
import { IVariation } from '../../../redux/products/variations.types';
import { ToastService } from '../../../services';

const throttleCallback = _.throttle(<T extends AnyFn>(fn: T) => {
  fn();
}, 1500);

const validation = yup.object().shape({
  in: yup.number(),
  out: yup.number(),
  list: objUUIDSchema.required(),
  product: objUUIDSchema.required(),
  variation: objUUIDSchema,
});

export interface FormCreatePriceProps
  extends Omit<ModalFormProps<any, any, IPriceFormData>, 'onSubmit' | 'afterSubmit'> {
  onSubmit: AppSubmitHandler<IPriceFormData>;
  product?: IProduct;
  variation?: IVariation;
  update?: string;
}
export type PriceFormDataPath = Path<IPriceFormData>;
const inputsFormCreatePrice: {
  name: PriceFormDataPath;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
}[] = [
  { label: t('Price IN'), placeholder: t('Price IN'), required: true, autoFocus: true, name: 'in' },
  { label: t('Price OUT'), placeholder: t('Price OUT'), required: true, name: 'out' },
  {
    label: t('Commission, amount'),
    placeholder: t('Enter commission amount'),
    disabled: true,
    name: 'cashback.amount',
  },
  {
    label: t('Commission, %'),
    placeholder: t('Enter commission percentage'),
    disabled: true,
    name: 'cashback.percentage',
  },
];

const FormCreatePrice: React.FC<FormCreatePriceProps> = ({ defaultState, update, product, onSubmit, ...props }) => {
  const productInState = useProductsSelector().currentProduct;
  const { lists } = usePriceListsSelector();

  const service = useAppServiceProvider()[ServiceName.priceManagement];
  const currentProduct = useMemo(() => {
    return product || productInState;
  }, [product, productInState]);

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
    formValues,
    register,
    setValue,
    handleSubmit,
    toggleAfterSubmitOption,
    closeAfterSave,
    clearAfterSave,
    formState: { errors },
  } = priceForm;

  const { in: price, out: cost } = formValues;

  const recalculateValues = useCallback(() => {
    const parseFloatFromValue = (v?: number) => parseFloat(v?.toString() ?? '0');
    const costNum = parseFloatFromValue(cost);

    const priceNum = parseFloatFromValue(price);

    const calculatedCommissionAmount = priceNum - costNum;
    const calculatedCommissionPercentage = (calculatedCommissionAmount / priceNum) * 100;

    setValue('cashback.amount', calculatedCommissionAmount ? Number(calculatedCommissionAmount.toFixed(2)) : 0);
    setValue(
      'cashback.percentage',
      calculatedCommissionPercentage ? Number(calculatedCommissionPercentage.toFixed(2)) : 0
    );
  }, [cost, price, setValue]);

  const handleSelectPriceList: OnRowClickHandler = useCallback(
    data => {
      data?._id && setValue('list._id', data?._id);
    },
    [setValue]
  );

  const onValid = (formData: IPriceFormData) => {
    const dataForReq = createDataForReq(formData);

    if (update) {
      service.updatePriceById({
        data: { data: { _id: update, data: dataForReq }, updateCurrent: true },
        onSuccess: (data, meta) => {
          closeAfterSave && props?.onClose && props?.onClose();
          ToastService.success('Price updated');
        },
      });
      return;
    } else {
      service.addPriceToList({
        data: { data: { data: dataForReq as never }, updateCurrent: true },
        onSuccess: (data, meta) => {
          closeAfterSave && props?.onClose && props?.onClose();
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

  useEffect(() => {
    // const throttledCallback=_.throttle(recalculateValues)
    throttleCallback(recalculateValues);
  }, [cost, price, recalculateValues]);
  // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <ModalForm
      onSubmit={handleSubmit(onValid, e => {
        ToastService.warning('Invalid form data');
        console.log(e);
      })}
      fillHeight
      title={`${update ? 'Edit' : 'Create'} price for: ${formValues?.variation?.label || '---'}`}
      extraFooter={
        <FormAfterSubmitOptions
          closeAfterSave={closeAfterSave}
          clearAfterSave={closeAfterSave}
          toggleOption={toggleAfterSubmitOption}
        />
      }
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

        <Inputs>
          {inputsFormCreatePrice.map(info => {
            return (
              <InputLabel
                key={`input_${info.name}`}
                label={info?.label}
                required={info?.required}
                disabled={info?.disabled}
                error={errors[info.name as never]}
              >
                <InputText
                  align={'right'}
                  {...register(info?.name, { valueAsNumber: true })}
                  placeholder={info?.placeholder}
                  required={info?.required}
                  autoFocus={info?.autoFocus}
                  disabled={info?.disabled}
                  type={'number'}
                  style={{ textAlign: 'center' }}
                />
              </InputLabel>
            );
          })}
        </Inputs>
      </FlexBox>
    </ModalForm>
  );
};
const Inputs = styled.div`
  display: grid;
  grid-template-columns: 2fr 2fr;

  gap: 8px;

  padding: 0 8px;
`;
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
