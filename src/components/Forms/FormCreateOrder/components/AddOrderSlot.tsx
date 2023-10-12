import FormCreateInner from '../../components/FormCreateInner';
import { useModalService } from '../../../ModalProvider/ModalProvider';
import { IOrderTempSlot } from '../../../../redux/orders/orders.types';
import { t } from '../../../../lang';
import { Modals } from '../../../Modals';

export interface FormAddOrderSlotProps {
  onSelect: (slot: IOrderTempSlot) => void;
}

const AddOrderSlot: React.FC<FormAddOrderSlotProps> = ({ onSelect, ...p }) => {
  const modalS = useModalService();

  return (
    <FormCreateInner
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
