import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useMemo, useState } from 'react';
import { ITableListProps } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { useRefundsSelector } from '../../../redux/selectors.store';
import { ISortParams } from '../../../api';
import { FilterReturnDataType } from '../../Filter/AppFilter';
import { ordersTableColumns } from '../../../data/orders.data';
import { IRefund } from '../../../redux/refunds/refunds.types';
import useOrdersServiceHook from '../../../hooks/useOrdersService.hook';
import { BaseAppPageProps } from '../index';

interface Props extends BaseAppPageProps {}

export const useOrderTableConfigs = () => {
  const service = useOrdersServiceHook();
  const state = useRefundsSelector();
  const { getAll } = service;
  // const actionsCreator = useOrdersActionsCreatorHook();
  // const filterSelectors = useProductsFilterSelectorsHook();
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<IRefund> => ({
      tableData: state.refunds,
      tableTitles: ordersTableColumns as never,
      // tableSortParams: ordersSearchParams.filter(el => el.sort),
      hasFilter: true,
      hasSearch: true,
      showFooter: true,
      checkBoxes: true,
      // actionsCreator,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
        getAll({ data: { refresh: true, query: { filterParams, sortParams } }, onLoading: setIsLoading }).then();
      },
      onTableSortChange: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
        getAll({
          data: { refresh: true, query: { sortParams: { dataPath: param.dataPath, sortOrder }, filterParams } },
          onLoading: setIsLoading,
        }).then();
      },
    }),
    [filterParams, getAll, sortParams, state.refunds]
  );

  // useEffect(() => {
  //   if (sortParams || filterParams) {
  //     return;
  //   }
  //
  //   if (!sortParams && !filterParams) {
  //     if (state.orders.length === 0) {
  //       getAll({
  //         data: { refresh: true },
  //         onLoading: setIsLoading,
  //       });
  //     }
  //   }
  // }, [filterParams, getAll, isLoading, sortParams, state.orders.length, tableConfig]);

  return {
    tableConfig,
    isLoading,
    sortParams,
    filterParams,
  };
};
const PageRefunds: React.FC<any> = (props: Props) => {
  const { tableConfig, isLoading } = useOrderTableConfigs();

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

export default PageRefunds;
