import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { GetAllSaleOrdersQuery } from '../../../api';
import {
  ordersSearchParams,
  ordersSortParams,
  ordersTableColumns,
  SaleOrdersSearchParam,
  SaleOrdersSortParam,
} from '../../../data';
import { OrderEntity, OrderStatusEnum } from '../../../types/orders/orders.types';
import useOrdersActionsCreatorHook from '../../../hooks/useOrdersActionsCreator.hook';
import { BaseAppPageProps } from '../index';
import { enumToFilterOptions } from '../../../utils';
import TabSelector, { FilterOption } from '../../atoms/TabSelector';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';
import {
  TableSearchFormState,
  TableSortFormState,
} from '../../TableList/TableOverHead/TableSearchForm/TableSearchForm';
import { useLoaders } from '../../../Providers/Loaders/useLoaders.hook';
import { useAppRouter } from '../../../hooks';

interface Props extends BaseAppPageProps {}
const ordersFilterOptions = enumToFilterOptions(OrderStatusEnum);

// const useDynamicFilterOptionsByEnum = <T extends Record<string, any> = any>(
//   enumObj: T,
//   builder: (
//     option: FilterOption<T[keyof T]>,
//     index: number,
//     arr: FilterOption<T[keyof T]>[]
//   ) => Partial<DynamicFilterOption<T[keyof T]>>
// ) => {
//   const options = useMemo(() => {
//     return enumToFilterOptions(enumObj).map((value, index, array) => ({ ...value, ...builder(value, index, array) }));
//   }, [builder, enumObj]);
//
//   return options;
// };

const PageOrders: React.FC<any> = (props: Props) => {
  const { tableConfig, isLoading } = useOrderTableConfigs();

  const [filterButtonResults] = useState<Record<OrderStatusEnum | string, number | string>>({});
  const renderLabel = useCallback(
    (info: { option?: FilterOption<OrderStatusEnum>; index: number; isActive: boolean }) => {
      return (
        <FlexBox
          justifyContent={'space-between'}
          fillHeight
          fillWidth
          overflow={'hidden'}
          padding={'2px 4px'}
          gap={6}
          style={{ cursor: 'inherit' }}
        >
          <Text $size={11} $weight={500} $textTransform={'none'}>
            {info?.option?.label ?? null}
          </Text>

          <Text $size={10} $ellipsisMode>
            {info?.option?.value ? filterButtonResults[info?.option?.value] : 0}
          </Text>
        </FlexBox>
      );
    },
    [filterButtonResults]
  );
  return (
    <AppGridPage path={props.path}>
      <Page>
        <TabSelector
          style={{ height: 52 }}
          options={ordersFilterOptions}
          renderLabel={renderLabel}
          optionProps={{ fitContentH: false }}
        />

        <FlexBox fillWidth flex={1} overflow={'hidden'}>
          <TableList {...tableConfig} isLoading={isLoading.orders} />
        </FlexBox>
      </Page>
    </AppGridPage>
  );
};

const Page = styled(FlexBox)`
  ${takeFullGridArea}
`;

export default PageOrders;

export const useOrderTableConfigs = () => {
  const loaders = useLoaders<'orders' | 'refresh' | 'order'>({
    orders: { content: 'Refreshing...' },
    refresh: { content: 'Refreshing...' },
    order: { content: 'Refreshing...' },
  });
  const { onLoading, isLoading } = loaders;
  const { getAll } = useAppServiceProvider()[AppModuleName.orders];
  const state = useOrdersSelector();
  const actionsCreator = useOrdersActionsCreatorHook();

  const router = useAppRouter<{
    searchPath?: SaleOrdersSearchParam['dataPath'];
    sortPath?: SaleOrdersSortParam['dataPath'];
  }>();

  // const filterSelectors = useProductsFilterSelectorsHook();
  const [sortParams, setSortParams] = useState<TableSortFormState<SaleOrdersSearchParam>>();
  const [searchParams, setSearchParams] = useState<TableSearchFormState<SaleOrdersSortParam>>();

  const tableConfig = useMemo(
    (): ITableListProps<OrderEntity> => ({
      tableData: state.orders,
      tableTitles: ordersTableColumns,
      sortParams: ordersSearchParams,
      searchParams: ordersSortParams,
      hasFilter: false,
      hasSearch: true,
      showFooter: true,
      checkBoxes: true,
      actionsCreator,

      onSubmitSearch: data => {
        if (data.search) {
          const params: GetAllSaleOrdersQuery = {
            search: data.search,
            searchPath: data.param.dataPath,
          };
          router.push({
            query: {
              search: data.search,
              searchPath: data.param.dataPath,
            },
          });

          setSearchParams(data);

          getAll({
            params,
            onLoading: onLoading('orders'),
          }).then();
        } else {
          getAll({
            onLoading: onLoading('orders'),
          }).then();
        }
      },

      onTableSortChange: (param, order) => {
        setSortParams({ param, order });

        router.push({
          query: {
            sortPath: param.dataPath,
            sortOrder: order,
          },
        });

        getAll({
          params: {
            sortOrder: order,
            sortPath: param.dataPath,
          },

          onLoading: onLoading('orders'),
        }).then();
      },
    }),
    [actionsCreator, getAll, onLoading, router, state.orders]
  );

  useEffect(() => {
    getAll({
      data: { refresh: true },
      onLoading: onLoading('orders'),
    });

    // eslint-disable-next-line
  }, []);

  return {
    tableConfig,
    isLoading,
    sortParams,
    searchParams,
  };
};
