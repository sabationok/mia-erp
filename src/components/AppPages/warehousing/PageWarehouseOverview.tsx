import TableList, { ITableListContext } from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps, TableActionsCreator } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { useWarehousesSelector } from '../../../redux/selectors.store';
import { ApiQuerySortParams } from '../../../api';
import { warehouseOverviewTableColumns } from '../../../data/warehauses.data';
import { useAppParams } from '../../../hooks';
import { WarehouseInventoryEntity } from '../../../types/warehousing';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useModalProvider } from '../../../Providers/ModalProvider/ModalProvider';
import { Modals } from '../../Modals/Modals';
import { BaseAppPageProps } from '../index';
import { enumToTabs } from '../../../utils';
import TabSelector from '../../atoms/TabSelector';

interface Props extends BaseAppPageProps {}

enum WarehouseOverviewTabsEnum {
  Inventories = 'Inventories',
  Documents = 'Documents',
  Warehouse = 'Warehouse',
}
const tabsOptions = enumToTabs(WarehouseOverviewTabsEnum);
const PageWarehouseOverview: React.FC<any> = (props: Props) => {
  const warehouseId = useAppParams().warehouseId;
  const { getById } = useAppServiceProvider()[ServiceName.warehouses];
  const state = useWarehousesSelector();
  const actionsCreator = useWarehouseOverviewActionsCreator();
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ApiQuerySortParams>();

  const tableConfig = useMemo(
    (): ITableListProps<WarehouseInventoryEntity> => ({
      tableData: state.current?.inventories,
      hasFilter: false,
      hasSearch: true,
      showFooter: true,
      checkBoxes: !!state.current?.inventories?.length,
      actionsCreator,
      onTableSortChange: (param, sortOrder) => {
        setSortParams({ sortPath: param.dataPath, sortOrder });
      },
    }),
    [actionsCreator, state]
  );

  useEffect(() => {
    console.log('sortParams', sortParams);
    if (warehouseId) {
      getById({ data: { _id: warehouseId }, onLoading: setIsLoading });
    }
    // eslint-disable-next-line
  }, [warehouseId]);

  return (
    <AppGridPage path={props.path}>
      <Page>
        <TabSelector options={tabsOptions} />

        <TableList {...tableConfig} isLoading={isLoading} tableTitles={warehouseOverviewTableColumns} />
      </Page>
    </AppGridPage>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

type WarehouseTableActionsCreator = TableActionsCreator<WarehouseInventoryEntity>;

const useWarehouseOverviewActionsCreator = (): WarehouseTableActionsCreator => {
  // const service = useAppServiceProvider().warehouses;
  const modalS = useModalProvider();

  return (ctx: ITableListContext<WarehouseInventoryEntity>) => {
    const current = ctx.selectedRow;

    return [
      { name: 'deleteInventory', icon: 'delete', onClick: () => {} },
      { name: 'editInventory', icon: 'edit', onClick: () => {} },
      {
        name: 'addInventory',
        icon: 'plus',
        type: 'onlyIconFilled',
        onClick: () => {
          console.log(current);
          modalS.open({
            Modal: Modals.SelectProductModal,
            props: {
              onSelect: p => {
                modalS.open({
                  Modal: Modals.FormCreateWarehouseDocument,
                  props: {
                    product: p,
                    title: `Create warehouse document. Offer ${p?.label}`,
                  },
                });
              },
            },
          });
        },
      },
    ];
  };
};
export default PageWarehouseOverview;
