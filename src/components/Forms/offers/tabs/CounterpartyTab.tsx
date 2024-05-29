import { OnlyUUID } from '../../../../redux/app-redux.types';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { useDirectorySelector } from '../../../../redux/selectors.store';
import { useMemo, useState } from 'react';
import { getIdRef } from '../../../../utils/data-transform';
import { counterpartyColumns } from '../../../../data/contractors.data';
import { CounterpartyTypesEnum, SupplierType } from '../../../../redux/directories/counterparties.types';
import { ApiDirType } from '../../../../redux/APP_CONFIGS';

export interface CounterpartyTabProps {
  onSelect?: (supplier: OnlyUUID) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
  types?: CounterpartyTypesEnum[];
}
const CounterpartyTab: React.FC<CounterpartyTabProps> = ({ onSelect, withActions, selected, types }) => {
  // const currentProduct = useProductsSelector().currentProduct;
  // const modalS = useModalProvider();
  // const productsS = useAppServiceProvider()[ServiceName.products];
  const [loading] = useState(false);

  const counterparties = useDirectorySelector(ApiDirType.CONTRACTORS).directory;

  const filteredData = useMemo(() => {
    return counterparties.filter(c => types && types.includes(c.type as never));
  }, [counterparties, types]);

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

  const tableConfigs = useMemo((): ITableListProps<SupplierType> => {
    return {
      tableData: filteredData as never,
      tableTitles: counterpartyColumns,
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
  }, [filteredData, onSelect, withActions]);

  return <TableList hasSearch={false} isLoading={loading} {...tableConfigs} />;
};

export default CounterpartyTab;
