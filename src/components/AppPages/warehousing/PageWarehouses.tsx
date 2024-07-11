import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { useWarehousesSelector } from '../../../redux/selectors.store';
import { ApiQuerySortParams } from '../../../api';
import { FilterReturnDataType } from '../../Filter/AppFilter';
import useWarehousesActionsCreatorHook from '../../../hooks/useWarehousesActionsCreator.hook';
import { warehousesTableColumns } from '../../../data/warehauses.data';
import { WarehouseEntity } from '../../../types/warehousing/warehouses.types';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useNavigate } from 'react-router-dom';
import { BaseAppPageProps } from '../index';

interface Props extends BaseAppPageProps {}

const PageWarehouses: React.FC<any> = (props: Props) => {
  const navigate = useNavigate();
  const { getAll } = useAppServiceProvider()[ServiceName.warehouses];
  const state = useWarehousesSelector();
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ApiQuerySortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();
  const actionsCreator = useWarehousesActionsCreatorHook();

  const tableConfig = useMemo(
    (): ITableListProps<WarehouseEntity> => ({
      tableData: state.list,
      tableTitles: warehousesTableColumns,
      hasFilter: false,
      hasSearch: true,
      showFooter: false,
      actionsCreator,
      onRowDoubleClick(ev) {
        ev?.rowId && navigate(ev?.rowId);
      },
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
        getAll({ data: { refresh: true, query: { filterParams, sortParams } }, onLoading: setIsLoading }).then();
      },
      onTableSortChange: (param, sortOrder) => {
        setSortParams({ sortPath: param.dataPath, sortOrder });
        getAll({
          data: { refresh: true, query: { sortParams: { sortPath: param.dataPath, sortOrder }, filterParams } },
          onLoading: setIsLoading,
        }).then();
      },
    }),
    [actionsCreator, filterParams, getAll, navigate, sortParams, state.list]
  );

  useEffect(() => {
    if (sortParams || filterParams) {
      return;
    }

    if (!sortParams && !filterParams) {
      if (state.list.length === 0) {
        getAll({
          data: { refresh: true },
          onLoading: setIsLoading,
          onSuccess(_data) {
            console.log('PageWarehouses onSuccess getAll');
          },
        });
      }
    }
  }, [filterParams, getAll, sortParams, state.list.length]);
  return (
    <AppGridPage path={props.path}>
      <Page>
        <TableList tableTitles={warehousesTableColumns} {...tableConfig} isLoading={isLoading} />
      </Page>
    </AppGridPage>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

export default PageWarehouses;
