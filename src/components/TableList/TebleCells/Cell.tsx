import React from 'react';
import styled from 'styled-components';
import { CellTittleProps } from './CellTitle';
// import { useRow } from '../TableRows/RowContext';

// import s from './TableCells.module.scss';

export interface CellBaseProps {
  idx?: number;
  titleInfo?: CellTittleProps;
}

const Cell: React.FC<CellBaseProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo,
  idx,
  children,
  ...props
}) => {
  // const { rowData } = useRow();

  return (
    <CellBase style={{ width: titleInfo?.width }} {...props}>
      {children}
    </CellBase>
  );
};
export const CellBase = styled.div`
  height: 100%;
`;

export default Cell;
