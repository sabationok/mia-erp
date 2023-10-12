import ModalForm, { ModalFormProps } from '../../ModalForm';
import FlexBox from '../../atoms/FlexBox';
import { IPriceFormData } from '../../../redux/priceManagement/priceManagement.types';
import { UseAppFormSubmitOptions } from '../../../hooks/useAppForm.hook';
import { useAppForm } from '../../../hooks';
import FormProductSelectorForPricing from './FormProductSelectorForPricing';
import InputLabel from '../../atoms/Inputs/InputLabel';
import InputText from '../../atoms/Inputs/InputText';
import * as _ from 'lodash';
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

const validation = yup.object().shape({
  cost: yup.number(),
  price: yup.number(),
  variation: yup.object().shape({
    _id: yup.string().required(),
  }),
  list: yup.object().shape({
    _id: yup.string().required(),
  }),
  product: yup.object().shape({
    _id: yup.string().required(),
  }),
});

export interface FormCreatePriceProps
  extends Omit<ModalFormProps<any, any, IPriceFormData>, 'onSubmit' | 'afterSubmit'> {
  product?: IProduct;
  update?: string;
  onSubmit: (data: IPriceFormData, options: UseAppFormSubmitOptions & {}) => void;
}

const inputsFormCreatePrice: {
  name: Path<IPriceFormData>;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  autoFocus?: boolean;
}[] = [
  { label: t('Price IN'), placeholder: t('Price IN'), required: true, autoFocus: true, name: 'cost' },
  { label: t('Price OUT'), placeholder: t('Price OUT'), required: true, name: 'price' },
  {
    label: t('Commission amount'),
    placeholder: t('Enter commission amount'),
    disabled: true,
    name: 'commissionAmount',
  },
  {
    label: t('Commission percentage'),
    placeholder: t('Enter commission percentage'),
    disabled: true,
    name: 'commissionPercentage',
  },
];

const FormCreatePrice: React.FC<FormCreatePriceProps> = ({ defaultState, update, product, onSubmit, ...props }) => {
  const productInState = useProductsSelector().currentProduct;
  const { lists } = usePriceListsSelector();

  const service = useAppServiceProvider()[ServiceName.priceManagement];
  const currentProduct = useMemo(() => {
    return product || productInState;
  }, [product, productInState]);
  const {
    formValues,
    register,
    setValue,
    handleSubmit,
    toggleAfterSubmitOption,
    closeAfterSave,
    clearAfterSave,
    formState: { errors },
  } = useAppForm<IPriceFormData>({
    defaultValues: {
      price: 0,
      cost: 0,
      commissionAmount: 0,
      commissionPercentage: 0,
      ...defaultState,
      product: currentProduct,
    },
    resolver: yupResolver(validation),
    reValidateMode: 'onSubmit',
  });

  const { price, cost } = formValues;

  const calculateValuesThrottled = _.throttle(() => {
    // toast.info('calculateValuesThrottled throttle');
    const parseFloatFromValue = (v?: number) => parseFloat(v?.toString() ?? '0');
    const costNum = parseFloatFromValue(cost);

    const priceNum = parseFloatFromValue(price);

    const calculatedCommissionAmount = priceNum - costNum;
    const calculatedCommissionPercentage = (calculatedCommissionAmount / priceNum) * 100;

    setValue('commissionAmount', calculatedCommissionAmount ? Number(calculatedCommissionAmount.toFixed(2)) : 0);
    setValue(
      'commissionPercentage',
      calculatedCommissionPercentage ? Number(calculatedCommissionPercentage.toFixed(2)) : 0
    );
  }, 250);

  const handleSelectPriceList: OnRowClickHandler = useCallback(
    data => {
      data?._id && setValue('list._id', data?._id);
    },
    [setValue]
  );

  const recalculateValues = useCallback(() => calculateValuesThrottled(), [calculateValuesThrottled]);

  const onValid = (formData: IPriceFormData) => {
    const dataForReq = createDataForReq(formData);
    console.log(dataForReq);

    if (update) {
      service.updatePriceById({
        data: { data: { _id: update, data: dataForReq }, updateCurrent: true },
        onSuccess: (data, meta) => {
          console.log('update price', { data, meta });
          closeAfterSave && props?.onClose && props?.onClose();
        },
      });
      return;
    } else {
      service.addPriceToList({
        data: { data: { data: dataForReq }, updateCurrent: true },
        onSuccess: (data, meta) => {
          console.log('create new price', { data, meta });
          closeAfterSave && props?.onClose && props?.onClose();
        },
      });
    }

    onSubmit &&
      onSubmit(dataForReq, {
        closeAfterSave,
        clearAfterSave,
      });
  };

  useEffect(() => {
    recalculateValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cost, price, setValue]);

  return (
    <ModalForm
      onSubmit={handleSubmit(onValid)}
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

        <InputLabel label={t('Select price list')} error={errors.price}>
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
