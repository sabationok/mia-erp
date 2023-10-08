import { OnlyUUID } from '../../../../redux/global.types';
import TableList, { ITableListProps } from '../../../TableList/TableList';
import { useDirectoriesSelector, useProductsSelector } from '../../../../redux/selectors.store';
import { useModalProvider } from '../../../ModalProvider/ModalProvider';
import { ServiceName, useAppServiceProvider } from '../../../../hooks/useAppServices.hook';
import { useMemo, useState } from 'react';
import { ExtractId } from '../../../../utils/dataTransform';
import { counterpartyColumns } from '../../../../data/contractors.data';
import { CounterpartyTypesEnum, SupplierType } from '../../../../redux/directories/counterparties.types';
import { ApiDirType } from '../../../../redux/APP_CONFIGS';
import styled from 'styled-components';
import FlexBox from '../../../atoms/FlexBox';

export interface CounterpartyTabProps {
  onSelect?: (supplier: OnlyUUID) => void;
  selected?: OnlyUUID;
  withActions?: boolean;
  types?: CounterpartyTypesEnum[];
}
const CounterpartyTab: React.FC<CounterpartyTabProps> = ({ onSelect, withActions, selected, types }) => {
  const currentProduct = useProductsSelector().currentProduct;
  const modalS = useModalProvider();
  const productsS = useAppServiceProvider()[ServiceName.products];
  const [loading, setLoading] = useState(false);

  const counterparties = useDirectoriesSelector(ApiDirType.CONTRACTORS).directory;

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
            onSelect(ExtractId(data?.rowData));
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
  }, [onSelect, withActions]);

  return <TableList isSearch={false} {...tableConfigs} />;
};

const Card = styled(FlexBox)``;

export default CounterpartyTab;
