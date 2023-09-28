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
// import * as yup from 'yup';
import { usePriceListsSelector } from '../../../redux/selectors.store';
import CustomSelect from '../../atoms/Inputs/CustomSelect/CustomSelect';
import FormAfterSubmitOptions from '../components/FormAfterSubmitOptions';

// const validation = yup.object().shape({
//   cost: yup.number(),
//   price: yup.number(),
// });

export interface FormCreatePriceProps
  extends Omit<ModalFormProps<any, any, IPriceFormData>, 'onSubmit' | 'afterSubmit'> {
  product?: IProduct;
  update?: string;
  onSubmit: (data: IPriceFormData, options: UseAppFormSubmitOptions & {}) => void;
}

const FormCreatePrice: React.FC<FormCreatePriceProps> = ({ defaultState, update, product, onSubmit, ...props }) => {
  const currentProduct = useMemo(() => {
    return product;
  }, [product]);
  const {
    formValues,
    register,
    setValue,
    handleSubmit,
    registerSelect,
    toggleAfterSubmitOption,
    closeAfterSave,
    clearAfterSave,
  } = useAppForm<IPriceFormData>({
    defaultValues: { ...defaultState, product: currentProduct },
  });

  const { lists } = usePriceListsSelector();

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

  const recalculateValues = useCallback(() => calculateValuesThrottled(), [calculateValuesThrottled]);

  const onValid = (formData: IPriceFormData) => {
    const data: IPriceFormData = { ...formData, price: Number(formData.price), cost: Number(formData.cost) };

    onSubmit &&
      onSubmit(formData, {
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
      isValid={!!formValues.product}
      onSubmit={handleSubmit(onValid)}
      fillHeight
      title={`${update ? 'Edit' : 'Create'} price for: ${formValues?.product?.label || '---'} | ${
        formValues?.variation?.label || '---'
      }`}
      extraFooter={
        <FormAfterSubmitOptions
          closeAfterSave={closeAfterSave}
          clearAfterSave={closeAfterSave}
          toggleOption={toggleAfterSubmitOption}
        />
      }
      {...props}
    >
      <FlexBox padding={'8px'} flex={1}>
        <FormProductSelectorForPricing
          selected={formValues.product}
          disabled={!defaultState?.list?._id}
          title={'Select product for pricing'}
          onSelect={(p: IProduct) => {
            setValue('product', p);
          }}
        />

        <CustomSelect
          {...registerSelect('list', {
            options: lists,
            dropDownIsAbsolute: true,
            label: 'Прайс лист',
            placeholder: 'Оберіть прайс лист',
            getLabel: d => {
              return `${d?.label}`;
            },
          })}
        />

        <FlexBox fxDirection={'row'} gap={12}>
          <InputLabel label={'Вхідна ціна'} direction={'vertical'} required>
            <InputText
              placeholder={'Вхідна ціна'}
              type={'number'}
              {...register('cost', { valueAsNumber: true })}
              required
              autoFocus
            />
          </InputLabel>

          <InputLabel label={'Вихідна ціна'} direction={'vertical'} required>
            <InputText
              placeholder={'Вихідна ціна'}
              type={'number'}
              {...register('price', { valueAsNumber: true })}
              required
            />
          </InputLabel>
        </FlexBox>

        <FlexBox fxDirection={'row'} gap={12}>
          <InputLabel label={'Комісійна винагорода'} direction={'vertical'} disabled>
            <InputText
              placeholder={'Введіть суму комісії'}
              type={'number'}
              {...register('commissionAmount', { valueAsNumber: true })}
              disabled
            />
          </InputLabel>

          <InputLabel label={'Комісія, у %'} direction={'vertical'} disabled>
            <InputText
              placeholder={'Введіть % комісії'}
              type={'number'}
              {...register('commissionPercentage', { valueAsNumber: true })}
              disabled
            />
          </InputLabel>
        </FlexBox>
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
