import FormCreateInner from '../components/FormCreateInner';
import { useModalService } from '../../ModalProvider/ModalProvider';
import { Modals } from '../../ModalProvider/Modals';
import { IProduct } from '../../../redux/products/products.types';
import { IOrderSlot } from '../../../redux/orders/orders.types';
import { useState } from 'react';
import { ExtractId } from '../../../utils/dataTransform';

export interface FormAddOrderSlotProps {
  onSelect: (slot: IOrderSlot) => void;
}

const FormAddOrderSlot: React.FC<FormAddOrderSlotProps> = ({ onSelect, ...props }) => {
  const modalS = useModalService();
  const [loadedData, setLoadedData] = useState<IProduct | undefined>();

  const onProductSelect = (d?: IProduct) => {
    if (!d) return;
    setLoadedData(d);
    const modal = modalS.handleOpenModal({
      Modal: Modals.FormCreateOrderSlotItem,
      props: {
        title: `Добавити позицію "${d?.label}" до замовлення`,
        defaultState: d,
        product: ExtractId(d),
        onSubmit: d => {
          onAddOrderSlotItem(d);
          modal?.onClose();
        },
      },
    });
  };
  const onAddOrderSlotItem = (slot?: IOrderSlot) => {
    console.log(slot);
  };
  return (
    <FormCreateInner
      buttonText={'Add position to order'}
      onClick={() => {
        const modal = modalS.handleOpenModal({
          Modal: Modals.SelectProductModal,
          props: {
            title: 'Add product to order',
            onSelect: d => {
              onProductSelect(d);
              console.log(d);
            },
          },
        });
      }}
    />
  );
};
export default FormAddOrderSlot;
