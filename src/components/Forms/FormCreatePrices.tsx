import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { OnlyUUID } from '../../redux/global.types';
import { UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';
import { useAppForm } from '../../hooks';
import FormProductSelector from './components/FormProductSelector/FormProductSelector';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import * as _ from 'lodash';
import { useCallback, useEffect } from 'react';
import { IProduct } from '../../redux/products/products.types';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup';
// reValidateMode: 'onChange', resolver: yupResolver(validation)
export interface FormCreatePricesProps extends Omit<ModalFormProps, 'onSubmit' | 'afterSubmit'> {
  list: OnlyUUID;
  defaultData?: IPriceListItem;
  onSubmit: (
    data: {
      data: IPriceListItem | IPriceListItem[];
      list: OnlyUUID;
    },
    options: UseAppFormAfterSubmitOptions & {}
  ) => void;
}

const FormCreatePrices: React.FC<FormCreatePricesProps> = ({ defaultData, list, onSubmit, ...props }) => {
  const { formValues, register, setValue, handleSubmit } = useAppForm({ defaultValues: defaultData });

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

  useEffect(() => {
    recalculateValues();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cost, price, setValue]);
  const onValid = (d: IPriceListItem) => {
    const data: IPriceListItem = { ...d, price: Number(d.price), cost: Number(d.cost) };
    console.log('onValid', { list, data, onSubmit });
    list &&
      onSubmit &&
      onSubmit(
        {
          data,
          list,
        },
        {}
      );
  };
  return (
    <ModalForm
      isValid={!!formValues.product}
      onSubmit={handleSubmit(onValid)}
      title={`${defaultData ? 'Edit' : 'Create'} price for: ${formValues?.product?.label}`}
      {...props}
    >
      <FlexBox padding={'8px 16px 16px'}>
        <FormProductSelector
          selected={formValues.product}
          title={'Select product for pricing'}
          onSelect={(p: IProduct) => {
            setValue('product', p);
          }}
        />

        <FlexBox fxDirection={'row'} gap={12}>
          <InputLabel label={'Вхідна ціна'} direction={'vertical'} required>
            <InputText placeholder={'Вхідна ціна'} type={'number'} {...register('cost')} required autoFocus />
          </InputLabel>

          <InputLabel label={'Вихідна ціна'} direction={'vertical'} required>
            <InputText placeholder={'Вихідна ціна'} type={'number'} {...register('price')} required />
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
export default FormCreatePrices;
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
