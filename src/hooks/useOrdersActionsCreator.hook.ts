import { useModalProvider } from '../Providers/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { ITableListContext, TableActionsCreator } from '../components/TableList/tableTypes.types';
import { OrderEntity } from '../types/orders/orders.types';
import { Modals } from '../components/Modals/Modals';
import { useNavigate } from 'react-router-dom';
import { ExtractIdString } from '../utils/data-transform';
import { t } from '../lang';
import { useAppServiceProvider } from './useAppServices.hook';
import { AppModuleName } from '../redux/reduxTypes.types';

export type OrdersActionsCreator = TableActionsCreator<OrderEntity>;
const useOrdersActionsCreatorHook = (): OrdersActionsCreator => {
  const modalS = useModalProvider();
  const navigate = useNavigate();
  const { getAll } = useAppServiceProvider()[AppModuleName.orders];
  // const { orders } = useAppServiceProvider();

  return useCallback(
    (ctx: ITableListContext<OrderEntity>) => {
      const selected = ctx?.selectedRow;
      const selectedId = selected ? ExtractIdString(selected) : '';

      return [
        {
          icon: 'refresh',
          onClick: () => {
            getAll({
              data: { refresh: true },
              onLoading: ctx.onRefresh,
            });
          },
        },
        { separator: true },
        {
          name: 'openOrderOverview',
          icon: 'openInNew',
          disabled: !selectedId,
          onClick: () => {
            selectedId && navigate(selectedId);
            // modalS.open({
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
            modalS.open({
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
            modalS.open({
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
          icon: 'AddToList',
          type: 'onlyIconFilled',
          onClick: () => {
            modalS.open({
              Modal: Modals.FormCreateOrdersGroup,
              props: {
                title: t(`Create orders group`),
              },
            });
          },
        },
        {
          name: 'createOrder',
          icon: 'plus',
          type: 'onlyIconFilled',
          onClick: () => {
            modalS.open({
              Modal: Modals.FormCreateOrder,
              props: {
                title: t(`Create order`),
              },
            });
          },
        },
      ];
    },
    [getAll, modalS, navigate]
  );
};
export default useOrdersActionsCreatorHook;
