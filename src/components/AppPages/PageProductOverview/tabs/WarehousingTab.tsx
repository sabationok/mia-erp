import TableList, { ITableListProps } from '../../../TableList/TableList';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { warehouseOverviewTableColumns } from '../../../../data/warehauses.data';
import Forms from '../../../Forms';
import { IProductInventory } from '../../../../redux/warehouses/warehouses.types';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useProductsSelector } from '../../../../redux/selectors.store';
import { ExtractId } from '../../../../utils/dataTransform';

export interface WarehousingTabProps {}

const WarehousingTab = (p: WarehousingTabProps) => {
  const currentProduct = useProductsSelector().currentProduct;
  const modalS = useModalProvider();
  const productsS = useAppServiceProvider()[ServiceName.products];
  const [loading, setLoading] = useState(false);

  const loadData = useCallback(
    ({ refresh, update }: { refresh?: boolean; update?: boolean }) => {
      if (!currentProduct) return;
      const product = ExtractId(currentProduct);
      productsS.getAllInventoriesByProductId({
        data: { refreshCurrent: refresh, params: { product } },
        onLoading: setLoading,
      });
    },
    [currentProduct, productsS]
  );

  const tableConfigs = useMemo((): ITableListProps<IProductInventory> => {
    return {
      tableData: currentProduct?.inventories,
      tableTitles: warehouseOverviewTableColumns,
      actionsCreator: ctx => {
        // const currentId = ctx.selectedRow?._id;

        return [
          { icon: 'refresh', type: 'onlyIcon', onClick: () => loadData({ refresh: true }) },

          { separator: true },
          {
            icon: 'plus',
            type: 'onlyIconFilled',
            onClick: () => {
              modalS.open({
                ModalChildren: Forms.CreateWarehouseDocument,
                modalChildrenProps: {},
              });
            },
          },
        ];
      },
    };
  }, [currentProduct?.inventories, loadData, modalS]);

  useEffect(() => {
    // if ((!currentProduct?.inventories || currentProduct?.inventories?.length === 0) && currentProduct?._id) {
    // }
    loadData({ refresh: true });
    // eslint-disable-next-line
  }, []);

  return <TableList {...tableConfigs} isSearch={false} isFilter={false} isLoading={loading} />;
};

export default WarehousingTab;
// { separator: true },
// { icon: 'delete', type: 'onlyIcon', disabled: !currentId },
// { icon: 'copy', type: 'onlyIcon', disabled: !currentId },
// { icon: 'edit', type: 'onlyIcon', disabled: !currentId },
