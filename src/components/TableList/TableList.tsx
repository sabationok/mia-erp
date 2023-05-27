import React, { createContext, memo, useContext, useRef, useState } from 'react';
import TableHead from './TableHead';
import TableBody from './TableBody';
import AppLoader from 'components/atoms/AppLoader';
import QuickActions from './QuickActions';
import TableOverHead from './TableOverHead/TableOverHead';
import TableFooter from './TableFooter/TableFooter';
import styled from 'styled-components';
import { MaxToTabletXl } from 'components/atoms/DeviceTypeInformer/DeviceTypeController';
import { IBase } from 'redux/global.types';
import { CustomCheckboxEvent } from './TebleCells/CellComponents/CheckBox';
import {
  ITableListContext,
  ITableListProps,
  OnCheckBoxChangeHandlerEvent,
  SelectItem,
  UseTableHookType,
} from './tableTypes.types';

export type { ITableListContext, ITableListProps, OnCheckBoxChangeHandlerEvent, UseTableHookType, SelectItem };
export const TableCTX = createContext({});
export const useTable: UseTableHookType = () => useContext(TableCTX);

const TableList: React.FC<ITableListProps> = ({
  tableData,
  isLoading = false,
  RowActionsComp,
  TableActionsComp,
  tableTitles,
  tableSearchParams,

  actionsCreator,
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

  function onCheckboxChangeWrapper({ checked, _id }: OnCheckBoxChangeHandlerEvent) {
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
    actionsCreator,
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

          {tableData?.length !== 0 ? <TableBody ref={rowRef} /> : <NoData>Дані відсутні</NoData>}

          <MaxToTabletXl>{actionsCreator ? <QuickActions /> : null}</MaxToTabletXl>
        </TableScroll>

        {footer && <TableFooter />}
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
  //overflow: hidden;
`;
const TableScroll = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr min-content;

  height: 100%;
  width: 100%;
  overflow: auto;
`;

export default memo(TableList);
