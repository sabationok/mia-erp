import FormCreateInner from '../components/FormCreateInner';
import { useModalService } from '../../ModalProvider/ModalProvider';
import { Modals } from '../../ModalProvider/Modals';
import { IProduct } from '../../../redux/products/products.types';
import { IOrderSlotItem } from '../../../redux/orders/orders.types';

export interface FormAddOrderSlotItemProps {
  onSelect: (item: IOrderSlotItem) => void;
}

const FormAddOrderSlotItem: React.FC<FormAddOrderSlotItemProps> = ({ onSelect, ...props }) => {
  const modalS = useModalService();

  const onProductSelect = (d?: IProduct) => {
    const modal = modalS.handleOpenModal({
      Modal: Modals.FormCreateOrderSlotItem,
      props: {
        title: `Добавити позицію "${d?.label}" до замовлення`,
        onSubmit: d => {
          onAddOrderSlotItem(d);
          modal?.onClose();
        },
      },
    });
  };
  const onAddOrderSlotItem = (item?: IOrderSlotItem) => {
    console.log(item);
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

              modal?.onClose();
            },
          },
        });
      }}
    />
  );
};
export default FormAddOrderSlotItem;
