import FormCreateInner from '../../components/FormCreateInner';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import { IOrderTempSlot } from '../../../../redux/orders/orders.types';
import { t } from '../../../../lang';
import { Modals } from '../../../ModalProvider/Modals';

export interface FormAddOrderSlotProps {
  onSelect: (slot: IOrderTempSlot) => void;
}

const FormAddOrderSlot: React.FC<FormAddOrderSlotProps> = ({ onSelect, ...p }) => {
  const modalS = useModalService();

  return (
    <FormCreateInner
      buttonText={t('Add position to order')}
      onClick={() => {
        const m = modalS.handleOpenModal({
          Modal: Modals.FormSelectProduct,
          props: {
            onSubmit: d => {
              onSelect(d);

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
