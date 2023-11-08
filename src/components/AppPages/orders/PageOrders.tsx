import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { useOrdersSelector } from '../../../redux/selectors.store';
import { ISortParams } from '../../../api';
import { FilterReturnDataType } from '../../Filter/AppFilter';
import { mockOrdersData, ordersSearchParams, ordersTableColumns } from '../../../data/orders.data';
import useOrdersServiceHook from '../../../hooks/useOrdersService.hook';
import { IOrder, OrderStatusEnum } from '../../../redux/orders/orders.types';
import useOrdersActionsCreatorHook from '../../../hooks/useOrdersActionsCreator.hook';
import { BaseAppPageProps } from '../index';
import { enumToFilterOptions } from '../../../utils/fabrics';
import ModalFilter from '../../ModalForm/ModalFilter';
import FlexBox from '../../atoms/FlexBox';
import { Text } from '../../atoms/Text';

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

  return (
    <AppGridPage path={props.path}>
      <Page>
        <ModalFilter
          style={{ height: 44 }}
          filterOptions={ordersFilterOptions}
          renderLabel={info => {
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
                <Text $size={12} $weight={600} $textTransform={'none'}>
                  {info?.option?.label ?? null}
                </Text>

                <Text $size={10} $weight={500} $ellipsisMode>
                  {info?.option?.value ? filterButtonResults[info?.option?.value] : 0}
                </Text>
              </FlexBox>
            );
          }}
        />

        <FlexBox fillWidth flex={1}>
          <TableList {...tableConfig} tableData={mockOrdersData} isLoading={isLoading} />
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
  const service = useOrdersServiceHook();
  const state = useOrdersSelector();
  const { getAll } = service;
  const actionsCreator = useOrdersActionsCreatorHook();
  // const filterSelectors = useProductsFilterSelectorsHook();
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<IOrder> => ({
      tableData: state.orders,
      tableTitles: ordersTableColumns,
      tableSortParams: ordersSearchParams.filter(el => el.sort),
      isFilter: true,
      isSearch: true,
      footer: true,
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
    [actionsCreator, filterParams, getAll, sortParams, state.orders]
  );

  useEffect(() => {
    if (sortParams || filterParams) {
      return;
    }

    if (!sortParams && !filterParams) {
      if (state.orders.length === 0) {
        getAll({
          data: { refresh: true },
          onLoading: setIsLoading,
        });
      }
    }
  }, [filterParams, getAll, isLoading, sortParams, state.orders.length, tableConfig]);

  return {
    tableConfig,
    isLoading,
    sortParams,
    filterParams,
  };
};
