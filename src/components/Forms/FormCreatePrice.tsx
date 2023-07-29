import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { OnlyUUID } from '../../redux/global.types';
import { UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';
import { useAppForm } from '../../hooks';
import FormProductSelector from './components/FormProductSelector';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import * as _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { IProduct, IStorageItem } from '../../redux/products/products.types';
import * as yup from 'yup';
import { usePriceListsSelector } from '../../redux/selectors.store';
import CustomSelect from '../atoms/Inputs/CustomSelect';

const validation = yup.object().shape({
  cost: yup.number(),
  price: yup.number(),
});

export interface FormCreatePricesProps
  extends Omit<ModalFormProps<any, any, IPriceListItem>, 'onSubmit' | 'afterSubmit'> {
  list?: OnlyUUID;
  product?: IProduct | IStorageItem;
  onSubmit: (
    data: {
      data: IPriceListItem | IPriceListItem[];
      list: OnlyUUID;
    },
    options: UseAppFormAfterSubmitOptions & {}
  ) => void;
}

const FormCreatePrice: React.FC<FormCreatePricesProps> = ({ defaultState, product, list, onSubmit, ...props }) => {
  const { formValues, register, setValue, handleSubmit, registerSelect } = useAppForm<IPriceListItem>({
    defaultValues: { ...defaultState, product },
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

  const onValid = (d: IPriceListItem) => {
    const data: IPriceListItem = { ...d, price: Number(d.price), cost: Number(d.cost) };
    console.log('onValid', { list, data, onSubmit });
    list &&
      onSubmit &&
      onSubmit(
        {
          data: d,
          list,
        },
        {}
      );
  };

  useEffect(() => {
    console.log(product);

    console.log(lists);
  }, [product, lists]);

  useEffect(() => {
    recalculateValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cost, price, setValue]);
  return (
    <ModalForm
      isValid={!!formValues.product}
      onSubmit={handleSubmit(onValid)}
      title={`${defaultState?._id ? 'Edit' : 'Create'} price for: ${formValues?.product?.label}`}
      {...props}
    >
      <FlexBox padding={'8px 16px 16px'}>
        <FormProductSelector
          selected={formValues.product}
          disabled={!list?._id}
          title={'Select product for pricing'}
          onSelect={(p: IProduct) => {
            setValue('product', p);
          }}
        />

        {!list?._id && (
          <CustomSelect
            {...registerSelect('list', {
              options: lists,
              label: 'Прайс лист',
              placeholder: 'Оберіть прайс лист',
            })}
          />
        )}

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
              {...register('commissionAmount')}
              disabled
            />
          </InputLabel>

          <InputLabel label={'Комісія, у %'} direction={'vertical'} disabled>
            <InputText
              placeholder={'Введіть % комісії'}
              type={'number'}
              {...register('commissionPercentage')}
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
