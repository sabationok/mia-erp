import { useTable } from '../TableList';
import CellTitle from '../TebleCells/CellTitle';
import CellCheckBoxHead from '../TebleCells/CellCheckBoxHead';

import styled from 'styled-components';
import { useMemo } from 'react';

export interface TableHeadRowProps {}

const TableHeadRow: React.FC<TableHeadRowProps> = () => {
  const { tableTitles = [], checkBoxes, rowGrid } = useTable();

  const renderTitles = useMemo(
    () => tableTitles.map((item, idx) => <CellTitle key={idx} {...item} idx={idx} />),
    [tableTitles]
  );
  return (
    <ThRow>
      <ThRowStickyEl>{checkBoxes && <CellCheckBoxHead />}</ThRowStickyEl>

      <ThRowData style={{ ...rowGrid }}>{renderTitles}</ThRowData>
    </ThRow>
  );
};

export const ThRow = styled.div`
  display: grid;
  grid-template-columns: min-content max-content;
  grid-template-rows: 100%;

  position: relative;

  width: fit-content;
  min-width: 100%;
  height: 100%;

  cursor: default;

  background-color: inherit;
  font-size: 12px;
`;
export const ThRowStickyEl = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 5;

  height: 100%;
  width: max-content;

  background-color: inherit;
  // background-color: #1c1c1e;
  @media print {
    width: 0;
    overflow: hidden;
  }
`;
export const ThRowData = styled.div`
  height: 100%;
`;

export default TableHeadRow;
