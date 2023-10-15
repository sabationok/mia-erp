import TableList from 'components/TableList/TableList';
import { takeFullGridArea } from '../pagesStyles';
import styled from 'styled-components';
import { useEffect, useMemo, useState } from 'react';
import { ITableListProps } from '../../TableList/tableTypes.types';
import AppGridPage from '../AppGridPage';
import { ISortParams } from '../../../api';
import { FilterReturnDataType } from '../../Filter/AppFilter';
import { Path } from 'react-hook-form';
import { ICustomerBase } from '../../../redux/customers/customers.types';
import { customersColumns } from '../../../data/customers.data';
import { BaseAppPageProps } from '../index';
import { ServiceName, useAppServiceProvider } from '../../../hooks/useAppServices.hook';
import { useCustomersSelector } from '../../../redux/selectors.store';

interface Props extends BaseAppPageProps {}

export type UseTableForm<TData = any> = FilterReturnDataType & {
  sortKey?: Path<TData>;
  sortOrder?: 'DESC' | 'ACS';
  search?: string;
  searchKey?: Path<TData>;
};

const PageCustomers: React.FC<Props> = (props: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();
  const service = useAppServiceProvider()[ServiceName.customers];
  const tableData = useCustomersSelector().customers;

  const tableConfig = useMemo(
    (): ITableListProps<ICustomerBase> => ({
      tableData,
      tableTitles: customersColumns,
      isFilter: true,
      isSearch: true,
      footer: false,
      checkBoxes: true,
      actionsCreator: ctx => {
        const selected = ctx?.selectedRow;
        return [
          {
            icon: 'refresh',
            onClick: () => {
              service.getAll({ data: { refresh: true, params: {} } });
            },
          },
        ];
      },
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
        // getAll({ data: { refresh: true, query: { filterParams, sortParams } }, onLoading: setIsLoading }).then();
      },
      handleTableSort: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
        // getAll({
        //   data: { refresh: true, query: { sortParams: { dataPath: param.dataPath, sortOrder }, filterParams } },
        //   onLoading: setIsLoading,
        // }).then();
      },
    }),
    []
  );

  // useEffect(() => {
  //   if (sortParams || filterParams) {
  //     return;
  //   }
  //
  //   if (!sortParams && !filterParams) {
  //     if (state.products.length === 0) {
  //       getAll({
  //         data: { refresh: true },
  //         onLoading: setIsLoading,
  //       });
  //     }
  //   }
  // }, [filterParams, getAll, sortParams, state.products.length]);
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

export default PageCustomers;

export const useCustomersTableSettings = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [sortParams, setSortParams] = useState<ISortParams>();
  const [filterParams, setFilterParams] = useState<FilterReturnDataType>();

  const tableConfig = useMemo(
    (): ITableListProps<ICustomerBase> => ({
      isFilter: true,
      isSearch: true,
      footer: false,
      checkBoxes: true,
      onFilterSubmit: filterParams => {
        setFilterParams(filterParams);
        // getAll({ data: { refresh: true, query: { filterParams, sortParams } }, onLoading: setIsLoading }).then();
      },
      handleTableSort: (param, sortOrder) => {
        setSortParams({ dataPath: param.dataPath, sortOrder });
        // getAll({
        //   data: { refresh: true, query: { sortParams: { dataPath: param.dataPath, sortOrder }, filterParams } },
        //   onLoading: setIsLoading,
        // }).then();
      },
    }),
    []
  );

  useEffect(() => {
    if (sortParams || filterParams) {
      return;
    }

    if (!sortParams && !filterParams) {
      // if (state.products.length === 0) {
      //   getAll({
      //     data: { refresh: true },
      //     onLoading: setIsLoading,
      //   });
      // }
    }
  }, [filterParams, isLoading, sortParams, tableConfig]);

  return {
    tableConfig,
    isLoading,
    sortParams,
    filterParams,
  };
};
