import styled from 'styled-components';
import React from 'react';
import { CellTitleContent } from './CellTitle';
import { Avatar } from 'antd';
import SvgIcon from '../../atoms/SvgIcon/SvgIcon';
import FlexBox from '../../atoms/FlexBox';
import StatusComp from './CellComponents/StatusComp';
import { StatusNames } from '../../../data/statuses.data';
import { IconIdType } from '../../../img/sprite';
import { Text } from '../../atoms/Text';

interface IDataCellSectionProps<T = string | null> {
  data?: T;
  uppercase?: boolean;
  align?: 'center' | 'start' | 'end';
}

export interface IDataCellProps<T = any> {
  content?: IDataCellSectionProps<T>;
  subContent?: IDataCellSectionProps<T>;
  width?: string;
  imgUrl?: string | null;
  imgPreviewIcon?: IconIdType;
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
      <Content align={content?.align} uppercase={content?.uppercase} style={{ maxHeight: '100%' }}>
        <Text
          $size={12}
          $weight={500}
          $ellipsisMode={true}
          $lines={2}
          title={content?.data || ''}
          style={{ maxHeight: '100%' }}
        >
          {content?.data}
        </Text>
      </Content>
    </CellBase>
  );
};

const DoubleDataWithAvatarCell: React.FC<IDataCellProps> = ({ width, content, subContent, imgUrl, imgPreviewIcon }) => {
  return (
    <CellDoubleDataWithAvatar style={{ width }}>
      <FlexBox padding={'2px 2px 2px 6px'}>
        <Avatar
          src={imgUrl}
          shape={'square'}
          style={{ borderRadius: '2px' }}
          icon={
            <FlexBox fillWidth fillHeight alignItems={'center'} justifyContent={'center'}>
              <SvgIcon icon={imgPreviewIcon || 'gallery'} size={'80%'} fill={'#fff'} />
            </FlexBox>
          }
        />
      </FlexBox>

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

const DataWithAvatarCell: React.FC<Omit<IDataCellProps, 'subContent'>> = ({
  width,
  content,
  imgUrl,
  imgPreviewIcon,
}) => {
  return (
    <CellDoubleDataWithAvatar style={{ width }}>
      <FlexBox padding={'0 0 0 4px'} alignItems={'center'} justifyContent={'center'} width={'40px'} height={'40px'}>
        <Avatar
          src={imgUrl}
          shape={'square'}
          style={{ borderRadius: '2px', width: '100%', height: '100%' }}
          icon={<SvgIcon icon={imgPreviewIcon || 'gallery'} size={'90%'} fill={'#fff'} />}
        />
      </FlexBox>

      <CellBase>
        <Content align={content?.align} uppercase={content?.uppercase} fontWeight={500} fontSize={'12px'}>
          <div title={content?.data || ''} className="inner">
            {content?.data}
          </div>
        </Content>
      </CellBase>
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

  align-content: center;

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
  //border: 1px solid tomato;
  display: flex;
  align-items: center;
  gap: 4px;

  font-size: ${({ fontSize = '10px' }) => fontSize};
  font-weight: ${({ fontWeight = 400 }) => fontWeight};

  width: 100%;
  //max-height: 16px;
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

const Cell = {
  Simple: SimpleDataCell,
  Double: DoubleDataCell,
  DoubleWithAvatar: DoubleDataWithAvatarCell,
  DataWithAvatar: DataWithAvatarCell,
  DoubleStatus: DoubleStatusCell,
};

export { DoubleDataCell, SimpleDataCell, DoubleStatusCell };

export default Cell;
