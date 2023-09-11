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
import { ServiceName, useAppServiceProvider } from '../../hooks/useAppServices.hook';
import { useModalProvider } from '../ModalProvider/ModalProvider';
import { Modals } from '../ModalProvider/Modals';

type Props = {
  path: PagePathType;
};
const PageWarehouseOverview: React.FC<any> = (props: Props) => {
  const warehouseId = useAppParams().warehouseId;
  const { getById } = useAppServiceProvider()[ServiceName.warehouses];
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
      getById({ data: { _id: warehouseId }, onLoading: setIsLoading });
    }
    // eslint-disable-next-line
  }, [warehouseId]);

  useEffect(() => {
    console.log('PageWarehouseOverview ============>>>>>>>>>>');
    console.log(sortParams);
    console.log(filterParams);
  }, [filterParams, sortParams]);

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
  // const service = useAppServiceProvider().warehouses;
  const modalS = useModalProvider();

  return (_ctx: ITableListContext) => [
    { name: 'deleteProductInventory', icon: 'delete', onClick: () => {} },
    { name: 'editProductInventory', icon: 'edit', onClick: () => {} },
    {
      name: 'addProductInventory',
      icon: 'plus',
      onClick: () => {
        modalS.handleOpenModal({ Modal: Modals.FormCreateProductInventory });
      },
    },
  ];
};
export default PageWarehouseOverview;
