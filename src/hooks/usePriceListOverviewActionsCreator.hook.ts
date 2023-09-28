import { TableActionCreator } from '../components/TableList/tableTypes.types';
import { IPriceListItem } from '../redux/priceManagement/priceManagement.types';
import { useModalService } from '../components/ModalProvider/ModalProvider';
import { useCallback } from 'react';
import { OnlyUUID } from '../redux/global.types';
import FormCreatePrice from '../components/Forms/FormCreatePrice/FormCreatePrice';
import { toast } from 'react-toastify';
import { ServiceName, useAppServiceProvider } from './useAppServices.hook';

export type PriceListOverviewActionsCreatorType = TableActionCreator<IPriceListItem>;

export const usePricesModal = () => {
  const modalS = useModalService();
  const service = useAppServiceProvider()[ServiceName.priceManagement];

  const openAddPriceToListModal = useCallback(
    (list: OnlyUUID) => {
      const modal = modalS.open({
        ModalChildren: FormCreatePrice,
        modalChildrenProps: {
          title: 'Create new price',
          defaultState: { list },
          onSubmit: async (sData, o) => {
            if (!Array.isArray(sData)) {
              console.log('usePricesModal => create one price', sData);
              await service.addPriceToList({
                data: { data: { data: sData }, updateCurrent: true },
                onSuccess: data => {
                  console.log('usePricesModal => created one price', data);
                  o.closeAfterSave && modal?.onClose();
                  toast.success('Price created');
                },
                onError: () => {
                  toast.error('Price creating error');
                },
              });
            } else {
              toast.warning('Passed array of items');
            }
          },
        },
      });
    },
    [modalS, service]
  );

  return {
    openAddPriceToListModal,
  };
};
export const usePriceListOverviewActionsCreator = (listId?: string): PriceListOverviewActionsCreatorType => {
  // const modalS = useModalProvider();
  const service = useAppServiceProvider()[ServiceName.priceManagement];
  const { openAddPriceToListModal } = usePricesModal();
  return useCallback(
    _ctx => [
      {
        name: 'createPrice',
        title: 'Створити',
        icon: 'plus',
        type: 'onlyIconFilled',
        onClick: async () => {
          if (listId) {
            await service.refreshListById({
              data: { _id: listId },
              onSuccess: (data, _meta) => openAddPriceToListModal(data),
            });
          }
        },
      },
    ],
    [openAddPriceToListModal, listId, service]
  );
};
