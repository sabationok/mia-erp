import TableList, { ITableListProps } from '../../../TableList/TableList';
import { OnlyUUID } from '../../../../redux/global.types';
import { useProductsSelector, useWarehousesSelector } from '../../../../redux/selectors.store';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useMemo, useState } from 'react';
import { getIdRef } from '../../../../utils/dataTransform';
import { IWarehouse } from '../../../../redux/warehouses/warehouses.types';
import { warehousesTableColumns } from '../../../../data/warehauses.data';

export interface WarehousesTabProps {
  onSelect?: (warehouse: OnlyUUID) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
}

const WarehousesTab: React.FC<WarehousesTabProps> = ({ onSelect, selected, withActions }) => {
  const currentProduct = useProductsSelector().currentProduct;
  const modalS = useModalProvider();
  const productsS = useAppServiceProvider()[ServiceName.products];
  const [loading, setLoading] = useState(false);

  const warehouses = useWarehousesSelector().warehouses;

  // const loadData = useCallback(
  //   ({ refresh, update }: { refresh?: boolean; update?: boolean }) => {
  //     if (!currentProduct) return;
  //     const product = ExtractId(currentProduct);
  //     productsS.getAllInventoriesByProductId({
  //       data: { refreshCurrent: refresh, params: { product } },
  //       onLoading: setLoading,
  //     });
  //   },
  //   [currentProduct, productsS]
  // );

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
      actionsCreator: !withActions
        ? undefined
        : ctx => {
            // const currentId = ctx.selectedRow?._id;

            return [
              // { icon: 'refresh', type: 'onlyIcon', onClick: () => loadData({ refresh: true }) },
              // { separator: true },
              // {
              //   icon: 'plus',
              //   type: 'onlyIconFilled',
              // },
            ];
          },
    };
  }, [onSelect, warehouses]);

  // useEffect(() => {
  //   // if ((!currentProduct?.inventories || currentProduct?.inventories?.length === 0) && currentProduct?._id) {
  //   // }
  //   loadData({ refresh: true });
  //   // eslint-disable-next-line
  // }, []);

  return <TableList isSearch={false} {...tableConfigs} selectedRow={selected} />;
};

export default WarehousesTab;
