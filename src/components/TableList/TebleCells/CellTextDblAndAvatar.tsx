import React from 'react';
import styled from 'styled-components';
import { useRow } from '../TableRows/TableRow';
import { CellTitleContent, CellTittleProps } from './CellTitle';
import getValueByPath from '../../../utils/getValueByPath';
import Cell from './Cells';

export interface CellTextDblAndAvatarProps {
  titleInfo: CellTittleProps;
  idx?: number;
  imgUrl?: string;
}

const CellTextDblAndAvatar: React.FC<
  CellTextDblAndAvatarProps & React.HTMLAttributes<HTMLDivElement>
> = ({ titleInfo, idx, imgUrl = 'imgUrl', ...props }) => {
  const { rowData } = useRow();
  const { top, bottom, width = '100px' } = titleInfo;

  const contentTop = getValueByPath({
    data: rowData,
    ...top,
  });
  const contentBottom = getValueByPath({
    data: rowData,
    ...bottom,
  });

  if (imgUrl) {
    return <Cell.DoubleWithAvatar imgUrl={imgUrl} />;
  }

  return (
    <CellBase style={{ width }} {...props}>
      <Top align={top.align}>
        <div title={contentTop} className="inner">
          {contentTop}
        </div>
      </Top>

      <Bottom align={bottom?.align}>
        {contentBottom ? (
          <div title={contentBottom} className="inner">
            {contentBottom}
          </div>
        ) : null}
      </Bottom>
    </CellBase>
  );
};

const CellBase = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr;

  height: 100%;

  max-height: 100%;
  padding: 4px 10px;

  overflow: hidden;
`;
const Content = styled.div<Omit<CellTitleContent, 'name'>>`
  display: flex;
  align-items: center;
  gap: 4px;

  width: 100%;
  overflow: hidden;

  & .inner {
    width: fit-content;
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; */
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
  }
`;

const Top = styled(Content)`
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;

  justify-content: ${({ align }) =>
    align === 'center' ? 'center' : `flex-${align}`};
`;
const Bottom = styled(Content)`
  font-size: 11px;
  font-weight: 400;

  justify-content: ${({ align }) =>
    align === 'center' ? 'center' : `flex-${align}`};
`;

export default CellTextDblAndAvatar;
