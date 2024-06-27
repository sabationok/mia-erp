import ButtonIcon from './ButtonIcon';
import { Text } from './Text';
import styled from 'styled-components';
import FlexBox from './FlexBox';
import * as React from 'react';
import { useState } from 'react';
import SvgIcon from './SvgIcon';
import { MaybeNull } from '../../types/utils.types';

export interface ImageSmallPreviewProps {
  src: string;
  title?: MaybeNull<string>;
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
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <ImageSmallPreviewBox
      className={`ImagePreview_${title}`}
      fillWidth
      overflow={'hidden'}
      alignItems={'center'}
      justifyContent={'center'}
      gap={4}
      border={!isLoaded ? '1px solid lightgrey' : ''}
      borderRadius={'4px'}
      style={{ position: 'relative' }}
      disabled={disabled}
    >
      {src ? (
        <img
          src={src}
          alt={title || 'img_title'}
          style={{ width: '100%' }}
          onLoad={() => {
            setIsLoaded(true);
          }}
        />
      ) : (
        <SvgIcon icon={'gallery'} size={'28px'} fill={'lightgrey'} />
      )}

      <ImagePreviewBottom fillWidth>
        {title && (
          <FlexBox padding={'6px 8px'}>
            <Text $size={12} $weight={500} color={'#fff'}>
              {title}
            </Text>
          </FlexBox>
        )}

        <ImagePreviewActions
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
        </ImagePreviewActions>
      </ImagePreviewBottom>
    </ImageSmallPreviewBox>
  );
};

const ImageSmallPreviewBox = styled(FlexBox)<{ disabled?: boolean; maxWidth?: string; maxHeight?: string }>`
  min-width: 115px;

  aspect-ratio: 1/1.35;

  object-position: center;
  object-fit: contain;

  pointer-events: ${p => (p.disabled ? 'none' : 'all')};

  &:hover {
    & .top {
      min-height: 36px;
    }
  }
`;

const ImagePreviewActions = styled(FlexBox)`
  height: 0;
  min-height: 0;
  padding: 0 6px;
  overflow: hidden;

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
