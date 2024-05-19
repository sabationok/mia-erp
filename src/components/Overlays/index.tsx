import FlexBox from '../atoms/FlexBox';
import ButtonIcon from '../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../atoms/Text';
import styled from 'styled-components';
import * as React from 'react';

export const OverlayHeader = ({
  onBackPress,
  onClosePress,
  title,
  okButton,
  canSubmit,
}: {
  canSubmit?: boolean;
  onBackPress?: () => void;
  onClosePress?: () => void;
  title?: string;
  okButton?: boolean;
}) => {
  return (
    <Header
      alignItems={'center'}
      fillWidth
      fxDirection={'row'}
      justifyContent={'space-between'}
      height={'32px'}
      gap={8}
      padding={'2px 0'}
    >
      {onBackPress && (
        <ButtonIcon
          variant={'textExtraSmall'}
          icon={'SmallArrowLeft'}
          iconSize={'22px'}
          padding={'0'}
          style={{ minWidth: 'max-content', minHeight: '100%' }}
          onClick={onBackPress}
        >
          {'Back'}
        </ButtonIcon>
      )}

      <FlexBox justifyContent={'center'} overflow={'hidden'} padding={'0 8px'}>
        <Text
          $weight={600}
          $size={14}
          style={{ textTransform: 'uppercase', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
        >
          {title}
        </Text>
      </FlexBox>

      {okButton && (
        <ButtonIcon
          variant={'textExtraSmall'}
          gap={'6px'}
          type={'submit'}
          padding={'0 6px'}
          endIcon={'done'}
          endIconSize={'22px'}
          style={{ minWidth: 'max-content', minHeight: '100%' }}
          disabled={!canSubmit}
        >
          {'Ok'}
        </ButtonIcon>
      )}

      {onClosePress && (
        <ButtonIcon
          variant={'onlyIcon'}
          icon={'close'}
          iconSize={'22px'}
          style={{ minWidth: 'max-content' }}
          onClick={onClosePress}
        />
      )}
    </Header>
  );
};
const Header = styled(FlexBox)`
  height: 32px;

  border-bottom: 1px solid ${p => p.theme.modalBorderColor};
`;

export const OverlayFooter = ({
  submitButtonText = 'Прийняти',
  loading,
  extraFooter,
  canSubmit,
  onCreatePress,
  resetButtonShown,
}: {
  canSubmit?: boolean;
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
          variant={'filledLarge'}
          flex={1}
          type={'submit'}
          style={{ padding: '0 12px' }}
          textTransform={'uppercase'}
          fontWeight={600}
          endIcon={'SmallArrowRight'}
          endIconSize={'24px'}
          isLoading={loading}
          disabled={!canSubmit}
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
