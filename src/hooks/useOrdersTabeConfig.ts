export const useOrderTableConfigs = () => {
  // const service = useOrdersServiceHook();
  // const state = useOrdersSelector();
  // const { getAll } = service;
  // const actionsCreator = useOrdersActionsCreatorHook();
  // // const filterSelectors = useProductsFilterSelectorsHook();
  // const [isLoading, setIsLoading] = useState(false);
  // const [sortParams, setSortParams] = useState<ISortParams>();
  // const [filterParams, setFilterParams] = useState<FilterReturnDataType>();
  //
  // const tableConfig = useMemo(
  //   (): ITableListProps<IOrder> => ({
  //     tableData: state.orders,
  //     tableTitles: ordersTableColumns,
  //     tableSortParams: ordersSearchParams.filter(el => el.sort),
  //     isFilter: true,
  //     isSearch: true,
  //     footer: true,
  //     checkBoxes: true,
  //     actionsCreator,
  //     onFilterSubmit: filterParams => {
  //       setFilterParams(filterParams);
  //       getAll({ data: { refresh: true, query: { filterParams, sortParams } }, onLoading: setIsLoading }).then();
  //     },
  //     handleTableSort: (param, sortOrder) => {
  //       setSortParams({ dataPath: param.dataPath, sortOrder });
  //       getAll({
  //         data: { refresh: true, query: { sortParams: { dataPath: param.dataPath, sortOrder }, filterParams } },
  //         onLoading: setIsLoading,
  //       }).then();
  //     },
  //   }),
  //   [actionsCreator, filterParams, getAll, sortParams, state.orders]
  // );
  //
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
  //
  // return {
  //   tableConfig,
  //   sortParams,
  //   filterParams,
  // };
};