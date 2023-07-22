import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from './pagesStyles';
import { productsColumns, transactionsSearchParams } from 'data';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../TableList/tableTypes.types';
import AppGridPage from './AppGridPage';
import { useProductsSelector } from '../../redux/selectors.store';
import { ISortParams } from '../../api';
import { FilterReturnDataType } from '../Filter/AppFilter';
import { IProduct } from '../../redux/products/products.types';
import useProductsServiceHook from '../../redux/products/useProductsService.hook';
import { useProductsActionsCreator } from '../../redux/products/useProductsActionsCreator.hook';
import { PagePathType } from '../../data/pages.data';
import useProductsFilterSelectorsHook from '../../redux/products/useProductsFilterSelectors.hook';

type Props = {
  path: PagePathType;
};
const PageProducts: React.FC<any> = (props: Props) => {
  const service = useProductsServiceHook();
  const state = useProductsSelector();
  const { getAll } = service;
  const filterSelectors = useProductsFilterSelectorsHook();
  const actionsCreator = useProductsActionsCreator(service);
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<IProduct> => ({
      tableData: state.products,
      tableTitles: productsColumns,
      tableSortParams: transactionsSearchParams.filter(el => el.sort),
      filterSelectors,
      isFilter: true,
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
    [actionsCreator, filterParams, filterSelectors, getAll, sortParams, state.products]
  );

  useEffect(() => {
    if (sortParams || filterParams) {
      return;
    }

    if (!sortParams && !filterParams) {
      if (state.products.length === 0) {
        getAll({
          data: { refresh: true },
          onLoading: setIsLoading,
        });
      }
    }
  }, [filterParams, getAll, sortParams, state.products.length]);
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

export default PageProducts;
