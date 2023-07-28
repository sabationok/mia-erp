import { TableActionCreator } from '../components/TableList/tableTypes.types';
import { IPriceListItem } from '../redux/priceManagement/priceManagement.types';
import { useModalProvider } from '../components/ModalProvider/ModalProvider';
import usePriceManagementServiceHook from '../redux/priceManagement/usePriceManagementService.hook';
import { useCallback } from 'react';
import { OnlyUUID } from '../redux/global.types';
import FormCreatePrices from '../components/Forms/FormCreatePrices';
import { toast } from 'react-toastify';

export type PriceListOverviewActionsCreatorType = TableActionCreator<IPriceListItem>;

export const usePricesModal = () => {
  const modalS = useModalProvider();
  const service = usePriceManagementServiceHook();
  const openAddPriceToListModal = useCallback(
    (list: OnlyUUID) => {
      const modal = modalS.handleOpenModal({
        ModalChildren: FormCreatePrices,
        modalChildrenProps: {
          title: 'Create new price',
          list,
          onSubmit: async ({ data: sData }, o) => {
            if (!Array.isArray(sData)) {
              console.log('usePricesModal => create one price', sData);
              await service.addItemToList({
                data: { data: sData, list },
                // data: createPriceDataForReq(data),
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
  const modalS = useModalProvider();
  const service = usePriceManagementServiceHook();
  const { openAddPriceToListModal } = usePricesModal();
  return useCallback(
    ctx => [
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
