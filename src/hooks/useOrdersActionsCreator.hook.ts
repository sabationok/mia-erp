import { useModalProvider } from '../components/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { ITableListContext, TableActionCreator } from '../components/TableList/tableTypes.types';
import { IOrder } from '../redux/orders/orders.types';
import { Modals } from '../components/ModalProvider/Modals';

export type OrdersActionsCreator = TableActionCreator<IOrder>;
const useOrdersActionsCreatorHook = (): OrdersActionsCreator => {
  const modals = useModalProvider();
  // const { orders } = useAppServiceProvider();

  return useCallback(
    (ctx: ITableListContext<IOrder>) => [
      {
        name: 'openOrderOverview',
        icon: 'openInNew',
        disabled: !ctx.selectedRow?._id,
        onClick: () => {
          if (!ctx.selectedRow?._id) return;
          modals.handleOpenModal({
            Modal: Modals.OrderOverview,
            props: {
              order: { _id: ctx.selectedRow?._id, owner: {} as any },
            },
          });
        },
      },
      {
        name: 'archiveOrder',
        icon: 'archive',
        disabled: !ctx?.selectedRow?._id,
        onClick: () => {
          if (ctx?.selectedRow?._id) window.confirm(`Архівувати замовення: ${ctx?.selectedRow?._id}`);
        },
      },
      {
        name: 'editOrder',
        icon: 'edit',
        disabled: !ctx?.selectedRow?._id,
        onClick: () => {
          modals.handleOpenModal({
            Modal: Modals.FormCreateOrder,
            props: {
              title: 'Edit order',
            },
          });
        },
      },
      {
        name: 'copyOrder',
        icon: 'copy',
        disabled: !ctx?.selectedRow?._id,
        onClick: () => {
          modals.handleOpenModal({
            Modal: Modals.FormCreateOrder,
            props: {
              title: `Copy order: ${ctx?.selectedRow?._id}`,
            },
          });
        },
      },
      { separator: true },
      {
        name: 'createOrder',
        icon: 'plus',
        type: 'onlyIconFilled',
        onClick: () => {
          modals.handleOpenModal({
            Modal: Modals.FormCreateOrder,
            props: {
              title: `Create order`,
            },
          });
        },
      },
    ],
    [modals]
  );
};
export default useOrdersActionsCreatorHook;
