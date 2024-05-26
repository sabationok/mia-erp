import { ServiceName, useAppServiceProvider } from 'hooks/useAppServices.hook';
import { useCallback, useEffect, useMemo, useState } from 'react';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { PriceEntity } from 'types/price-management/price-management.types';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import { OnlyUUID } from 'redux/global.types';
import { useAppParams, useCurrentOffer } from '../../../../hooks';
import { useLoadersProvider } from '../../../../Providers/Loaders/LoaderProvider';
import ModalCreatePrice from '../../../Modals/ModalCreatePrice';
import { pricesColumnsForProductReview } from '../../../../data/priceManagement.data';
import { IBase } from '../../../../types/utils.types';
import { useAppDispatch } from '../../../../redux/store.store';
import { getPriceThunk } from '../../../../redux/priceManagement/priceManagement.thunks';

export interface PricesTabProps {
  onSelect?: (price: OnlyUUID) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
}
const PricesTab: React.FC<PricesTabProps> = ({ onSelect, selected, withActions = true }) => {
  const modalS = useModalProvider();
  const productsS = useAppServiceProvider()[ServiceName.offers];
  const offerId = useAppParams().offerId;
  const currentOffer = useCurrentOffer({ _id: offerId });
  const [selectedRow, setSelectedRoe] = useState<IBase>();
  const loaders = useLoadersProvider<'prices' | 'price' | 'discounts' | 'discount'>();
  const dispatch = useAppDispatch();

  // const pricesS = useAppServiceProvider()[ServiceName.priceManagement];

  const loadData = useCallback(
    async ({ refresh, update }: { refresh?: boolean; update?: boolean }) => {
      if (!currentOffer) return;
      productsS.getAllPrices({
        data: { params: { offerId: currentOffer?._id }, refreshCurrent: refresh, updateCurrent: update },
        onLoading: loaders?.onLoading('prices'),
      });
    },
    [currentOffer, loaders, productsS]
  );

  // const updateDefaults = ({}: { price?: OnlyUUID }) => {};

  const tableConfig = useMemo((): ITableListProps<PriceEntity> => {
    return {
      onRowClick: data => {
        setSelectedRoe(data?.rowData);

        if (onSelect) {
          onSelect({ _id: data?._id || data?.rowData?._id || '' });
        }
      },
      actionsCreator: !withActions
        ? undefined
        : ctx => {
            const currentId = ctx.selectedRow?._id || selectedRow?._id;

            return [
              { icon: 'refresh', type: 'onlyIcon', onClick: () => loadData({ refresh: true }) },
              { separator: true },
              { icon: 'delete', type: 'onlyIcon', disabled: !currentId },
              { icon: 'copy', type: 'onlyIcon', disabled: !currentId },
              {
                icon: 'edit',
                type: 'onlyIcon',
                disabled: !currentId,
                onClick: () => {
                  dispatch(
                    getPriceThunk({
                      data: { params: { _id: currentId } },
                      onLoading: loaders.onLoading('price', undefined, { content: 'Refreshing price info...' }),
                      onSuccess: () => {},
                    })
                  );

                  modalS.open({
                    ModalChildren: ModalCreatePrice,
                    modalChildrenProps: {
                      offer: currentOffer,
                      updateId: currentId,
                    },
                  });
                },
              },
              { separator: true },
              {
                icon: 'plus',
                type: 'onlyIconFilled',
                onClick: () => {
                  modalS.open({
                    ModalChildren: ModalCreatePrice,
                    modalChildrenProps: {
                      offer: currentOffer,
                    },
                  });
                },
              },
            ];
          },
    };
  }, [withActions, onSelect, selectedRow?._id, loadData, dispatch, loaders, modalS, currentOffer]);

  useEffect(() => {
    // if ((!currentOffer?.prices || currentOffer?.prices?.length === 0) && currentProduct?._id) {
    loadData({ refresh: true });
    // }
    // eslint-disable-next-line
  }, []);

  return (
    <TableList
      {...tableConfig}
      isSearch={false}
      isFilter={false}
      isLoading={loaders?.isLoading?.prices}
      selectedRow={selected}
      tableData={currentOffer?.prices}
      tableTitles={pricesColumnsForProductReview}
    />
  );
};

export default PricesTab;
