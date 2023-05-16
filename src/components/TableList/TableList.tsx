import React, { createContext, useContext, useRef, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import AppLoader from 'components/AppLoader/AppLoader';
import QuickActions from './QuickActions/QuickActions';
import TableOverHead from './TableOverHead/TableOverHead';
import TableFooter from './TableFooter/TableFooter';
import styled from 'styled-components';
import { CellTittleProps } from './TebleCells/CellTitle';
import { MaxToTabletXl } from 'components/atoms/DeviceTypeInformer/DeviceTypeController';
import { FilterDataType, FilterSelectorType } from 'components/Filter/AppFilter';

export interface SelectItem extends Record<string, any> {
  _id?: string;
  filter?: boolean;
  search?: boolean;
  label?: string;
  name?: string;
  value?: string | number;
  dataKey?: string;
  sort?: boolean;
  dataPath?: string;
}

export interface TableActionsProps {
  top?: any[];
  bottom?: any[];
  footer?: boolean;
}

export interface TabeleSelectedRow extends Record<string, any> {
  _id: string;
  amount?: number;
  type?: string;
}

export interface ITableSortParam {
  descending: boolean;
  dataKey: string;
}

export type OnRowClickType = <D = any>({
                                         ev,
                                         _id,
                                         data,
                                       }: {
  ev: MouseEvent | React.MouseEvent<HTMLDivElement>;
  _id: string;
  data: D;
}) => any;

export interface ITableListProps extends React.HTMLAttributes<HTMLDivElement> {
  tableTitles?: CellTittleProps[];
  tableSearchParams?: SelectItem[];
  tableSortParams?: SelectItem[];
  tableData?: any[];
  isLoading?: boolean;
  RowActionsComp?: React.ReactNode;
  quickActions?: {
    ActionsStart?: React.ReactNode;
    ActionsEnd?: React.ReactNode;
  };
  tableActions?: TableActionsProps;
  TableActionsComp?: React.ReactNode;
  isFilter?: boolean;
  isSearch?: boolean;
  footer?: boolean;
  counter?: boolean;
  checkBoxes?: boolean;
  rowGrid?: any;
  children?: React.ReactNode;
  filterTitle?: string;
  filterSelectors?: FilterSelectorType[];
  filterDefaultValues?: Partial<Record<keyof FilterDataType, any[] | string[]>>;
  onFilterSubmit?: (filterData: FilterDataType) => void;
  onRowClick?: <T = any>(rowData: T) => void;
  onUnSelectRow?: <T = any>(rowData: T) => void;
  onSelectRow?: <T = any[]>(rowsData: T) => void;
}

export interface ITableListContext {
  onSelectRow?: ({ ev, rowData }: { ev: Event; rowData: any }) => void;
  onUnselectRow?: ({ ev, rowData }: { ev: Event; rowData: any }) => void;
  selectedRows?: TabeleSelectedRow[] | any[];
  onRowClick?: OnRowClickType;
  rowRef?: React.MutableRefObject<HTMLElement | undefined>;
  handleTableSort?: (sortParam: ITableSortParam) => void;
}

export const TableCTX = createContext({});
export const useTable = () => useContext(TableCTX) as ITableListContext & ITableListProps;

const TableList: React.FC<ITableListProps> =
  ({
     tableData = [],
     isLoading = false,
     RowActionsComp,
     TableActionsComp,
     tableTitles,
     tableSearchParams,
     tableActions,
     footer = false,
     onRowClick,
     onSelectRow,
     onUnSelectRow,
     onFilterSubmit,
     filterTitle,
     filterDefaultValues,
     ...props
   }) => {
    const [selectedRows, setSelectedRows] = useState<TabeleSelectedRow[] | any[]>([]);
    const rowRef = useRef<HTMLElement>();


    const rowGrid = {
      display: 'grid',
      gridTemplateColumns: `repeat(${tableTitles?.length}, min-content)`,
    };

    function onSelectRowWrapper({ rowData }: { ev?: Event; rowData: any }) {
      setSelectedRows(prev => {
        typeof onSelectRow === 'function' && onSelectRow([rowData, ...prev]);
        return [rowData, ...prev];
      });
    }

    function onUnSelectRowWrapper({ rowData }: { ev?: Event; rowData?: { _id: string } }) {
      setSelectedRows(prev => {
        typeof onUnSelectRow === 'function' && onUnSelectRow(rowData);
        return prev.filter(row => row._id !== rowData?._id);
      });
    }

    function onRowClickWrapper(rowData: any) {
      typeof onRowClick === 'function' && onRowClick(rowData);
    }


    const CTX = {
      RowActionsComp,
      TableActionsComp,
      tableActions,
      footer,
      tableSearchParams,
      tableTitles,
      filterTitle,
      filterDefaultValues,
      rowGrid,
      rowRef,
      selectedRows,
      onSelectRow: onSelectRowWrapper,
      onUnselectRow: onUnSelectRowWrapper,
      tableData,
      isLoading,
      onRowClick: onRowClickWrapper,
      onFilterSubmit,
      ...props,
    };

    return (
      <Table {...props}>
        <TableCTX.Provider value={CTX}>
          <AppLoader isLoading={isLoading} />

          <TableOverHead />

          <TableScroll className='TableScroll'>
            <TableHead />

            {tableData.length !== 0 ? <TableBody /> : <NoData>Дані відсутні</NoData>}

            <MaxToTabletXl>{tableActions ? <QuickActions {...tableActions} footer={footer} /> : null}</MaxToTabletXl>
          </TableScroll>

          <TableFooter />
        </TableCTX.Provider>
      </Table>
    );
  };

// import cloneDeep from 'lodash.clonedeep';
// import { applyFounder } from 'components/BlockWithList/BlockUtils/founder';

const NoData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
`;
const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;

  position: relative;

  height: 100%;
  width: 100%;
  overflow: hidden;
`;
const TableScroll = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr min-content;

  /* position: relative; */

  height: 100%;
  width: 100%;
  overflow: auto;
`;

export default TableList;
