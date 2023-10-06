import { useModalProvider } from '../components/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { ITableListContext, TableActionCreator } from '../components/TableList/tableTypes.types';
import { IOrder } from '../redux/orders/orders.types';
import { Modals } from '../components/ModalProvider/Modals';
import { useNavigate } from 'react-router-dom';
import { ExtractIdString } from '../utils/dataTransform';

export type OrdersActionsCreator = TableActionCreator<IOrder>;
const useOrdersActionsCreatorHook = (): OrdersActionsCreator => {
  const modals = useModalProvider();
  const navigate = useNavigate();
  // const { orders } = useAppServiceProvider();

  return useCallback(
    (ctx: ITableListContext<IOrder>) => {
      const selected = ctx?.selectedRow;
      const selectedId = selected ? ExtractIdString(selected) : '';

      return [
        {
          name: 'openOrderOverview',
          icon: 'openInNew',
          disabled: !selectedId,
          onClick: () => {
            selectedId && navigate(selectedId);
            // modals.handleOpenModal({
            //   Modal: Modals.OrderOverview,
            //   props: {
            //     order: ctx.tableData?.find(el => el._id === selectedId),
            //   },
            // });
          },
        },
        {
          name: 'archiveOrder',
          icon: 'archive',
          disabled: !selectedId,
          onClick: () => {
            if (selectedId) window.confirm(`Архівувати замовення: ${selectedId}`);
          },
        },
        {
          name: 'editOrder',
          icon: 'edit',
          disabled: !selectedId,
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
          disabled: !selectedId,
          onClick: () => {
            modals.handleOpenModal({
              Modal: Modals.FormCreateOrder,
              props: {
                title: `Copy order: ${selectedId}`,
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
      ];
    },
    [modals, navigate]
  );
};
export default useOrdersActionsCreatorHook;
