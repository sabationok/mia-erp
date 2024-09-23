import React, { createContext, memo, useCallback, useContext, useMemo, useState } from 'react';
import { useTable } from '../TableList';

import styled from 'styled-components';
import { ThRow, ThRowData, ThRowStickyEl } from './TableHeadRow';
import { IDocument, ITransaction } from '../../../types/finances/transactions.types';
import { ICount } from '../../../redux/directories/counts.types';
import { IContractor } from '../../../redux/directories/contractors.types';
import { FinCategoryEntity } from '../../../types/directories.types';
import CellCheckBox from '../TebleCells/CellCheckBox';
import { CellsMap } from '../TebleCells';

export type TRowDataType = ITransaction | ICount | IContractor | FinCategoryEntity | IDocument;

export interface TableRowProps {
  rowData: TRowDataType;
  idx: number;
  checked?: boolean;
  isActive?: boolean;
  onPress?: () => void;
  rowId?: string;
}

export interface RowCTXValue extends TableRowProps {
  isActionsOpen?: boolean;
  onToggleActions?: () => void;
  onCloseActions?: () => void;
  rowId?: string;
}

export const RowCTX = createContext<any>({});
export const useRow = () => useContext(RowCTX) as RowCTXValue;

const TableRow: React.FC<TableRowProps> = ({ rowId, onPress, checked, rowData, ...props }) => {
  const { tableTitles, tableData, rowGrid, checkBoxes, transformData } = useTable<TRowDataType>();
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  const onToggleActions = useCallback(() => {
    setIsActionsOpen(prev => !prev);
  }, []);

  const currentRowData = useMemo(() => (transformData ? transformData(rowData) : rowData), [rowData, transformData]);

  const onCloseActions = useCallback(() => {
    setIsActionsOpen(false);
  }, []);

  const renderRow = useMemo(() => {
    return tableTitles?.map((item, idx) => {
      let CellComp = (item.action && item.action in CellsMap && CellsMap?.[item.action]) || CellsMap.valueByPath;
      if (['function', 'object'].includes(typeof CellComp)) {
        return <CellComp key={idx} titleInfo={item} idx={idx} />;
      }
      console.error('[Table row error]', '====>>>>', `[${item.action}]`);
      CellComp = CellsMap.valueByPath;
      return <CellComp key={idx} titleInfo={item} idx={idx} />;
    });
  }, [tableTitles]);

  const CTX = useMemo((): RowCTXValue => {
    return {
      ...props,
      rowId,
      checked,
      rowData: currentRowData,
      isActionsOpen,
      onToggleActions,
      onCloseActions,
    };
  }, [props, rowId, checked, currentRowData, isActionsOpen, onToggleActions, onCloseActions]);

  return (
    <RowCTX.Provider value={CTX}>
      <Row id={`_${rowId}`} isActive={props?.isActive} checked={checked} data-row={`_${rowId}`}>
        <RowStickyEl>{checkBoxes && <CellCheckBox />}</RowStickyEl>

        <RowCells gridRepeat={tableData?.length || 0} style={{ ...rowGrid }} onClick={onPress}>
          {renderRow}
        </RowCells>
      </Row>
    </RowCTX.Provider>
  );
};

const Row = styled(ThRow)<{ checked?: boolean; isActive?: boolean }>`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 1fr;

  height: 52px;
  min-width: 100%;

  position: relative;

  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-bottom-color: ${({ theme }) => theme.trBorderClr};

  background-color: ${({ theme, checked, isActive }) => (isActive ? theme.tableRowBackgroundActive : 'inherit')};

  &:hover {
    //border-color: ${({ theme }) => theme.accentColor.base};
    z-index: 10;
    border-color: ${({ theme }) => theme.accentColor.light};
    outline: 1px solid ${({ theme }) => theme.accentColor.light};
    //box-shadow: ${({ theme }) => theme.tableRowShadow};
  }

  &:active {
    background-color: ${({ theme }) => theme.tableRowBackgroundActive};
  }

  &.selected {
    background-color: ${({ theme }) => theme.tableRowBackgroundActive};
  }
`;

const RowStickyEl = styled(ThRowStickyEl)`
  height: 50px;
`;

const RowCells = styled(ThRowData)<{ gridRepeat: number }>`
  display: grid;
  grid-template-columns: ${({ gridRepeat }) => `repeat(${gridRepeat} min-content)`};
  grid-template-rows: 50px;

  height: 50px;
`;

export default memo(TableRow);
