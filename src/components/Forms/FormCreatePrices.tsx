import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { IPriceList, IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { OnlyUUID } from '../../redux/global.types';
import { UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';
import { useAppForm } from '../../hooks';
import FormCreateInner from './components/FormCreateInner';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import FormProductSelector from './components/FormProductSelector';

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
  const { formValues } = useAppForm({ defaultValues: defaultData });

  const onGoSelectProductClick = async () => {
    const modal = modals.handleOpenModal({
      ModalChildren: FormProductSelector,
      modalChildrenProps: {
        title: 'Select product for pricing',
      },
    });
  };

  return (
    <ModalForm
      title={`${defaultData ? 'Edit' : 'Create'} price for: ${formValues?.product?.label}`}
      {...props}
      extraFooter={<FormCreateInner buttonText={'Select product'} onClick={onGoSelectProductClick} />}
    >
      <FlexBox></FlexBox>
    </ModalForm>
  );
};
export default FormCreatePrices;
