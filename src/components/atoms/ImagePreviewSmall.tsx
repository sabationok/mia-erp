import ButtonIcon from './ButtonIcon/ButtonIcon';
import { Text } from './Text';
import styled from 'styled-components';
import FlexBox from './FlexBox';
import * as React from 'react';

export interface ImageSmallPreviewProps {
  src: string;
  title?: string;
  type?: string;
  onDeletePress?: () => void;
  onEditPress?: () => void;
  onAddNewPress?: () => void;
  disabled?: boolean;

  maxWidth?: string;
  maxHeight?: string;
}
const ImagePreviewSmall = ({
  title,
  src,
  onDeletePress,
  onEditPress,
  disabled,
  maxWidth,
  maxHeight,
}: ImageSmallPreviewProps) => {
  return (
    <ImageSmallPreviewBox
      className={`ImagePreview_${title}`}
      fillWidth
      overflow={'hidden'}
      gap={4}
      height={'115px'}
      border={'1px solid lightgrey'}
      borderRadius={'2px'}
      style={{ position: 'relative' }}
      disabled={disabled}
    >
      {src && <img src={src} alt={title} style={{ width: '100%' }} />}

      <ImagePreviewBottom fillWidth>
        <FlexBox padding={'4px'}>
          <Text $size={12} $weight={500} color={'#fff'}>
            {title}
          </Text>
        </FlexBox>

        <ImagePreviewTop
          className={'top'}
          fxDirection={'row'}
          gap={6}
          style={{ fill: '#fff' }}
          alignItems={'center'}
          justifyContent={'space-between'}
          fillWidth
        >
          <ButtonIcon
            variant={'onlyIcon'}
            icon={'edit'}
            iconSize={'28px'}
            disabled={!onEditPress}
            onClick={onEditPress}
          />
          <ButtonIcon
            variant={'onlyIcon'}
            icon={'delete'}
            iconSize={'28px'}
            disabled={!onDeletePress}
            onClick={onDeletePress}
          />
        </ImagePreviewTop>
      </ImagePreviewBottom>
    </ImageSmallPreviewBox>
  );
};

const ImageSmallPreviewBox = styled(FlexBox)<{ disabled?: boolean; maxWidth?: string; maxHeight?: string }>`
  min-width: 90px;
  width: 90px;

  pointer-events: ${p => (p.disabled ? 'none' : 'all')};

  &:hover {
    & .top {
      min-height: 36px;
    }
  }
`;

const ImagePreviewTop = styled(FlexBox)`
  //position: absolute;
  //top: 0;
  //left: 0;
  //z-index: 5;

  height: 0;
  min-height: 0;
  padding: 0 6px;
  overflow: hidden;

  //background-color: rgba(26, 26, 26, 0.2);
  //backdrop-filter: blur(3px);

  transition: min-height ${p => p.theme.globals.timingFnMain};
`;
const ImagePreviewBottom = styled(FlexBox)`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 5;

  background-color: rgba(26, 26, 26, 0.2);
  backdrop-filter: blur(3px);
`;

export default ImagePreviewSmall;
