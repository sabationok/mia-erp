import { TableActionCreator } from '../components/TableList/tableTypes.types';
import { PriceEntity } from '../types/price-management/price-management.types';
import { useModalService } from '../components/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { OnlyUUID } from '../redux/app-redux.types';
import FormCreatePrice from '../components/Forms/pricing/FormCreatePrice/FormCreatePrice';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';
import { ToastService } from '../services';

export type PriceListOverviewActionsCreatorType = TableActionCreator<PriceEntity>;

export const usePricesModal = () => {
  const modalS = useModalService();
  const service = useAppServiceProvider()[ServiceName.priceManagement];

  const addPriceToList = useCallback(
    (list: OnlyUUID) => {
      const m = modalS.open({
        ModalChildren: FormCreatePrice,
        modalChildrenProps: {
          title: 'Create new price',
          defaultState: { list },
          onSubmit: async (sData, o) => {
            if (!Array.isArray(sData)) {
              await service.addPriceToList({
                data: { data: { data: sData }, updateCurrent: true },
                onSuccess: () => {
                  m?.onClose();
                  ToastService.success('Price added');
                },
                onError: () => {
                  ToastService.error('Price creating error');
                },
              });
            } else {
              ToastService.warning('Passed array of items');
            }
          },
        },
      });
    },
    [modalS, service]
  );

  return {
    addPriceToList,
  };
};
export const usePriceListOverviewActionsCreator = (listId?: string): PriceListOverviewActionsCreatorType => {
  // const modalS = useModalProvider();
  const service = useAppServiceProvider()[ServiceName.priceManagement];
  const { addPriceToList } = usePricesModal();

  return useCallback(
    _ctx => [
      {
        name: 'refreshPrices',
        title: 'Оновити',
        icon: 'refresh',
        type: 'onlyIconFilled',
        onClick: async () => {
          if (listId) {
            await service.getAllPrices({
              data: { params: { list: { _id: listId } }, refreshCurrent: true },
            });
          }
        },
      },
      {
        name: 'createPrice',
        title: 'Створити',
        icon: 'plus',
        type: 'onlyIconFilled',
        onClick: async () => {
          if (listId) {
            await service.refreshListById({
              data: { _id: listId },
              onSuccess: (data, _meta) => addPriceToList(data),
            });
          }
        },
      },
    ],
    [addPriceToList, listId, service]
  );
};
