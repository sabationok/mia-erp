import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import QuickActions from './QuickActions';
import TableOverHead from './TableOverHead/TableOverHead';
import TableFooter from './TableFooter/TableFooter';
import styled from 'styled-components';
import { MaxToTabletXl } from 'components/atoms/DeviceTypeInformer/DeviceTypeController';
import { CheckboxEvent } from './TebleCells/CellComponents/CheckBox';
import {
  CheckboxChangeEvent,
  ITableListContext,
  ITableListProps,
  OnRowClickHandler,
  SelectItem,
  UseTableReturnType,
} from './tableTypes.types';
import { FilterReturnDataType } from '../Filter/AppFilter';
import TableLoader from './TableLoader';
import { isFunction, isUndefined } from 'lodash';
import { OnlyUUID } from '../../types/utils.types';
import FlexBox from '../atoms/FlexBox';
import { updateIdsArray } from '../../utils';

export type { ITableListContext, ITableListProps, CheckboxChangeEvent, UseTableReturnType, SelectItem };
export const TableCTX = createContext({});
export const useTable: UseTableReturnType = () => useContext(TableCTX);

const TableList = <TData extends Partial<OnlyUUID> = any>(
  props: ITableListProps<TData> & React.HTMLAttributes<HTMLDivElement>
) => {
  // const tBodyRef = useRef<HTMLElement>(null);
  const {
    tableData,
    isLoading = false,
    tableTitles,
    actionsCreator,
    showFooter = false,
    onRowClick,
    onFilterSubmit,
    scrollBarWidth,
    selectedRow,
    keyExtractor,
    selectedRows,
    onCheckboxChange,
    onHeadCheckboxChange,
    rowIds,
    ...rest
  } = props;

  const rowRef = useRef<HTMLElement>();
  const setFilterData = useState<FilterReturnDataType>()[1];
  const [_selectedRows, _setSelectedRows] = useState<string[]>(selectedRows ?? []);
  const [_selectedRow, _setSelectedRow] = useState<Partial<TData> | undefined>(selectedRow);
  const [loading, setLoading] = useState(isLoading);
  const _rowIds = useMemo(() => {
    return rowIds ? rowIds : tableData?.map((el, index) => (keyExtractor ? keyExtractor(el, index) : el?._id ?? ''));
  }, [keyExtractor, rowIds, tableData]);

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

  const onRowClickWrapper: OnRowClickHandler<TData | undefined> = useCallback(
    event => {
      _setSelectedRow(event?.rowData);
      console.log('[onRowClickWrapper]', event);
      isFunction(onRowClick) && onRowClick(event);
    },
    [onRowClick]
  );

  const onCheckboxChangeWrapper = useCallback(
    ({ checked, rowId, ...ev }: CheckboxChangeEvent) => {
      if (onCheckboxChange) {
        onCheckboxChange({ checked, rowId, ...ev });
      } else {
        _setSelectedRows(prev => {
          return rowId
            ? updateIdsArray({
                id: rowId,
                arr: prev,
                remove: checked,
                // toggle: true,
              })
            : prev;
        });
      }
    },
    [onCheckboxChange]
  );

  const onHeadCheckboxChangeWrapper = useCallback(
    (e: CheckboxEvent) => {
      if (onHeadCheckboxChange) {
        onHeadCheckboxChange(e);
      } else {
        const { checked } = e;
        _setSelectedRows(checked ? _rowIds ?? [] : []);
      }
    },
    [onHeadCheckboxChange, _rowIds]
  );

  useEffect(() => {
    if (!isUndefined(selectedRow)) {
      _setSelectedRow(selectedRow);
    }
  }, [selectedRow]);

  const CTX = useMemo(
    (): ITableListContext<TData> => ({
      selectedRows: _selectedRows,
      selectedRow: _selectedRow,
      onRefresh: setLoading,
      ...props,
      onFilterSubmit: onFilterSubmitWrapper,
      onRowClick: onRowClickWrapper,
      onCheckboxChange: onCheckboxChangeWrapper,
      onHeadCheckboxChange: onHeadCheckboxChangeWrapper,
      rowGrid,
      rowRef,
    }),
    [
      onCheckboxChangeWrapper,
      onFilterSubmitWrapper,
      onHeadCheckboxChangeWrapper,
      onRowClickWrapper,
      props,
      rowGrid,
      _selectedRow,
      _selectedRows,
    ]
  );

  return (
    <Table {...{ onClick: rest.onClick, className: rest.className }}>
      <TableCTX.Provider value={CTX}>
        <TableOverHead />

        <FlexBox fxDirection={'row'} maxWidth={'100%'} overflow={'hidden'} height={'100%'} flex={1} maxHeight={'100%'}>
          <FlexBox overflow={'hidden'} flex={1} maxHeight={'100%'}>
            <TableScroll className={'TableScroll'} scrollBarWidth={scrollBarWidth}>
              <TableHead />

              {tableData?.length !== 0 && <TableBody ref={rowRef} />}

              <TableLoader isLoading={isLoading || loading} />
            </TableScroll>
          </FlexBox>

          {actionsCreator && props.quickActionsPosition !== 'top' && (
            <MaxToTabletXl>
              <>
                <QuickActions />
              </>
            </MaxToTabletXl>
          )}
        </FlexBox>

        {tableData?.length === 0 && <NoData>Дані відсутні</NoData>}

        {showFooter && <TableFooter />}
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
