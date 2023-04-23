import RowContext from './RowContext';
import React, { useState } from 'react';
import CellTextDbl from '../TebleCells/CellTextDbl';
import { CellsMap } from '../TebleCells';
import { useTable } from '../TableList';

import styled from 'styled-components';
import { ThRow, ThRowData, ThRowStickyEl } from './TableHeadRow';
import { ITransaction } from '../../../redux/transactions/transactions.types';

export interface TableRowProps {
  rowData: ITransaction;
  idx: number;
}

const TableRow: React.FC<TableRowProps> = props => {
  const { tableTitles, tableData, rowGrid } = useTable();
  const [isActionsOpen, setIsActionsOpen] = useState(false);

  function handleToggleActions() {
    setIsActionsOpen(!isActionsOpen);
  }

  function handleCloseActions() {
    setIsActionsOpen(false);
  }

  const ctxValue = {
    ...props,
    isActionsOpen,
    handleToggleActions,
    handleCloseActions,
  };

  return (
    <Row id={props?.rowData?._id} data-row>
      <RowContext value={ctxValue}>
        <RowStickyEl>{/* {checkBoxes && <CellCheckBox />} */}</RowStickyEl>

        <StRowData gridRepeat={tableData?.length || 0} style={{ ...rowGrid }}>
          {tableTitles &&
            tableTitles?.map((item, idx) => {
              let CellComp = item.action ? CellsMap[item.action] : CellTextDbl;
              if (CellComp instanceof Function) {
                return <CellComp key={idx} titleInfo={item} idx={idx} />;
              }
              console.log(item.action);

              return <CellTextDbl key={idx} titleInfo={item} idx={idx} />;
            })}
        </StRowData>
      </RowContext>
    </Row>
  );
};

const Row = styled(ThRow)`
  display: grid;
  grid-template-columns: min-content 1fr;
  grid-template-rows: 44px;

  height: 44px;
  min-width: 100%;

  border-top: 1px solid transparent;
  border-bottom: 1px solid transparent;
  border-bottom-color: ${({ theme }) => theme.borderColor};

  &:hover {
    border-color: ${({ theme }) => theme.accentColor.base};
  }

  &.selected {
    background-color: ${({ theme }) => theme.accentColor.light};
  }
`;

const RowStickyEl = styled(ThRowStickyEl)``;

const StRowData = styled(ThRowData)<{ gridRepeat: number }>`
  display: grid;
  grid-template-columns: ${({ gridRepeat }) => `repeat(${gridRepeat} min-content)`};


  max-height: 100%;


  /* overflow: hidden; */
`;

export default TableRow;
