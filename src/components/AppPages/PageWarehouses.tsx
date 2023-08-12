import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import { priceListColumns } from 'data';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../TableList/tableTypes.types';
import AppGridPage from './AppGridPage';
import { usePriceListsSelector } from '../../redux/selectors.store';
import { ISortParams } from '../../api';
import { FilterReturnDataType } from '../Filter/AppFilter';
import { PagePathType } from '../../data/pages.data';
import useWarehousesServiceHook from '../../hooks/useWarehousesService.hook';
import useWarehousesActionsCreatorHook from '../../hooks/useWarehousesActionsCreator.hook';
import { IPriceList } from '../../redux/priceManagement/priceManagement.types';

type Props = {
  path: PagePathType;
};
const PageWarehouses: React.FC<any> = (props: Props) => {
  const service = useWarehousesServiceHook();
  const state = usePriceListsSelector();
  const { getAll } = service;
  const actionsCreator = useWarehousesActionsCreatorHook(service);
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<IPriceList> => ({
      tableData: state.lists,
      tableTitles: priceListColumns,
      isFilter: false,
      isSearch: true,
      footer: false,
      checkBoxes: true,
      actionsCreator,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
        getAll({ data: { refresh: true, query: { filterParams, sortParams } }, onLoading: setIsLoading }).then();
      },
      handleTableSort: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
        getAll({
          data: { refresh: true, query: { sortParams: { dataPath: param.dataPath, sortOrder }, filterParams } },
          onLoading: setIsLoading,
        }).then();
      },
    }),
    [actionsCreator, filterParams, getAll, sortParams, state.lists]
  );

  useEffect(() => {
    if (sortParams || filterParams) {
      return;
    }

    if (!sortParams && !filterParams) {
      if (state.lists.length === 0) {
        getAll({
          data: { refresh: true },
          onLoading: setIsLoading,
          onSuccess(d) {
            console.log('PageWarehouses onSuccess getAll');
          },
        });
      }
    }
  }, [filterParams, getAll, sortParams, state.lists.length]);
  return (
    <AppGridPage path={props.path}>
      <Page>
        <TableList {...tableConfig} isLoading={isLoading} />
      </Page>
    </AppGridPage>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

export default PageWarehouses;
