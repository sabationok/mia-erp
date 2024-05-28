import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import QuickActions from './QuickActions';
import TableOverHead from './TableOverHead/TableOverHead';
import TableFooter from './TableFooter/TableFooter';
import styled from 'styled-components';
import { MaxToTabletXl } from 'components/atoms/DeviceTypeInformer/DeviceTypeController';
import { ButtonCheckboxEvent } from './TebleCells/CellComponents/CheckBox';
import {
  ITableListContext,
  ITableListProps,
  OnCheckBoxChangeHandlerEvent,
  SelectItem,
  UseTableReturnType,
} from './tableTypes.types';
import { FilterReturnDataType } from '../Filter/AppFilter';
import TableLoader from './TableLoader';
import { isUndefined } from 'lodash';
import { OnlyUUID } from '../../types/utils.types';
import FlexBox from '../atoms/FlexBox';

export type { ITableListContext, ITableListProps, OnCheckBoxChangeHandlerEvent, UseTableReturnType, SelectItem };
export const TableCTX = createContext({});
export const useTable: UseTableReturnType = () => useContext(TableCTX);

const TableList = <TData extends Partial<OnlyUUID> = any>({
  tableData,
  isLoading = false,
  RowActionsComp,
  // TableActionsComp,
  tableTitles,
  tableSearchParams,
  actionsCreator,
  footer = false,
  onRowClick,
  onCheckboxChange,
  onFilterSubmit,
  filterTitle,
  filterDefaultValues,
  scrollBarWidth,
  onSubmitSearch,
  selectedRow,
  ...props
}: ITableListProps<TData> & React.HTMLAttributes<HTMLDivElement>) => {
  // const tBodyRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLElement>();
  const setFilterData = useState<FilterReturnDataType>()[1];
  const [_selectedRows, _setSelectedRows] = useState<string[]>([]);
  const [_selectedRow, _setSelectedRow] = useState<Partial<TData> | undefined>(selectedRow);
  const [loading, setLoading] = useState(isLoading);

  const rowGrid = useMemo(
    () => ({
      display: 'grid',
      gridTemplateColumns: `repeat(${tableTitles?.length}, min-content)`,
    }),
    [tableTitles?.length]
  );

  const onFilterSubmitWrapper = useCallback(
    (data: FilterReturnDataType) => {
      setFilterData(data);
      typeof onFilterSubmit === 'function' && onFilterSubmit(data);
    },
    [onFilterSubmit, setFilterData]
  );

  const onRowClickWrapper = useCallback(
    (rowData?: { _id?: string; rowData?: TData }) => {
      _setSelectedRow(rowData?.rowData);

      typeof onRowClick === 'function' && onRowClick(rowData);
    },
    [onRowClick]
  );

  const onCheckboxChangeWrapper = useCallback(({ checked, _id }: OnCheckBoxChangeHandlerEvent) => {
    _setSelectedRows(prev => {
      if (checked && _id) return [...prev, _id];
      if (!checked && _id) return prev.filter(el => el !== _id);
      return prev;
    });
  }, []);

  const onHeadCheckboxChange = useCallback(
    (e: ButtonCheckboxEvent) => {
      const { checked } = e;
      if (checked) _setSelectedRows(prev => tableData?.map(el => el?._id ?? '') || prev);

      if (!checked) _setSelectedRows([]);
    },
    [tableData]
  );

  useEffect(() => {
    if (!isUndefined(selectedRow)) {
      _setSelectedRow(selectedRow);
    }
  }, [selectedRow]);

  const CTX = useMemo(
    (): ITableListContext<TData> => ({
      RowActionsComp,
      // TableActionsComp,
      actionsCreator,
      footer,
      tableSearchParams,
      tableTitles,
      filterTitle,
      filterDefaultValues,
      rowGrid,
      rowRef,
      selectedRows: _selectedRows,
      selectedRow: _selectedRow,
      tableData,
      onFilterSubmit: onFilterSubmitWrapper,
      onRowClick: onRowClickWrapper,
      onCheckboxChange: onCheckboxChangeWrapper,
      onHeadCheckboxChange: onHeadCheckboxChange,
      onSubmitSearch,
      onRefresh: setLoading,
      ...props,
    }),
    [
      RowActionsComp,
      // TableActionsComp,
      actionsCreator,
      filterDefaultValues,
      filterTitle,
      footer,
      onCheckboxChangeWrapper,
      onFilterSubmitWrapper,
      onHeadCheckboxChange,
      onRowClickWrapper,
      onSubmitSearch,
      props,
      rowGrid,
      _selectedRow,
      _selectedRows,
      tableData,
      tableSearchParams,
      tableTitles,
    ]
  );

  return (
    <Table {...props}>
      <TableCTX.Provider value={{ ...CTX }}>
        <TableOverHead />

        <FlexBox fxDirection={'row'} maxWidth={'100%'} overflow={'hidden'} height={'100%'} flex={1} maxHeight={'100%'}>
          <FlexBox overflow={'hidden'} flex={1} maxHeight={'100%'}>
            <TableScroll className={'TableScroll'} scrollBarWidth={scrollBarWidth}>
              <TableHead />

              {tableData?.length !== 0 && <TableBody ref={rowRef} />}

              <TableLoader isLoading={isLoading || loading} />
            </TableScroll>
          </FlexBox>

          {actionsCreator && (
            <MaxToTabletXl>
              <>
                <QuickActions />
              </>
            </MaxToTabletXl>
          )}
        </FlexBox>

        {tableData?.length === 0 && <NoData>Дані відсутні</NoData>}

        {footer && <TableFooter />}
      </TableCTX.Provider>
    </Table>
  );
};

const Table = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: min-content 1fr min-content;

  position: relative;

  height: 100%;
  width: 100%;
  overflow: hidden;

  //background-color: ${({ theme }) => theme.tableBackgroundColor};
`;
const TableScroll = styled(FlexBox)<{ scrollBarWidth?: number }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 48px 1fr min-content;

  flex: 1;

  height: 100%;
  width: 100%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: ${({ scrollBarWidth = 4 }) => scrollBarWidth}px;
    height: ${({ scrollBarWidth = 4 }) => scrollBarWidth}px;
  }
`;
const NoData = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  height: 50px;
  padding: 12px;

  border-top: 1px solid ${p => p.theme.trBorderClr};
`;
export default TableList;
