import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { IPriceList, IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { OnlyUUID } from '../../redux/global.types';
import { UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';
import { useAppForm } from '../../hooks';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import FormProductSelector from './components/FormProductSelector/FormProductSelector';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { toast } from 'react-toastify';
import * as _ from 'lodash';
import { useEffect } from 'react';

export interface FormCreatePricesProps extends Omit<ModalFormProps, 'onSubmit' | 'afterSubmit'> {
  list?: IPriceList;
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
  const modals = useModalProvider();
  const {
    formState: { errors, touchedFields },
    formValues,
    register,
    setValue,
  } = useAppForm({ defaultValues: defaultData });
  useEffect(() => {
    console.log('touchedFields', touchedFields);
  });
  const { commissionAmount, cost, commissionPercentage, price, markupAmount, markupPercentage } = formValues;
  useEffect(() => {
    const recalculateValues = _.debounce(async () => {
      toast.info(`canCount: ${'canCount'}`);

      const parseFloatFromValue = (v?: number) => parseFloat(v?.toString() ?? '0');
      const costNum = parseFloatFromValue(cost);
      const priceNum = parseFloatFromValue(price);

      const commissionPercentageNum = parseFloatFromValue(commissionPercentage);
      const commissionAmountNum = parseFloatFromValue(commissionAmount);

      const commissionFromPrice = (priceNum * commissionPercentageNum) / 100;

      const calculatedCommissionAmount = commissionFromPrice || commissionAmountNum;
      const calculatedCommissionPercentage = commissionFromPrice
        ? (commissionFromPrice / priceNum) * 100
        : commissionPercentageNum;

      // Оновлення полів форми
      // setValue('commissionAmount', calculatedCommissionAmount.toFixed(2));
      // setValue('commissionPercentage', calculatedCommissionPercentage.toFixed(2));

      // Виклик функції для ініціалізації значень
      recalculateValues();
    }, 1000);
  });

  return (
    <ModalForm
      onSubmit={() => {
        console.log(formValues);
      }}
      title={`${defaultData ? 'Edit' : 'Create'} price for: ${formValues?.product?.label}`}
      {...props}
      // extraFooter={<FormCreateInner buttonText={'Select product'} onClick={onGoSelectProductClick} />}
    >
      <FlexBox padding={'8px 16px 16px'}>
        <FormProductSelector title={'Select product for pricing'} />

        <FlexBox fxDirection={'row'} gap={12}>
          <InputLabel label={'Вхідна ціна'} direction={'vertical'}>
            <InputText placeholder={'Вхідна ціна'} type={'number'} {...register('cost')} autoFocus />
          </InputLabel>

          <InputLabel label={'Вихідна ціна'} direction={'vertical'}>
            <InputText placeholder={'Вихідна ціна'} type={'number'} {...register('price')} />
          </InputLabel>
        </FlexBox>

        <FlexBox fxDirection={'row'} gap={12}>
          <InputLabel label={'Комісія, у %'} direction={'vertical'} disabled>
            <InputText
              placeholder={'Введіть % комісії'}
              type={'number'}
              {...register('commissionPercentage')}
              disabled
            />
          </InputLabel>

          <InputLabel label={'Комісія, фіксована'} direction={'vertical'} disabled>
            <InputText
              placeholder={'Введіть суму комісії'}
              type={'number'}
              {...register('commissionAmount')}
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
