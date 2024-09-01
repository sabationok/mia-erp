import ExtraFooterWithButton from '../../../atoms/ExtraFooterWithButton';
import { useModalService } from '../../../../Providers/ModalProvider/ModalProvider';
import { t } from '../../../../i18e';
import { Modals } from '../../../Modals/Modals';
import { IOrderTempSlot } from '../../../../types/orders/order-slot.types';

export interface FormAddOrderSlotProps {
  onSelect: (slot: IOrderTempSlot) => void;
}

const AddOrderSlot: React.FC<FormAddOrderSlotProps> = ({ onSelect, ...p }) => {
  const modalS = useModalService();

  return (
    <ExtraFooterWithButton
      buttonText={t('Add position to group')}
      onClick={() => {
        const m = modalS.open({
          Modal: Modals.FormCreateOrderSlot,
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
export default AddOrderSlot;
