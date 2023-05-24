import React, { createContext, useContext, useRef, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import AppLoader from 'components/atoms/AppLoader';
import QuickActions from './QuickActions/QuickActions';
import TableOverHead from './TableOverHead/TableOverHead';
import TableFooter from './TableFooter/TableFooter';
import styled from 'styled-components';
import { CellTittleProps } from './TebleCells/CellTitle';
import { MaxToTabletXl } from 'components/atoms/DeviceTypeInformer/DeviceTypeController';
import {
  FilterReturnDataType,
  FilterSelectorType,
} from 'components/Filter/AppFilter';
import { IBase } from 'redux/global.types';
import { CustomCheckboxEvent } from './TebleCells/CellComponents/CheckBox';

export interface SelectItemBase extends Record<string, any> {
  _id?: string;
  filter?: boolean;
  search?: boolean;
  label?: string;
  name?: string;
  value?: string | number;
  dataKey?: string;
  sort?: boolean;
  dataPath?: string;
  descending?: boolean;
  path?: string;
}

export interface SelectItem extends SelectItemBase {}

export interface TableActionProps<TDataType = any> {
  separator?: boolean;
  iconId?: string;
  onClick?: () => void;
  type?: 'primary' | 'filled';
  disabled?: string;
  disabledCheck?: (selectedRows: TDataType[]) => boolean;
}

export interface TableActionsProps<TDataType = any> {
  top?: any[];
  bottom?: any[];
  footer?: boolean;
  actions?: TableActionProps<TDataType>[];
}

export interface ITableSortParam
  extends Pick<SelectItem, 'descending' | 'path' | 'dataPath' | 'dataKey'> {}

export type OnRowClickHandlerData<RData = any> = {
  ev?: MouseEvent | React.MouseEvent<HTMLDivElement>;
  _id?: string;
  rowData?: RData;
};
export type OnRowClickHandler<RData = any> = (
  data: OnRowClickHandlerData<RData>
) => any;

export type OnCheckBoxChangeHandlerEvent<V = any> = {
  ev?: MouseEvent | React.MouseEvent<HTMLDivElement>;
  checked: boolean;
  _id?: string;
  value?: V;
};
export type OnCheckBoxChangeHandler<V = any> = (
  data: OnCheckBoxChangeHandlerEvent<V>
) => any;
export type OnHeadCheckBoxChangeHandler<V = any> = (data: V) => any;

export interface ITableListProps<TDataType = any>
  extends React.HTMLAttributes<HTMLDivElement> {
  tableTitles?: CellTittleProps[];
  tableSearchParams?: SelectItem[];
  tableSortParams?: ITableSortParam[];
  tableData?: TDataType[];
  isLoading?: boolean;
  RowActionsComp?: React.ReactNode;
  quickActions?: {
    ActionsStart?: React.ReactNode;
    ActionsEnd?: React.ReactNode;
  };
  tableActions?: TableActionsProps<TDataType>;
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
  filterDefaultValues?: FilterReturnDataType;
  onFilterSubmit?: (filterData: FilterReturnDataType) => void;
  onRowClick?: OnRowClickHandler<TDataType>;
  onCheckboxChange?: OnCheckBoxChangeHandler;
  onHeadCheckboxChange?: OnHeadCheckBoxChangeHandler;
  onTableSortParamChange?: (params: ITableSortParam) => void;
  handleTableSort?: (sortParam: ITableSortParam) => void;
}

export interface ITableListContext<TDataType = any>
  extends ITableListProps<TDataType> {
  selectedRows?: string[];
  rowRef?: React.MutableRefObject<HTMLElement | undefined>;
}

export const TableCTX = createContext({});
export type UseTableHookType = <
  TDataType = any
>() => ITableListContext<TDataType>;
export const useTable: UseTableHookType = () => useContext(TableCTX);

const TableList: React.FC<ITableListProps> = ({
  tableData,
  isLoading = false,
  RowActionsComp,
  TableActionsComp,
  tableTitles,
  tableSearchParams,
  tableActions,
  footer = false,
  onRowClick,
  onCheckboxChange,
  onFilterSubmit,
  filterTitle,
  filterDefaultValues,
  ...props
}) => {
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const rowRef = useRef<HTMLElement>();

  const rowGrid = {
    display: 'grid',
    gridTemplateColumns: `repeat(${tableTitles?.length}, min-content)`,
  };

  function onRowClickWrapper(rowData: any) {
    // console.log(rowRef.current);
    typeof onRowClick === 'function' && onRowClick(rowData);
  }

  function onCheckboxChangeWrapper({
    checked,
    _id,
  }: OnCheckBoxChangeHandlerEvent) {
    setSelectedRows(prev => {
      if (checked && _id) return [...prev, _id];
      if (!checked && _id) return prev.filter(el => el !== _id);
      return prev;
    });
  }

  function onHeadCheckboxChange(e: CustomCheckboxEvent) {
    const { checked } = e;
    if (checked) setSelectedRows(prev => tableData?.map(el => el._id) || prev);
    if (!checked) setSelectedRows([]);
  }

  const CTX: ITableListContext<IBase> = {
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
    tableData,
    isLoading,
    onFilterSubmit,
    onRowClick: onRowClickWrapper,
    onCheckboxChange: onCheckboxChangeWrapper,
    onHeadCheckboxChange: onHeadCheckboxChange,
    ...props,
  };

  return (
    <Table {...props}>
      <TableCTX.Provider value={CTX}>
        <AppLoader isLoading={isLoading} />

        <TableOverHead />

        <TableScroll className="TableScroll">
          <TableHead />

          {tableData?.length !== 0 ? (
            <TableBody ref={rowRef} />
          ) : (
            <NoData>Дані відсутні</NoData>
          )}

          <MaxToTabletXl>
            {tableActions ? (
              <QuickActions {...tableActions} footer={footer} />
            ) : null}
          </MaxToTabletXl>
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
