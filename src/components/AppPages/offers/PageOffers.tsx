import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps, TableSortOrderEnum } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { useOffersSelector } from '../../../redux/selectors.store';
import { GetAllOffersQuery } from '../../../api';
import { OfferEntity } from '../../../types/offers/offers.types';
import useProductsFilterSelectorsHook from '../../../hooks/useProductsFilterSelectors.hook';
import useOffersActionsCreator from '../../../hooks/useOffersActionsCreator.hook';
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
import { setValueByPath } from '../../../utils';

interface Props extends BaseAppPageProps {}

const PageOffers: React.FC<any> = (props: Props) => {
  const { tableConfig, isLoading } = useOffersTableSettings({});

  return (
    <AppGridPage path={props.path}>
      <Page>
        <TableList {...tableConfig} showFooter isLoading={isLoading?.offers} />
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
  const loaders = useLoaders<'offers' | 'refresh' | 'offer'>({
    offers: { content: 'Refreshing...' },
    refresh: { content: 'Refreshing...' },
    offer: { content: 'Refreshing...' },
  });
  const { onLoading, isLoading } = loaders;
  const service = useAppServiceProvider().get(AppModuleName.offers);
  const { getAll } = service;
  const state = useOffersSelector();

  const filterSelectors = useProductsFilterSelectorsHook();
  const actionsCreator = useOffersActionsCreator({ loaders });

  const [sortParams, setSortParams] = useState(sortState);
  const [searchParams, setSearchParams] = useState<TableSearchFormState | undefined>(searchState);
  // const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<OfferEntity, OfferSearchParam, OfferSortParam> => ({
      onSubmitSearch: data => {
        if (data.search) {
          const params: GetAllOffersQuery = {};

          const path = data.param?.dataPath;
          if (path && data.search) {
            setValueByPath(path, data.search, params, { mutation: true });
          }

          setSearchParams(data);

          getAll({
            params,
            onLoading: onLoading('offers'),
          }).then();
        } else {
          getAll({
            onLoading: onLoading('offers'),
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

      onTableSortChange: (param, order) => {
        setSortParams({ param, order });

        console.log({ param, order });

        getAll({
          params: {
            sortOrder: order,
            sortPath: param.dataPath,
          },

          onLoading: onLoading('offers'),
        }).then();
      },
    }),
    [actionsCreator, filterSelectors, getAll, onLoading, state.list]
  );

  useEffect(() => {
    if (state.list.length === 0) {
      getAll({
        onLoading: onLoading('offers'),
      });
    }

    // eslint-disable-next-line
  }, []);

  return {
    tableConfig,
    isLoading,
    sortParams,
    // filterParams,
    searchParams,
  };
};
