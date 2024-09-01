import ButtonIcon from './ButtonIcon';
import FlexBox from './FlexBox';
import { Text } from './Text';
import styled from 'styled-components';
import { t } from '../../i18e';
import { isUndefined } from 'lodash';

export const DefaultContent: React.FC<{ content?: string }> = ({ content } = {}) => {
  return <div>{`Default content: ${content}`}</div>;
};
export const ErrorContent: React.FC<{ error?: string }> = ({ error } = {}) => {
  return <div>{`Error: ${error}`}</div>;
};

export const ModalHeader = ({
  onClose,
  onBackPress,
  title,
  showSubmitButton,
  canSubmit,
  renderTitle,
  ...props
}: {
  canSubmit?: boolean;
  onBackPress?: () => void;
  onClose?: () => void;
  title?: string;
  showSubmitButton?: boolean;
  renderTitle?: React.ReactNode;
}) => {
  return (
    <Header padding={'4px 0'} {...props} gap={8}>
      <FlexBox fillWidth fxDirection={'row'} justifyContent={'space-between'} alignItems={'stretch'} height={'32px'}>
        {onBackPress && (
          <ButtonIcon
            variant={'textExtraSmall'}
            icon={'SmallArrowLeft'}
            iconSize={'22px'}
            padding={'0'}
            style={{ minWidth: 'max-content', minHeight: '100%' }}
            onClick={onBackPress || onClose}
          >
            {t('Back')}
          </ButtonIcon>
        )}

        {renderTitle || (
          <FlexBox justifyContent={'center'} overflow={'hidden'}>
            <Text
              $weight={600}
              $size={14}
              style={{ textTransform: 'uppercase', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
            >
              {title}
            </Text>
          </FlexBox>
        )}

        {showSubmitButton && (
          <ButtonIcon
            variant={'textExtraSmall'}
            gap={'6px'}
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
    </Header>
  );
};

const Header = styled(FlexBox)`
  height: 32px;
`;

export const DrawerFooter = ({
  submitButtonText = 'Прийняти',
  loading,
  extraFooter,
  canSubmit,
  onCreatePress,
  resetButtonShown,
  onAcceptPress,
  canAccept,
}: {
  onAcceptPress?: () => void;
  canSubmit?: boolean;
  canAccept?: boolean;
  resetButtonShown?: boolean;
  extraFooter?: React.ReactNode;
  loading?: boolean;
  onCreatePress?: () => void;
  submitButtonText?: string;
}) => {
  return (
    <Footer fillWidth>
      {extraFooter}

      <FlexBox padding={'8px 8px'} fxDirection={'row'} gap={8} alignItems={'center'}>
        {resetButtonShown && (
          <ButtonIcon variant={'onlyIcon'} icon={'clear'} size={'36px'} iconSize={'80%'} type={'reset'} />
        )}

        {onCreatePress && (
          <ButtonIcon variant={'onlyIcon'} icon={'plus'} size={'36px'} iconSize={'80%'} onClick={onCreatePress} />
        )}

        <ButtonIcon
          variant={'filledMiddle'}
          flex={1}
          type={isUndefined(canSubmit) ? 'button' : 'submit'}
          style={{ padding: '0 12px' }}
          textTransform={'uppercase'}
          fontWeight={600}
          endIcon={'SmallArrowRight'}
          endIconSize={'24px'}
          disabled={isUndefined(canSubmit) ? !canAccept : !canSubmit}
          isLoading={loading}
          onClick={onAcceptPress}
        >
          {submitButtonText}
        </ButtonIcon>
      </FlexBox>
    </Footer>
  );
};

const Footer = styled(FlexBox)``;

export const OverlayForm = ({
  children,
  ...props
}: { children?: React.ReactNode } & React.HTMLAttributes<HTMLFormElement>) => {
  return <Form {...props}>{children}</Form>;
};

const Form = styled.form`
  flex: 1;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 480px;

  padding: 0 8px;

  background-color: ${p => p.theme.modalBackgroundColor};
`;
