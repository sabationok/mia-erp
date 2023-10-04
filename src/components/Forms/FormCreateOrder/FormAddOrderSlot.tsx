import FormCreateInner from '../components/FormCreateInner';
import { useModalService } from '../../ModalProvider/ModalProvider';
import { IOrderSlotBase } from '../../../redux/orders/orders.types';
import SelectProductModal from './SelectProductModal';

export interface FormAddOrderSlotProps {
  onSelect: (slot: IOrderSlotBase) => void;
}

const FormAddOrderSlot: React.FC<FormAddOrderSlotProps> = ({ onSelect, ...props }) => {
  const modalS = useModalService();

  return (
    <FormCreateInner
      buttonText={'Add position to order'}
      onClick={() => {
        const m = modalS.handleOpenModal({
          ModalChildren: SelectProductModal,
          modalChildrenProps: {
            title: 'Add product to order',

            onSubmit: d => {
              onSelect(d);
              console.log(d);

              if (d && m?.onClose) {
                m?.onClose();
              }
            },
          },
        });
      }}
    />
  );
};
export default FormAddOrderSlot;
