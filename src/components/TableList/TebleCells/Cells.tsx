import styled from 'styled-components';
import React from 'react';
import { CellTitleContent } from './CellTitle';
import { Avatar } from 'antd';
import SvgIcon from '../../atoms/SvgIcon/SvgIcon';
import FlexBox from '../../atoms/FlexBox';
import StatusComp from './CellComponents/StatusComp';
import { StatusNames } from '../../../data/statuses.data';

interface IDataCellSectionProps<T = string | null> {
  data?: T;
  uppercase?: boolean;
  align?: 'center' | 'start' | 'end';
}

export interface IDataCellProps<T = any> {
  content?: IDataCellSectionProps<T>;
  subContent?: IDataCellSectionProps<T>;
  width?: string;
  imgUrl?: string;
}

const DoubleDataCell: React.FC<IDataCellProps> = ({ width, content, subContent }) => {
  return (
    <CellDoubleData style={{ width }}>
      <Content align={content?.align} uppercase={content?.uppercase} fontWeight={600} fontSize={'12px'}>
        <div title={content?.data || ''} className="inner">
          {content?.data}
        </div>
      </Content>

      <Content align={subContent?.align} uppercase={subContent?.uppercase} fontWeight={500} fontSize={'11px'}>
        {subContent ? (
          <div title={subContent?.data || ''} className="inner">
            {subContent.data}
          </div>
        ) : null}
      </Content>
    </CellDoubleData>
  );
};
const SimpleDataCell: React.FC<Omit<IDataCellProps, 'subContent'>> = ({ width, content }) => {
  return (
    <CellBase style={{ width }}>
      <Content align={content?.align} uppercase={content?.uppercase} fontWeight={500} fontSize={'12px'}>
        <div title={content?.data || ''} className="inner">
          {content?.data}
        </div>
      </Content>
    </CellBase>
  );
};

const DoubleDataWithAvatarCell: React.FC<IDataCellProps> = ({ width, content, subContent, imgUrl }) => {
  return (
    <CellDoubleDataWithAvatar style={{ width }}>
      <AvatarBox>
        <Avatar
          src={imgUrl}
          shape={'square'}
          style={{ borderRadius: '2px' }}
          icon={
            <FlexBox fillWidth fillHeight alignItems={'center'} justifyContent={'center'}>
              <SvgIcon icon={'bankOutlined'} size={'80%'} fill={'#fff'} />
            </FlexBox>
          }
        />
      </AvatarBox>

      <CellDoubleData>
        <Content align={content?.align} uppercase={content?.uppercase} fontWeight={500} fontSize={'12px'}>
          <div title={content?.data || ''} className="inner">
            {content?.data}
          </div>
        </Content>

        <Content align={subContent?.align} uppercase={subContent?.uppercase} fontWeight={400} fontSize={'11px'}>
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

const DoubleStatusCell: React.FC<IDataCellProps<StatusNames>> = ({ width, content, subContent }) => {
  return (
    <CellDoubleData style={{ width }}>
      <Content align={content?.align} uppercase={content?.uppercase} fontWeight={600} fontSize={'12px'}>
        <StatusComp status={content?.data} variant={'text'} fillWidth />
      </Content>

      <Content align={subContent?.align} uppercase={subContent?.uppercase} fontWeight={500} fontSize={'11px'}>
        {subContent ? (
          <StatusComp status={subContent?.data} fontSize={'10px'} variant={'filled'} fontWeight={500} />
        ) : null}
      </Content>
    </CellDoubleData>
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

  justify-content: ${({ align }) => (align === 'center' ? 'center' : `flex-${align}`)};

  & .inner {
    height: fit-content;
    max-width: 100%;
    /* display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1; */
    //word-break: break-word;
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
  DoubleStatus: DoubleStatusCell,
};

export { DoubleDataCell, SimpleDataCell, DoubleStatusCell };

export default Cell;
