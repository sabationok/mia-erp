import styled from 'styled-components';
import React from 'react';
import { CellTitleContent } from './CellTitle';
import { Avatar } from 'antd';

interface IDataCellSectionProps {
  data?: string;
  uppercase?: boolean;
  align?: 'center' | 'start' | 'end';
}

export interface IDataCellProps {
  content?: IDataCellSectionProps;
  subContent?: IDataCellSectionProps;
  width?: string;
  imgUrl?: string;
}

const DoubleDataCell: React.FC<IDataCellProps> = ({
  width,
  content,
  subContent,
}) => {
  return (
    <CellDoubleData style={{ width }}>
      <Content
        align={content?.align}
        uppercase={content?.uppercase}
        fontWeight={500}
        fontSize={'12px'}
      >
        <div title={content?.data || ''} className="inner">
          {content?.data}
        </div>
      </Content>

      <Content
        align={subContent?.align}
        uppercase={subContent?.uppercase}
        fontWeight={400}
        fontSize={'11px'}
      >
        {subContent ? (
          <div title={subContent?.data || ''} className="inner">
            {subContent.data}
          </div>
        ) : null}
      </Content>
    </CellDoubleData>
  );
};
const SimpleDataCell: React.FC<Omit<IDataCellProps, 'subContent'>> = ({
  width,
  content,
}) => {
  return (
    <CellBase style={{ width }}>
      <Content
        align={content?.align}
        uppercase={content?.uppercase}
        fontWeight={500}
        fontSize={'12px'}
      >
        <div title={content?.data || ''} className="inner">
          {content?.data}
        </div>
      </Content>
    </CellBase>
  );
};

const DoubleDataWithAvatarCell: React.FC<IDataCellProps> = ({
  width,
  content,
  subContent,
}) => {
  return (
    <CellDoubleDataWithAvatar style={{ width }}>
      <AvatarBox>
        <Avatar shape={'square'} style={{ borderRadius: '2px' }} />
      </AvatarBox>

      <CellDoubleData>
        <Content
          align={content?.align}
          uppercase={content?.uppercase}
          fontWeight={500}
          fontSize={'12px'}
        >
          <div title={content?.data || ''} className="inner">
            {content?.data}
          </div>
        </Content>

        <Content
          align={subContent?.align}
          uppercase={subContent?.uppercase}
          fontWeight={400}
          fontSize={'11px'}
        >
          {subContent ? (
            <div title={subContent?.data || ''} className="inner">
              {subContent.data}
            </div>
          ) : null}
        </Content>
      </CellDoubleData>
    </CellDoubleDataWithAvatar>
  );
};

const CellBase = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  max-height: 100%;
  padding: 4px 10px;

  overflow: hidden;
`;
const CellDoubleData = styled(CellBase)`
  grid-template-rows: 1fr 1fr;
`;
const CellDoubleDataWithAvatar = styled(CellBase)`
  grid-template-columns: min-content 1fr;
  //gap: 8px;

  padding: 0;
`;

const Content = styled.div<
  Omit<CellTitleContent, 'name' | 'path'> & {
    fontWeight?: 400 | 500 | 600 | 700 | 900;
    fontSize?: string;
  }
>`
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: ${({ fontSize = '10px' }) => fontSize};
  font-weight: ${({ fontWeight = 400 }) => fontWeight};

  width: 100%;
  max-height: 16px;
  overflow: hidden;

  text-transform: ${({ uppercase }) => (uppercase ? 'uppercase' : '')};

  justify-content: ${({ align }) =>
    align === 'center' ? 'center' : `flex-${align}`};

  & .inner {
    max-width: 100%;
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; */
    //word-break: break-word;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 1;
  }
`;
const AvatarBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 4px;
`;

const Cell = {
  Simple: SimpleDataCell,
  Double: DoubleDataCell,
  DoubleWithAvatar: DoubleDataWithAvatarCell,
};

export { DoubleDataCell, SimpleDataCell };

export default Cell;
