import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { useProductsSelector } from '../../../redux/selectors.store';
import { ISortParams } from '../../../api';
import { FilterReturnDataType } from '../../Filter/AppFilter';
import { OfferEntity } from '../../../types/offers/offers.types';
import useStorageServiceHook from '../../../hooks/useProductsService.hook';
import useProductsFilterSelectorsHook from '../../../hooks/useProductsFilterSelectors.hook';
import useOffersActionsCreator from '../../../hooks/useProductsActionsCreator.hook';
import { BaseAppPageProps } from '../index';
import { offersTableColumns } from '../../../data/offers.data';
import { transactionsSearchParams } from '../../../data/transactions.data';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';

interface Props extends BaseAppPageProps {}

const PageOffers: React.FC<any> = (props: Props) => {
  const loaders = useLoaders<'offers'>();
  const { onLoading, isLoading } = loaders;

  const { getAll } = useStorageServiceHook();
  const state = useProductsSelector();
  const filterSelectors = useProductsFilterSelectorsHook();
  const actionsCreator = useOffersActionsCreator();
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<OfferEntity> => ({
      filterSelectors,
      isFilter: true,
      isSearch: true,
      footer: false,
      checkBoxes: true,
      actionsCreator,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
        getAll({ data: { refresh: true, query: { filterParams, sortParams } }, onLoading: onLoading('offers') }).then();
      },
      handleTableSort: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
        getAll({
          data: { refresh: true, query: { sortParams: { dataPath: param.dataPath, sortOrder }, filterParams } },
          onLoading: onLoading('offers'),
        }).then();
      },
    }),
    [actionsCreator, filterParams, filterSelectors, getAll, onLoading, sortParams]
  );

  useEffect(() => {
    if (state.list?.length) return;

    if (sortParams || filterParams) {
      return;
    }

    if (!sortParams && !filterParams) {
      getAll({
        data: { refresh: true },
        onLoading: onLoading('offers'),
      });
      // if (state.products.length === 0) {
      // }
    }
    // eslint-disable-next-line
  }, []);

  return (
    <AppGridPage path={props.path}>
      <Page>
        <TableList
          {...tableConfig}
          {...{
            tableData: state.list,
            tableTitles: offersTableColumns,
          }}
          isLoading={isLoading?.offers}
        />
      </Page>
    </AppGridPage>
  );
};

const Page = styled.div`
  ${takeFullGridArea}
`;

export default PageOffers;

export const useProductsTableSettings = () => {
  const service = useStorageServiceHook();
  const state = useProductsSelector();
  const { getAll } = service;
  const filterSelectors = useProductsFilterSelectorsHook();
  const actionsCreator = useOffersActionsCreator();
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<OfferEntity> => ({
      tableData: state.list,
      tableTitles: offersTableColumns,
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
    [actionsCreator, filterParams, filterSelectors, getAll, sortParams, state.list]
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
        });
      }
    }
  }, [filterParams, getAll, isLoading, sortParams, state.list.length, tableConfig]);

  return {
    tableConfig,
    isLoading,
    sortParams,
    filterParams,
  };
};
