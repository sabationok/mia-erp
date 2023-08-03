import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useRow } from '../TableRows/TableRow';
import { CellTitleContent, CellTittleProps } from './CellTitle';
import getValueByPath from 'utils/getValueByPath';

export interface CellTagsProps {
  titleInfo: CellTittleProps;
  idx?: number;
}

const CellTags: React.FC<CellTagsProps & React.HTMLAttributes<HTMLDivElement>> = ({ titleInfo, idx, ...props }) => {
  const { rowData } = useRow();
  const { top, width = '100px' } = titleInfo;

  const contentTop = useMemo(() => {
    const data = top?.getData
      ? top?.getData(rowData, titleInfo)
      : getValueByPath<string[]>({
          data: rowData,
          ...top,
        });
    return Array.isArray(data) ? data : null;
  }, [rowData, titleInfo, top]);

  return (
    <CellBase style={{ width }} {...props}>
      <Content title={`${contentTop?.join(', ')}`} className="cellTagsContent">
        {contentTop?.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Content>
    </CellBase>
  );
};

const CellBase = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  height: 100%;
  max-height: 100%;
  padding: 2px;
`;

const Content = styled.div<Omit<CellTitleContent, 'name'>>`
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;

  gap: 2px;

  width: 100%;
  max-height: 100%;
  overflow: hidden;
`;
const Tag = styled.div`
  padding: 0 4px;

  font-size: 11px;
  font-weight: 500;
  height: max-content;
  line-height: 1.4;

  border-radius: 2px;
  //border: 1px solid ${({ theme }) => theme.accentColor.base};
  color: #000;
  background-color: rgba(255, 136, 0, 0.4);
`;

export default CellTags;
