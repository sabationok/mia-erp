import { usePageCurrentOffer } from '../PageOfferProvider';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { useCallback, useEffect, useMemo } from 'react';
import { createTableTitlesFromProperties, transformVariationTableData } from '../../../../utils/tables';
import { getIdRef } from '../../../../utils';
import { OnlyUUID } from '../../../../redux/app-redux.types';
import { useLoadersProvider } from '../../../../Providers/Loaders/LoaderProvider';
import { OfferOverlayLoaderKey } from '../../../Overlays/FormProductDefaultsOverlay';
import { PropertyEntity } from '../../../../types/offers/properties.types';
import CreateVariationOverlay from '../../../Overlays/CreateVariationOverlay';
import { IVariationTableData } from '../../../../types/offers/variations.types';

export interface VariationsTabProps {
  onSelect?: (variation: OnlyUUID) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
}

const VariationsTab: React.FC<VariationsTabProps> = ({ onSelect, selected, withActions = true }) => {
  const loaders = useLoadersProvider<OfferOverlayLoaderKey>();
  const page = usePageCurrentOffer();
  const modalS = useModalProvider();
  const currentOffer = page.currentOffer;
  const productsS = useAppServiceProvider()[ServiceName.offers];
  // const templates = usePropertiesSelector();

  const loadData = useCallback(
    ({ refresh, update }: { refresh?: boolean; update?: boolean }) => {
      if (!currentOffer) return;

      productsS.getAllVariationsByProductId({
        data: { refreshCurrent: refresh, updateCurrent: update, offerId: currentOffer._id },
        onLoading: loaders.onLoading('variations'),
      });
    },
    [currentOffer, loaders, productsS]
  );
  const variationsTableTitles = useMemo(() => {
    const propertiesMap: Record<string, PropertyEntity> = {};
    for (const variation of currentOffer?.variations ?? []) {
      const propsList = variation.properties;

      for (const prop of propsList ?? []) {
        const propId = prop?.parent?._id;
        if (propId && prop.parent) {
          propertiesMap[propId] = prop.parent;
        }
      }
    }
    return createTableTitlesFromProperties(Object.values(propertiesMap));
  }, [currentOffer?.variations]);

  const tableConfig = useMemo((): ITableListProps<IVariationTableData> => {
    return {
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

                  modalS.open({
                    ModalChildren: CreateVariationOverlay,
                    modalChildrenProps: {
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
                  // toggleVisibility && toggleVisibility();

                  modalS.open({
                    ModalChildren: CreateVariationOverlay,
                    modalChildrenProps: { offer: page.currentOffer },
                  });
                },
              },
            ];
          },
    };
  }, [loadData, modalS, onSelect, page.currentOffer, withActions]);

  useEffect(() => {
    if (currentOffer) {
      loadData({ refresh: true });
    }
    // eslint-disable-next-line
  }, []);

  return (
    <TableList
      {...tableConfig}
      isSearch={false}
      isFilter={false}
      isLoading={loaders?.isLoading?.variations}
      selectedRow={selected}
      tableData={currentOffer?.variations}
      tableTitles={variationsTableTitles}
      transformData={transformVariationTableData as never}
    />
  );
};
export default VariationsTab;
