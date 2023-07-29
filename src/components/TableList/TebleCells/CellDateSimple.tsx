import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { useRow } from '../TableRows/TableRow';
import DateComp from './CellComponents/DateComp';
import { CellTitleContent, CellTittleProps } from './CellTitle';
import getValueByPath from '../../../utils/getValueByPath';

export interface CellDateSimpleProps {
  titleInfo: CellTittleProps;
  idx?: number;
}

const CellDateSimple: React.FC<CellDateSimpleProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo: { top, bottom, width = '100px' },
  titleInfo,
  idx,
  ...props
}) => {
  const { rowData } = useRow();
  // const { top, bottom, width = '100px' } = titleInfo;
  const contentTop = useMemo(() => {
    return top.getData
      ? top.getData(rowData, titleInfo)
      : getValueByPath({
          data: rowData,
          ...top,
        });
  }, [rowData, titleInfo, top]);
  const contentBottom = useMemo(() => {
    return bottom && bottom.getData
      ? bottom.getData(rowData, titleInfo)
      : getValueByPath({
          data: rowData,
          ...bottom,
        });
  }, [bottom, rowData, titleInfo]);

  return (
    <CellBase style={{ width }} {...props}>
      <Top align={top.align}>
        <DateComp dateInfo={contentTop} wraped={!contentBottom} />
      </Top>

      {contentBottom && (
        <Bottom align={bottom?.align}>
          <DateComp dateInfo={contentBottom} wraped={!contentBottom} />
        </Bottom>
      )}
    </CellBase>
  );
};

const CellBase = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
  padding: 4px 10px 4px 10px;

  /* outline: 1px solid #8b8b8b; */
`;
const Content = styled.div<Omit<CellTitleContent, 'name'>>`
  flex-grow: 1;

  display: flex;
  align-items: center;
  gap: 4px;

  width: 100%;
`;

const Top = styled(Content)`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;

  & .inner {
    justify-content: ${({ align }) => (align === 'center' ? 'center' : `flex-${align}`)};
  }
`;
const Bottom = styled(Content)`
  font-size: 11px;
  font-weight: 400;

  & .inner {
    justify-content: ${({ align }) => (align === 'center' ? 'center' : `flex-${align}`)};
  }
`;

export default memo(CellDateSimple);
