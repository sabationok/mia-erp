import TableList, { ITableListProps } from '../../../TableList/TableList';
import { OnlyUUID } from '../../../../redux/app-redux.types';
import { useWarehousesSelector } from '../../../../redux/selectors.store';
import { useCallback, useEffect, useMemo } from 'react';
import { getIdRef } from '../../../../utils';
import { IWarehouse } from '../../../../types/warehousing/warehouses.types';
import { warehousesTableColumns } from '../../../../data/warehauses.data';
import { useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useLoadersProvider } from '../../../../Providers/Loaders/LoaderProvider';
import { OfferOverlayLoaderKey } from '../../../Overlays/FormProductDefaultsOverlay';

export interface WarehousesTabProps {
  onSelect?: (warehouse: OnlyUUID) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
}

const WarehousesTab: React.FC<WarehousesTabProps> = ({ onSelect, selected, withActions }) => {
  const { warehouses: wrhsSrv } = useAppServiceProvider();
  const loaders = useLoadersProvider<OfferOverlayLoaderKey>();
  const warehouses = useWarehousesSelector().warehouses;

  const loadData = useCallback(() => {
    wrhsSrv.getAll({ onLoading: loaders.onLoading('warehouses'), data: { refresh: true } });
  }, [loaders, wrhsSrv]);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line
  }, []);

  const tableConfigs = useMemo((): ITableListProps<IWarehouse> => {
    return {
      tableData: warehouses,
      tableTitles: warehousesTableColumns,
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
      actionsCreator: ctx => {
        // const currentId = ctx.selectedRow?._id;

        return [
          { icon: 'refresh', onClick: loadData },
          // { icon: 'refresh', type: 'onlyIcon', onClick: () => loadData({ refresh: true }) },
          // { separator: true },
          // {
          //   icon: 'plus',
          //   type: 'onlyIconFilled',
          // },
        ];
      },
    };
  }, [loadData, onSelect, warehouses]);

  // useEffect(() => {
  //   // if ((!currentProduct?.inventories || currentProduct?.inventories?.length === 0) && currentProduct?._id) {
  //   // }
  //   loadData({ refresh: true });
  //   // eslint-disable-next-line
  // }, []);

  return (
    <TableList isSearch={false} {...tableConfigs} isLoading={loaders.isLoading?.warehouses} selectedRow={selected} />
  );
};

export default WarehousesTab;
