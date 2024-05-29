import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps, TableSortOrderEnum, TableSortParam } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { useProductsSelector } from '../../../redux/selectors.store';
import { ISortParams } from '../../../api';
import { FilterReturnDataType } from '../../Filter/AppFilter';
import { OfferEntity } from '../../../types/offers/offers.types';
import useProductsFilterSelectorsHook from '../../../hooks/useProductsFilterSelectors.hook';
import useOffersActionsCreator from '../../../hooks/useProductsActionsCreator.hook';
import { BaseAppPageProps } from '../index';
import {
  OfferSearchParam,
  OfferSortParam,
  offersSearchParams,
  offersSortParams,
  offersTableColumns,
} from '../../../data';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { TableSearchFormState } from '../../TableList/TableOverHead/TableSearchForm/TableSearchForm';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';

interface Props extends BaseAppPageProps {}

const PageOffers: React.FC<any> = (props: Props) => {
  const loaders = useLoaders<'offers'>({ offers: { content: 'Refeshing...' } });
  const { onLoading, isLoading } = loaders;
  const { getAll } = useAppServiceProvider()[AppModuleName.offers];

  const state = useProductsSelector();
  const filterSelectors = useProductsFilterSelectorsHook();
  const actionsCreator = useOffersActionsCreator();
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<OfferEntity> => ({
      filterSelectors,
      hasFilter: true,
      hasSearch: true,
      showFooter: false,
      checkBoxes: true,
      actionsCreator,
      tableTitles: offersTableColumns,
      searchParams: offersSearchParams,
      sortParams: offersSortParams,
      onSubmitSearch: ({ searchParam, search }) => {
        searchParam?.dataKey &&
          getAll({
            data: { refresh: true, params: { [searchParam.dataKey]: search } },
            onLoading: onLoading('offers'),
          }).then();
      },
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);

        getAll({
          data: { refresh: true, params: { filterParams, sortParams } },
          onLoading: onLoading('offers'),
        }).then();
      },
      onTableSortChange: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
        getAll({
          data: { refresh: true, params: { sortParams: { dataPath: param.dataPath, sortOrder }, filterParams } },
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

export const useOffersTableSettings = ({
  searchState,
  sortState,
}: {
  searchState?: TableSearchFormState<OfferSearchParam>;
  sortState?: { param: OfferSortParam; order: TableSortOrderEnum };
}) => {
  const service = useAppServiceProvider().get(AppModuleName.offers);
  const { getAll } = service;
  const state = useProductsSelector();

  const filterSelectors = useProductsFilterSelectorsHook();
  const actionsCreator = useOffersActionsCreator();

  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<{ param: TableSortParam; order: TableSortOrderEnum } | undefined>(
    sortState
  );
  const [searchParams, setSearchParams] = useState<TableSearchFormState | undefined>(searchState);
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<OfferEntity, OfferSearchParam, OfferSortParam> => ({
      onSubmitSearch: data => {
        if (data.search) {
          if (data.searchParam?.dataKey) {
            setSearchParams(data);
            getAll({
              data: { refresh: true, params: { [data.searchParam?.dataKey]: data.search } },
              onLoading: setIsLoading,
            }).then();
          }
        } else {
          getAll({
            data: { refresh: true },
            onLoading: setIsLoading,
          }).then();
        }
      },
      tableData: state.list,
      tableTitles: offersTableColumns,
      searchParams: offersSearchParams,
      sortParams: offersSortParams,
      filterSelectors,
      hasFilter: true,
      hasSearch: true,
      showFooter: false,
      checkBoxes: true,
      actionsCreator,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
        getAll({
          data: {
            refresh: true,
            params: { filterParams, sortParams: { sortOrder: sortParams?.order, dataPath: sortParams?.param.dataKey } },
          },
          onLoading: setIsLoading,
        }).then();
      },
      onTableSortChange: (param, sortOrder) => {
        setSortParams({ param, order: sortOrder });
        getAll({
          data: { refresh: true, params: { sortParams: { dataPath: param.dataPath, sortOrder }, filterParams } },
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
    searchParams,
  };
};
