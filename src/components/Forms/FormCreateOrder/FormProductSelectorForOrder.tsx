import FormCreateInner from '../components/FormCreateInner';
import { useModalService } from '../../ModalProvider/ModalProvider';
import { Modals } from '../../ModalProvider/Modals';
import { IProduct } from '../../../redux/products/products.types';

export interface FormProductSelectorForOrderProps {
  onSelect: (product: IProduct) => void;
}

const FormProductSelectorForOrder: React.FC<FormProductSelectorForOrderProps> = ({ onSelect, ...props }) => {
  const modalS = useModalService();

  return (
    <FormCreateInner
      buttonText={'Add product'}
      onClick={() => {
        const modal = modalS.handleOpenModal({
          Modal: Modals.SelectOrderSlotItemModal,
          props: {
            title: 'Add product to order',

            onSelect: d => {
              onSelect && onSelect(d);

              modal?.onClose();
            },
          },
        });
      }}
    />
  );
};
export default FormProductSelectorForOrder;
