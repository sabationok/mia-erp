import { useAppParams } from '../../../hooks';
import { AppGridPage } from '../pages';
import styled from 'styled-components';
import { takeFullGridArea } from '../pagesStyles';

import { usePriceListOverviewActionsCreator } from '../../../hooks/usePriceListOverviewActionsCreator.hook';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useEffect, useMemo, useState } from 'react';
import { PriceEntity } from '../../../types/price-management/price-management.types';
import { ITableListProps } from '../../TableList/tableTypes.types';
import { ApiQuerySortParams } from '../../../api';
import { FilterReturnDataType } from '../../Filter/AppFilter';
import TableList from '../../TableList/TableList';
import { usePriceManagementSelector } from '../../../redux/selectors.store';
import { BaseAppPageProps } from '../index';
import { pricesColumns } from '../../../data/priceManagement.data';
import { getIdRef } from '../../../utils/data-transform';

interface Props extends BaseAppPageProps {}
const PagePriceListOverview: React.FC<Props> = ({ path }) => {
  const listId = useAppParams()?.priceListId;
  const actionsCreator = usePriceListOverviewActionsCreator(listId);
  const {
    priceManagement: { getById, getAllPrices },
  } = useAppServiceProvider();
  const list = usePriceManagementSelector()?.current;
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ApiQuerySortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  useEffect(() => {
    (filterParams || sortParams) && console.log('PagePriceListOverview ==============>>>>>>>>>>>');
    sortParams && console.log({ sortParams });
    filterParams && console.log({ filterParams });
  }, [filterParams, sortParams]);

  const tableConfig = useMemo(
    (): ITableListProps<PriceEntity> => ({
      tableData: list?.prices,
      hasFilter: false,
      hasSearch: true,
      showFooter: false,
      checkBoxes: true,
      actionsCreator,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
      },
      onTableSortChange: (param, sortOrder) => {
        setSortParams({ sortPath: param.dataPath, sortOrder });
      },
    }),
    [actionsCreator, list?.prices]
  );

  useEffect(() => {
    list && console.log('PagePriceListOverview', list);
  }, [list]);

  useEffect(() => {
    if (listId) {
      getById({
        data: { list: { _id: listId }, refreshCurrent: true },
        onLoading: setIsLoading,
        onSuccess: d => {
          getAllPrices({ data: { params: { list: getIdRef(d) }, refreshCurrent: true } });
        },
      });
    }
    // eslint-disable-next-line
  }, [listId]);

  return (
    <AppGridPage path={path}>
      <Page>
        <TableList
          {...tableConfig}
          isLoading={isLoading}
          actionsCreator={actionsCreator}
          hasSearch={false}
          tableTitles={pricesColumns}
        />
      </Page>
    </AppGridPage>
  );
};
const Page = styled.div`
  ${takeFullGridArea}
`;
export default PagePriceListOverview;
