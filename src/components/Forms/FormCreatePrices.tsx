import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { IPriceList, IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { OnlyUUID } from '../../redux/global.types';
import { UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';
import { useAppForm } from '../../hooks';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import FormProductSelector from './components/FormProductSelector';
import InputLabel from '../atoms/Inputs/InputLabel';
import InputText from '../atoms/Inputs/InputText';
import { toast } from 'react-toastify';
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
    formState: { errors },
    formValues,
    register,
    setValue,
  } = useAppForm({ defaultValues: defaultData });

  const onGoSelectProductClick = async () => {
    const modal = modals.handleOpenModal({
      ModalChildren: FormProductSelector,
      modalChildrenProps: {
        title: 'Select product for pricing',
        onSelect: p => {
          console.log(p);
        },
      },
    });
  };
  const { commissionAmount, cost, commissionPercentage, price, markupAmount, markupPercentage } = formValues;
  const calculatePrice = async () => {
    const canCount = !(commissionAmount || commissionPercentage || markupAmount || markupPercentage);
    if (cost && price) {
      const dif = Number(price) - Number(cost);

      canCount &&
        setTimeout(() => {
          setValue('markupAmount', dif);
          setValue('commissionAmount', dif);
          setValue('markupPercentage', Math.floor(dif / price));
          setValue('commissionPercentage', Math.floor(dif / price));
        }, 5000);
      !canCount &&
        setTimeout(() => {
          setValue('markupAmount', 0);
          setValue('commissionAmount', 0);
          setValue('markupPercentage', 0);
          setValue('commissionPercentage', 0);
        }, 5000);
      toast(`cost && price`);
    }
  };
  useEffect(() => {
    calculatePrice();
  }, [formValues]);

  return (
    <ModalForm
      onSubmit={() => {
        calculatePrice();
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
          <InputLabel label={'Націнка, у %'} direction={'vertical'}>
            <InputText placeholder={'Введіть % націнки'} type={'number'} {...register('markupPercentage')} />
          </InputLabel>

          <InputLabel label={'Націнка, фіксована'} direction={'vertical'}>
            <InputText placeholder={'Введіть суму націнки'} type={'number'} {...register('markupAmount')} />
          </InputLabel>
        </FlexBox>

        <FlexBox fxDirection={'row'} gap={12}>
          <InputLabel label={'Комісія, у %'} direction={'vertical'}>
            <InputText placeholder={'Введіть % комісії'} type={'number'} {...register('commissionPercentage')} />
          </InputLabel>

          <InputLabel label={'Комісія, фіксована'} direction={'vertical'}>
            <InputText placeholder={'Введіть суму комісії'} type={'number'} {...register('commissionAmount')} />
          </InputLabel>
        </FlexBox>
      </FlexBox>
    </ModalForm>
  );
};
export default FormCreatePrices;
