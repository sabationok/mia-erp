import React from 'react';
import styled from 'styled-components';
import getNestedData from 'utils/getNestedData';
import { useRow } from '../TableRows/RowContext';
import StatusComp from './CellComponents/StatusComp';
import { CellTitleContent, CellTittleProps } from './CellTitle';

export interface CellTextDblProps {
  titleInfo: CellTittleProps;
  idx?: number;
}

const CellStatus: React.FC<CellTextDblProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo,
  idx,
  ...props
}) => {
  const { rowData } = useRow();
  const { top, width = '100px' } = titleInfo;

  const contentTop = getNestedData({
    data: rowData,
    ...top,
  });
  return (
    <CellBase style={{ width }} {...props}>
      <Content align={top.align}>
        <StatusComp status={contentTop} />
      </Content>
    </CellBase>
  );
};

const CellBase = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  height: 100%;
  padding: 4px 10px 4px 10px;

  /* outline: 1px solid #8b8b8b; */
`;
const Content = styled.div<Omit<CellTitleContent, 'name'>>`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => (align ? (align === 'center' ? 'center' : `flex-${align}`) : 'center')};
  gap: 4px;

  width: 100%;
  height: 100%;

  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
`;

export default CellStatus;
