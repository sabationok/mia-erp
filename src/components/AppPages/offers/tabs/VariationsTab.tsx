import { usePageCurrentOffer } from '../PageOfferProvider';
import { useModalProvider } from '../../../../Providers/ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { useCallback, useEffect, useMemo } from 'react';
import { createTableTitlesFromProperties, transformVariationTableData } from '../../../../utils/tables';
import { OnlyUUID } from '../../../../redux/app-redux.types';
import { OfferOverlayLoaderKey } from '../../../Overlays/FormOfferDefaultsDrawer';
import { PropertyEntity } from '../../../../types/offers/properties.types';
import CreateVariationOverlay from '../../../Overlays/CreateVariationOverlay';
import { VariationEntity } from '../../../../types/offers/variations.types';
import { OfferEntity } from '../../../../types/offers/offers.types';
import { useCurrentOffer } from '../../../../hooks';
import { useLoaders } from '../../../../Providers/Loaders/useLoaders.hook';

export interface VariationsTabProps {
  onSelect?: (variation: VariationEntity) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
  offer?: OfferEntity;
}

const VariationsTab: React.FC<VariationsTabProps> = ({ onSelect, selected, withActions = true, offer }) => {
  const loaders = useLoaders<OfferOverlayLoaderKey>();

  const page = usePageCurrentOffer();
  const Offer = useCurrentOffer(offer || page?.currentOffer);

  const modalS = useModalProvider();
  const offerSrv = useAppServiceProvider()[ServiceName.offers];
  // const templates = usePropertiesSelector();

  const loadData = useCallback(
    ({ refresh, update }: { refresh?: boolean; update?: boolean }) => {
      if (!Offer) return;

      offerSrv.getAllVariations({
        data: {},
        params: {
          offerId: Offer._id,
        },
        update,
        refresh,
        onLoading: loaders.onLoading('variations'),
      });
    },
    [Offer, loaders, offerSrv]
  );
  const variationsTableTitles = useMemo(() => {
    const propertiesMap: Record<string, PropertyEntity> = {};
    for (const variation of Offer?.variations ?? []) {
      const propsList = variation.properties;

      for (const prop of propsList ?? []) {
        const propId = prop?.parent?._id;
        if (propId && prop.parent) {
          propertiesMap[propId] = prop.parent;
        }
      }
    }
    return createTableTitlesFromProperties(Object.values(propertiesMap));
  }, [Offer?.variations]);

  const tableConfig = useMemo((): ITableListProps<VariationEntity> => {
    return {
      onRowClick: data => {
        if (onSelect && data?.rowData) {
          onSelect(data?.rowData);
        }
      },
      actionsCreator: !withActions
        ? undefined
        : ctx => {
            const currentId = ctx.selectedRow?._id;

            return [
              { icon: 'refresh', type: 'onlyIcon', onClick: () => loadData({ refresh: true }) },
              // { icon: 'done', type: 'onlyIconOutlined', onClick: () => loadData({ refresh: true }) },
              { separator: true },
              {
                icon: 'delete',
                type: 'onlyIcon',
                disabled: !currentId,
                onClick: () => {
                  window.confirm(`Видалити варіацію:\n ${currentId}`);
                },
              },
              { icon: 'copy', type: 'onlyIcon', disabled: !currentId },
              {
                icon: 'edit',
                type: 'onlyIcon',
                disabled: !currentId,
                onClick: () => {
                  if (!currentId || !ctx.selectedRow) return;

                  modalS.create(CreateVariationOverlay, {
                    updateId: currentId,
                  });
                },
              },
              { separator: true },
              {
                icon: 'plus',
                type: 'onlyIconFilled',
                onClick: () => {
                  // toggleVisibility && toggleVisibility();

                  modalS.create(CreateVariationOverlay, { offer: Offer });
                },
              },
            ];
          },
    };
  }, [Offer, loadData, modalS, onSelect, withActions]);

  useEffect(() => {
    if (Offer) {
      loadData({ refresh: true });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <TableList
      {...tableConfig}
      hasSearch={false}
      hasFilter={false}
      isLoading={loaders?.isLoading?.variations}
      selectedRow={selected}
      tableData={Offer?.variations}
      tableTitles={variationsTableTitles}
      transformData={transformVariationTableData as never}
    />
  );
};
export default VariationsTab;
