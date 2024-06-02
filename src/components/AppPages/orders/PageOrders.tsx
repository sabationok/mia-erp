import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { ISortParams } from '../../../api';
import { FilterReturnDataType } from '../../Filter/AppFilter';
import { ordersSearchParams, ordersTableColumns } from '../../../data';
import { OrderEntity, OrderStatusEnum } from '../../../types/orders/orders.types';
import useOrdersActionsCreatorHook from '../../../hooks/useOrdersActionsCreator.hook';
import { BaseAppPageProps } from '../index';
import { enumToFilterOptions } from '../../../utils';
import TabSelector, { FilterOption } from '../../atoms/TabSelector';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';
import { useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { AppModuleName } from '../../../redux/reduxTypes.types';

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
          <TableList {...tableConfig} isLoading={isLoading} />
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
  const { getAll } = useAppServiceProvider()[AppModuleName.orders];
  const state = useOrdersSelector();
  const actionsCreator = useOrdersActionsCreatorHook();
  // const filterSelectors = useProductsFilterSelectorsHook();
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<OrderEntity> => ({
      tableData: state.orders,
      tableTitles: ordersTableColumns,
      sortParams: ordersSearchParams.filter(el => el.sort),
      hasFilter: true,
      hasSearch: true,
      showFooter: true,
      checkBoxes: true,
      actionsCreator,
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
    [actionsCreator, filterParams, getAll, sortParams, state.orders]
  );

  useEffect(() => {
    if (sortParams || filterParams) {
      return;
    }

    getAll({
      data: { refresh: true },
      onLoading: setIsLoading,
    });

    // eslint-disable-next-line
  }, []);

  return {
    tableConfig,
    isLoading,
    sortParams,
    filterParams,
  };
};
