import { TableActionCreator } from '../components/TableList/tableTypes.types';
import { IPriceListItem } from '../redux/priceManagement/priceManagement.types';
import { useModalProvider } from '../components/ModalProvider/ModalProvider';
import usePriceManagementServiceHook from '../redux/priceManagement/usePriceManagementService.hook';
import { useCallback } from 'react';
import FormCreatePrices from '../components/Forms/FormCreatePrices';
import { toast } from 'react-toastify';

export type PriceListOverviewActionsCreatorType = TableActionCreator<IPriceListItem>;

export const usePriceListOverviewActionsCreator = (listId?: string): PriceListOverviewActionsCreatorType => {
  const modalS = useModalProvider();
  const service = usePriceManagementServiceHook();
  return useCallback(
    ctx => [
      {
        name: 'createPrice',
        title: 'Створити',
        icon: 'plus',
        type: 'onlyIconFilled',
        onClick: () =>
          listId
            ? service.refreshListById({
                data: { _id: listId },
                onSuccess: (data, meta) => {
                  const modal = modalS.handleOpenModal({
                    ModalChildren: FormCreatePrices,
                    modalChildrenProps: {
                      title: 'Create new price',
                      list: data,
                      onSubmit: ({ data: sData }, o) => {
                        if (!Array.isArray(sData)) {
                          console.log('usePriceListOverviewActionsCreator create one price', sData);
                          service.addItemToList({
                            data: { data: sData, list: { _id: listId } },
                            // data: createPriceDataForReq(data),
                            onSuccess: data => {
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
              })
            : undefined,
      },
    ],
    [listId, modalS, service]
  );
};
