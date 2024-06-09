import FlexBox from '../FlexBox';
import ButtonIcon from '../ButtonIcon';
import { t } from '../../../lang';
import { Text } from '../Text';
import styled from 'styled-components';

export interface ModalHeaderProps {
  canSubmit?: boolean;
  onBackPress?: () => void;
  onClose?: () => void;
  title?: string;
  showSubmitButton?: boolean;
  renderTitle?: React.ReactNode;
  children?: React.ReactNode;
}
export const ModalHeader = ({
  onClose,
  onBackPress,
  title,
  showSubmitButton,
  canSubmit,
  renderTitle,
  children,
  ...props
}: ModalHeaderProps) => {
  return (
    <Header {...props} padding={'4px 0'}>
      <FlexBox fillWidth fxDirection={'row'} justifyContent={'space-between'} alignItems={'stretch'} height={'32px'}>
        {onBackPress && (
          <ButtonIcon
            variant={'textExtraSmall'}
            icon={'SmallArrowLeft'}
            iconSize={'22px'}
            padding={'0'}
            style={{ minWidth: 'max-content', minHeight: '100%' }}
            onClick={onBackPress}
          >
            {t('Back')}
          </ButtonIcon>
        )}

        {renderTitle || (
          <FlexBox justifyContent={'center'} overflow={'hidden'}>
            <Text $weight={600} $size={14} $lines={1} $ellipsisMode $textTransform={'uppercase'}>
              {title}
            </Text>
          </FlexBox>
        )}

        {showSubmitButton && (
          <ButtonIcon
            variant={'textExtraSmall'}
            gap={6}
            type={showSubmitButton ? 'submit' : 'button'}
            padding={'0 6px'}
            endIcon={'done'}
            endIconSize={'22px'}
            style={{ minWidth: 'max-content', minHeight: '100%' }}
            disabled={!canSubmit}
          >
            {'Ok'}
          </ButtonIcon>
        )}

        {onClose && (
          <ButtonIcon
            variant={'onlyIconNoEffects'}
            icon={'close'}
            iconSize={'95%'}
            size={'24px'}
            padding={'0'}
            onClick={onClose}
          ></ButtonIcon>
        )}
      </FlexBox>

      {children && <ExtraHeader>{children}</ExtraHeader>}
    </Header>
  );
};
const Header = styled(FlexBox)`
  min-height: 32px;
`;
const ExtraHeader = styled.div`
  width: 100%;
  height: min-content;
  overflow: hidden;

  max-width: 100%;
`;
