import React, { createContext, memo, useContext, useMemo, useState } from 'react';
import { OnCheckBoxChangeHandlerEvent, useTable } from '../TableList';

import styled from 'styled-components';
import { ThRow, ThRowData, ThRowStickyEl } from './TableHeadRow';
import { IDocument, ITransaction } from '../../../redux/transactions/transactions.types';
import { ICount } from '../../../redux/directories/counts.types';
import { IContractor } from '../../../redux/contractors/contractors.types';
import { ICategory } from '../../../redux/directories/categories.types';
import CellCheckBox from '../TebleCells/CellCheckBox';
import { CellsMap } from '../TebleCells';
import CellTextDbl from '../TebleCells/CellTextDbl';
import { OnCheckBoxChangeHandler } from '../tableTypes.types';

export type TRowDataType = ITransaction | ICount | IContractor | ICategory | IDocument;

export interface TableRowProps {
  rowData: TRowDataType;
  idx: number;
  checked?: boolean;
}

export interface RowCTXValue extends TableRowProps {
  isActionsOpen?: boolean;
  handleToggleActions?: () => void;
  handleCloseActions?: () => void;
  onRowCheckboxChange?: OnCheckBoxChangeHandler;
}

export const RowCTX = createContext<any>({});
export const useRow = () => useContext(RowCTX) as RowCTXValue;

const TableRow: React.FC<TableRowProps> = ({ checked, ...props }) => {
  const { tableTitles, tableData, rowGrid, checkBoxes, onCheckboxChange } = useTable<TRowDataType>();
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState<boolean>(checked ?? false);

  function handleToggleActions() {
    setIsActionsOpen(!isActionsOpen);
  }

  function handleCloseActions() {
    setIsActionsOpen(false);
  }

  function onRowCheckboxChange(event: OnCheckBoxChangeHandlerEvent) {
    setIsChecked(event.checked);
    onCheckboxChange && onCheckboxChange(event);
  }

  const ctxValue: RowCTXValue = {
    ...props,
    isActionsOpen,
    handleToggleActions,
    handleCloseActions,
    onRowCheckboxChange,
  };
  const renderRow = useMemo(
    () =>
      tableTitles &&
      tableTitles?.map((item, idx) => {
        let CellComp = item.action ? CellsMap[item.action] : CellTextDbl;
        if (typeof CellComp === 'function' || typeof CellComp === 'object') {
          return <CellComp key={idx} titleInfo={item} idx={idx} />;
        }
        console.log('CellComp error', '====>>>>', item);

        return <CellTextDbl key={idx} titleInfo={item} idx={idx} />;
      }),
    [tableTitles]
  );

  return (
    <Row id={props?.rowData?._id} checked={isChecked} data-row>
      <RowCTX.Provider value={{ ...ctxValue }}>
        <RowStickyEl>{checkBoxes && <CellCheckBox />}</RowStickyEl>

        <RowData gridRepeat={tableData?.length || 0} style={{ ...rowGrid }}>
          {renderRow}
        </RowData>
      </RowCTX.Provider>
    </Row>
  );
};

const Row = styled(ThRow)<{ checked?: boolean }>`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;

  height: 44px;
  min-width: 100%;

  position: relative;

  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-bottom-color: ${({ theme }) => theme.trBorderClr};

  background-color: ${({ theme, checked }) => (checked ? theme.tableRowBackgroundActive : theme.tableBackgroundColor)};

  &:hover {
    //border-color: ${({ theme }) => theme.accentColor.base};
    z-index: 10;
    background-color: ${({ theme }) => theme.tableRowBackgroundHover};
    box-shadow: ${({ theme }) => theme.tableRowShadow};
  }

  &:active {
    background-color: ${({ theme }) => theme.tableRowBackgroundActive};
  }

  &.selected {
    background-color: ${({ theme }) => theme.tableRowBackgroundActive};
  }
`;

const RowStickyEl = styled(ThRowStickyEl)``;

const RowData = styled(ThRowData)<{ gridRepeat: number }>`
  display: grid;
  grid-template-columns: ${({ gridRepeat }) => `repeat(${gridRepeat} min-content)`};

  max-height: 100%;

  /* overflow: hidden; */
`;

export default memo(TableRow);
