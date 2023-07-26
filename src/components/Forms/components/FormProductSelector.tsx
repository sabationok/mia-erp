import ModalForm, { ModalFormProps } from '../../ModalForm';
import { IProduct } from '../../../redux/products/products.types';
import TableList from '../../TableList/TableList';
import { useProductsTableSettings } from '../../AppPages/PageProducts';

export interface FormProductSelectorProps extends Omit<ModalFormProps, 'onSubmit'> {
  onSubmit?: (product?: IProduct) => void;
}

const FormProductSelector: React.FC<FormProductSelectorProps> = ({ onSubmit }) => {
  const { tableConfig } = useProductsTableSettings();

  return (
    <ModalForm fillHeight fitContentH>
      <TableList {...tableConfig} />
    </ModalForm>
  );
};
export default FormProductSelector;
