import { t } from '../../../lang';
import FlexBox from '../../atoms/FlexBox';
import React from 'react';
import { CellStyledComp } from './CellStyles';

export const CellHeader = ({
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
    <FlexBox fxDirection={'row'} justifyContent={'space-between'}>
      <CellStyledComp.CellText $isTitle $size={12} style={{ marginRight: 'auto' }}>
        {title}
      </CellStyledComp.CellText>

      {onOpenOverlayPress && (
        <CellStyledComp.CellHeaderButton type={'button'} onClick={onOpenOverlayPress}>
          {openOverlayButtonTitle}
        </CellStyledComp.CellHeaderButton>
      )}

      {!editMode && onEditPress && (
        <CellStyledComp.CellHeaderButton type={'button'} onClick={onEditPress}>
          {editButtonText}
        </CellStyledComp.CellHeaderButton>
      )}

      {editMode && onCancelPress && (
        <CellStyledComp.CellHeaderButton type={'button'} onClick={onCancelPress}>
          {cancelButtonText}
        </CellStyledComp.CellHeaderButton>
      )}

      {editMode && onAcceptPress && (
        <CellStyledComp.CellHeaderButton type={'button'} disabled={!canAccept} onClick={onAcceptPress}>
          {acceptButtonText}
        </CellStyledComp.CellHeaderButton>
      )}
    </FlexBox>
  );
};
