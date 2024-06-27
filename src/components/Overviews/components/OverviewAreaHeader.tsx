import { t } from '../../../lang';
import FlexBox from '../../atoms/FlexBox';
import React from 'react';
import { AreaStyledComp } from './CellStyles';

export const OverviewAreaHeader = ({
  title = 'Title',
  openOverlayButtonTitle = t('Change'),
  onOpenOverlayPress,
  editButtonText = t('Change'),
  onEditPress,
  acceptButtonText = t('Ok'),
  onAcceptPress,
  editMode = false,
  canAccept = false,
  cancelButtonText = t('Cancel'),
  onCancelPress,
}: {
  title?: string;
  openOverlayButtonTitle?: string;
  onOpenOverlayPress?: () => void;
  editButtonText?: string;
  onEditPress?: () => void;
  acceptButtonText?: string;
  onAcceptPress?: () => void;
  cancelButtonText?: string;
  onCancelPress?: () => void;
  editMode?: boolean;
  editable?: boolean;
  canAccept?: boolean;
}) => {
  return (
    <FlexBox
      fxDirection={'row'}
      justifyContent={'space-between'}
      height={'max-content'}
      alignItems={'center'}
      minHeight={'36px'}
      padding={'4px 0'}
    >
      <AreaStyledComp.CellText $isTitle $size={13} style={{ marginRight: 'auto' }}>
        {title}
      </AreaStyledComp.CellText>

      {onOpenOverlayPress && (
        <AreaStyledComp.HeaderButton type={'button'} onClick={onOpenOverlayPress}>
          {openOverlayButtonTitle}
        </AreaStyledComp.HeaderButton>
      )}

      {!editMode && onEditPress && (
        <AreaStyledComp.HeaderButton type={'button'} onClick={onEditPress}>
          {editButtonText}
        </AreaStyledComp.HeaderButton>
      )}

      {editMode && onCancelPress && (
        <AreaStyledComp.HeaderButton type={'button'} onClick={onCancelPress}>
          {cancelButtonText}
        </AreaStyledComp.HeaderButton>
      )}

      {editMode && onAcceptPress && (
        <AreaStyledComp.HeaderButton type={'button'} disabled={!canAccept} onClick={onAcceptPress}>
          {acceptButtonText}
        </AreaStyledComp.HeaderButton>
      )}
    </FlexBox>
  );
};
