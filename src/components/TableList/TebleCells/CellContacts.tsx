import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useRow } from '../TableRows/TableRow';
import { CellTitleContent, CellTittleProps } from './CellTitle';
import SvgIcon from '../../atoms/SvgIcon';
import getValueByPath from '../../../utils/getValueByPath';
import FlexBox from '../../atoms/FlexBox';

// import { formatPhoneNumber } from '../../../utils';

export interface CellContactsDblProps {
  titleInfo: CellTittleProps;
  idx?: number;
}

const CellContactsDbl: React.FC<CellContactsDblProps & React.HTMLAttributes<HTMLDivElement>> = ({
  titleInfo,
  idx,
  ...props
}) => {
  const { rowData } = useRow();
  const { top, bottom, width = '100px' } = titleInfo;

  const contentTop = useMemo(() => {
    return top.getData
      ? top.getData(rowData, titleInfo)
      : getValueByPath({
          data: rowData,
          ...top,
        });
  }, [rowData, titleInfo, top]);

  const contentBottom = useMemo(() => {
    return bottom && bottom?.getData
      ? bottom?.getData(rowData, titleInfo)
      : getValueByPath({
          data: rowData,
          ...bottom,
        });
  }, [rowData, titleInfo, bottom]);

  return (
    <CellBase style={{ width }} {...props}>
      <Top align={top.align} uppercase={false}>
        <StIcon icon={'mailOutlined'} size={'12px'} />

        <FlexBox justifyContent={'center'} title={contentTop} className="inner">
          {contentTop ? <a href={`mailto:${contentTop}`}>{contentTop}</a> : '---'}
        </FlexBox>
      </Top>

      <Bottom align={bottom?.align} uppercase={false}>
        <StIcon icon={'phoneOutlined'} size={'12px'} />

        <FlexBox justifyContent={'center'} title={contentBottom} className="inner">
          {contentBottom ? <a href={`tel:${contentBottom}`}>{contentBottom}</a> : '---'}
        </FlexBox>
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
  padding: 4px 10px 4px 4px;

  overflow: hidden;
`;

const Content = styled.div<Omit<CellTitleContent, 'name'>>`
  display: flex;
  align-items: center;
  gap: 4px;

  width: 100%;
  overflow: hidden;

  text-transform: ${({ uppercase = true }) => (uppercase ? 'uppercase' : '')};

  justify-content: ${({ align }) => (align === 'center' ? 'center' : `flex-${align}`)};

  & .inner {
    height: 100%;
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
`;

const Bottom = styled(Content)`
  font-size: 11px;
  font-weight: 400;
`;

const StIcon = styled(SvgIcon)`
  fill: ${({ theme }) => theme.accentColor.base};
`;
export default CellContactsDbl;
