import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { useRow } from '../TableRows/TableRow';
import StatusComp from './CellComponents/StatusComp';
import { CellTitleContent, CellTittleProps } from './CellTitle';
import getValueByPath from '../../../utils/getValueByPath';

export interface CellTextDblProps {
  titleInfo: CellTittleProps;
  idx?: number;
}

const CellStatus: React.FC<CellTextDblProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo: { top, bottom, width = '100px' },
  idx,
  ...props
}) => {
  const rowData = useRow().rowData;

  const contentTop = getValueByPath({
    data: rowData,
    ...top,
  });
  const contentBottom = getValueByPath({
    data: rowData,
    ...bottom,
  });
  const content = useMemo(() => ({}), []);

  return (
    <CellBase style={{ width }} {...props}>
      <Content align={top.align}>
        <StatusComp status={contentTop} variant={'text'} fillWidth />
      </Content>

      <Content align={bottom?.align}>
        <StatusComp status={contentBottom} fontSize={'10px'} variant={'filled'} fontWeight={500} />
      </Content>
    </CellBase>
  );
};

const CellBase = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2px;

  height: 100%;
  padding: 4px 4px;
  max-width: 100%;
`;
const Content = styled.div<Omit<CellTitleContent, 'name'>>`
  display: flex;
  align-items: center;
  justify-content: ${({ align }) => (align ? (align === 'center' ? 'center' : `flex-${align}`) : 'center')};
  gap: 4px;

  width: 100%;
  height: 100%;
  max-width: 100%;

  overflow: hidden;

  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
`;

export default memo(CellStatus);
