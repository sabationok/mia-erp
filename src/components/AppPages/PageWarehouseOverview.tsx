import TableList, { ITableListContext } from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps, TableActionCreator } from '../TableList/tableTypes.types';
import AppGridPage from './AppGridPage';
import { useWarehousesSelector } from '../../redux/selectors.store';
import { ISortParams } from '../../api';
import { FilterReturnDataType } from '../Filter/AppFilter';
import { PagePathType } from '../../data/pages.data';
import { warehouseOverviewTableColumns } from '../../data/warehauses.data';
import { useAppParams } from '../../hooks';
import { IProductInventory } from '../../redux/warehouses/warehouses.types';
import { useAppServiceProvider } from '../../hooks/useAppServices.hook';

type Props = {
  path: PagePathType;
};
const PageWarehouseOverview: React.FC<any> = (props: Props) => {
  const warehouseId = useAppParams().warehouseId;
  const service = useAppServiceProvider().warehouses;
  const state = useWarehousesSelector();
  const actionsCreator = useWarehouseOverviewActionsCreator();
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<IProductInventory> => ({
      tableData: state.current?.items,
      isFilter: false,
      isSearch: true,
      footer: false,
      checkBoxes: true,
      actionsCreator,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
      },
      handleTableSort: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
      },
    }),
    [actionsCreator, state]
  );

  useEffect(() => {
    if (warehouseId) {
      const currentForReq = state.warehouses.find(w => w._id === warehouseId);

      service.getById({ data: currentForReq });
    }
  }, [warehouseId]);

  return (
    <AppGridPage path={props.path}>
      <Page>
        <TableList {...tableConfig} isLoading={isLoading} tableTitles={warehouseOverviewTableColumns} />
      </Page>
    </AppGridPage>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

type WarehouseTableActionsCreator = TableActionCreator<IProductInventory>;

const useWarehouseOverviewActionsCreator = (): WarehouseTableActionsCreator => {
  const service = useAppServiceProvider().warehouses;

  return (ctx: ITableListContext) => [
    { name: 'deleteProductInventory', icon: 'delete', onClick: () => {} },
    { name: 'editProductInventory', icon: 'edit', onClick: () => {} },
    { name: 'addProductInventory', icon: 'plus', onClick: () => {} },
  ];
};
export default PageWarehouseOverview;
