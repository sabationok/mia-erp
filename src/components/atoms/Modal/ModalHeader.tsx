import FlexBox, { FlexLi, FlexUl } from '../FlexBox';
import ButtonIcon from '../ButtonIcon';
import { Text } from '../Text';
import styled, { useTheme } from 'styled-components';
import { IconIdType } from '../../../img/sprite';
import { useMemo, useRef, useState } from 'react';
import { t } from 'lang';

export interface IModalHeaderAction {
  title?: string;
  icon?: IconIdType;
  isVisible?: boolean;
  isDanger?: boolean;
  isWarn?: boolean;
  disabled?: boolean;
  onPress?: () => void;
}
export interface ModalHeaderProps {
  canSubmit?: boolean;
  onBackPress?: () => void;
  onClose?: () => void;
  title?: string;
  hasOkButton?: boolean;
  renderTitle?: React.ReactNode;
  children?: React.ReactNode;

  menuActions?: IModalHeaderAction[];
}
export const ModalHeader = ({
  onClose,
  onBackPress,
  title,
  hasOkButton,
  canSubmit,
  renderTitle,
  children,
  menuActions,
  ...props
}: ModalHeaderProps) => {
  const visibleActions = menuActions?.filter(a => a.isVisible !== false);

  return (
    <Header {...props} padding={'8px 0'}>
      <FlexBox
        fillWidth
        fxDirection={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        height={'32px'}
        gap={8}
      >
        {onBackPress && (
          <ButtonIcon
            variant={'onlyIconNoEffects'}
            icon={'SmallArrowLeft'}
            size={'28px'}
            iconSize={'100%'}
            padding={'0'}
            onClick={onBackPress}
          />
        )}

        {renderTitle || (
          <FlexBox justifyContent={'center'} flex={1} overflow={'hidden'}>
            <Text $weight={600} $size={14} $lines={1} $ellipsisMode $textTransform={'uppercase'}>
              {title}
            </Text>
          </FlexBox>
        )}

        {!!visibleActions?.length && <HeaderActions actions={visibleActions} />}

        {hasOkButton && (
          <ButtonIcon
            variant={'textExtraSmall'}
            gap={6}
            type={hasOkButton ? 'submit' : 'button'}
            padding={'0 6px'}
            endIcon={'done'}
            endIconSize={'22px'}
            style={{ minWidth: 'max-content', minHeight: '100%' }}
            disabled={!canSubmit}
          ></ButtonIcon>
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
  max-width: 100%;
  overflow-y: visible;
  overflow-x: hidden;
`;
const ExtraHeader = styled.div`
  width: 100%;
  height: min-content;
  overflow: hidden;

  max-width: 100%;
`;

const HeaderActions = ({ actions }: { actions?: IModalHeaderAction[] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const theme = useTheme();

  const renderActions = useMemo(() => {
    return actions
      ?.filter(item => item.isVisible !== false)
      .map(({ isDanger, isWarn, ...action }, index) => {
        const color = isDanger ? 'error' : isWarn ? 'warning' : undefined;

        return (
          <FlexLi key={'modal_action_' + action.title || action.icon || index}>
            <ButtonIcon
              variant={'textMiddle'}
              onClick={action.onPress}
              padding={'0 8px'}
              minHeight={'28px'}
              minWidth={'150px'}
              justifyContent={'flex-start'}
              disabled={action.disabled}
              fontWeight={isDanger ? '500' : '400'}
              style={{ color: color ? theme.globals.colors[color] : undefined }}
            >
              {action.title}
            </ButtonIcon>
          </FlexLi>
        );
      });
  }, [actions, theme.globals.colors]);

  return (
    <FlexBox style={{ position: 'relative' }}>
      <ButtonIcon
        variant={'onlyIconNoEffects'}
        icon={'actionsH'}
        size={'28px'}
        iconSize={'100%'}
        padding={'0'}
        onClick={() => setIsVisible(p => !p)}
      />
      {isVisible && (
        <MenuDropdown
          onBlur={ev => {
            ev.stopPropagation();

            setIsVisible(false);
          }}
          ref={listRef}
          style={{ position: 'absolute', top: '120%', right: '0', zIndex: 100 }}
        >
          {renderActions}

          <ButtonIcon
            variant={'textMiddle'}
            onClick={() => setIsVisible(false)}
            padding={'0 8px'}
            minHeight={'28px'}
            fillWidth
            fontWeight={'400'}
            endIcon={'SmallArrowUp'}
            justifyContent={'center'}
          >
            {t('Hide')}
          </ButtonIcon>
        </MenuDropdown>
      )}
    </FlexBox>
  );
};

const MenuDropdown = styled(FlexUl)`
  position: absolute;
  top: 115%;
  right: 0;
  z-index: 100;
  border: 1px solid ${p => p.theme.modalBorderColor};
  background-color: ${p => p.theme.modalBackgroundColor};

  animation-duration: 150ms;
  animation-name: Dropdown;
  animation-timing-function: ease-out;

  border-radius: 4px;
  box-shadow: ${p => p.theme.tableRowShadow};
  transform-origin: top;

  @keyframes Dropdown {
    from {
      transform: scale(0.8);
    }
    to {
      transform: scale(1);
    }
  }
`;
