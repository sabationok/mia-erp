import { ServiceName, useAppServiceProvider } from 'hooks/useAppServices.hook';
import { useCallback, useEffect, useMemo } from 'react';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { pricesColumnsForProductReview } from 'data/priceManagement.data';
import FormCreatePrice from '../../../Forms/pricing/FormCreatePrice/FormCreatePrice';
import { OfferPriceEntity } from 'types/price-management/priceManagement.types';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import { getIdRef } from 'utils/data-transform';
import { OnlyUUID } from 'redux/global.types';
import { useAppParams, useCurrentOffer } from '../../../../hooks';
import { useLoadersProvider } from '../../../../Providers/Loaders/LoaderProvider';
import { OfferOverlayLoaderKey } from '../../../Overlays/FormProductDefaultsOverlay';

export interface PricesTabProps {
  onSelect?: (price: OnlyUUID) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
}
const PricesTab: React.FC<PricesTabProps> = ({ onSelect, selected, withActions = true }) => {
  const offerId = useAppParams().productId;
  const currentOffer = useCurrentOffer({ id: offerId });
  const loaders = useLoadersProvider<OfferOverlayLoaderKey>();

  const pricesS = useAppServiceProvider()[ServiceName.priceManagement];
  const modalS = useModalProvider();
  const productsS = useAppServiceProvider()[ServiceName.products];

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

  const tableConfig = useMemo((): ITableListProps<OfferPriceEntity> => {
    return {
      tableData: currentOffer?.prices,
      tableTitles: pricesColumnsForProductReview,
      onRowClick: data => {
        if (onSelect) {
          if (data?.rowData) {
            onSelect(getIdRef(data?.rowData));
            return;
          } else if (data?._id) {
            onSelect({ _id: data?._id });
          }
        }
      },
      actionsCreator: !withActions
        ? undefined
        : ctx => {
            const currentId = ctx.selectedRow?._id;

            return [
              { icon: 'refresh', type: 'onlyIcon', onClick: () => loadData({ refresh: true }) },
              { separator: true },
              { icon: 'delete', type: 'onlyIcon', disabled: !currentId },
              { icon: 'copy', type: 'onlyIcon', disabled: !currentId },
              { icon: 'edit', type: 'onlyIcon', disabled: !currentId },
              { separator: true },
              {
                icon: 'plus',
                type: 'onlyIconFilled',
                onClick: () => {
                  const m = modalS.open({
                    ModalChildren: FormCreatePrice,
                    modalChildrenProps: {
                      offer: currentOffer,
                      onSubmit: (d, o) => {
                        pricesS.addPriceToList({
                          data: { updateCurrent: true, data: { data: d } },
                          onSuccess: () => {
                            o?.close && m?.onClose();
                          },
                        });
                      },
                    },
                  });
                },
              },
            ];
          },
    };
  }, [currentOffer, withActions, onSelect, loadData, modalS, pricesS]);

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
    />
  );
};

export default PricesTab;
