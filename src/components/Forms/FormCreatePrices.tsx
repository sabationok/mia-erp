import ModalForm, { ModalFormProps } from '../ModalForm';
import FlexBox from '../atoms/FlexBox';
import { IPriceList, IPriceListItem } from '../../redux/priceManagement/priceManagement.types';
import { OnlyUUID } from '../../redux/global.types';
import { UseAppFormAfterSubmitOptions } from '../../hooks/useAppForm.hook';

export interface FormCreatePricesProps extends Omit<ModalFormProps, 'onSubmit' | 'afterSubmit'> {
  list?: IPriceList;
  onSubmit: (
    data: {
      data: IPriceListItem | IPriceListItem[];
      list: OnlyUUID;
    },
    options: UseAppFormAfterSubmitOptions & {}
  ) => void;
}

const FormCreatePrices: React.FC<FormCreatePricesProps> = ({ list, onSubmit }) => {
  return (
    <ModalForm>
      <FlexBox></FlexBox>
    </ModalForm>
  );
};
export default FormCreatePrices;
