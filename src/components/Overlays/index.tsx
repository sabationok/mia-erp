import FlexBox, { FlexForm } from '../atoms/FlexBox';
import ButtonIcon from '../atoms/ButtonIcon';
import { Text } from '../atoms/Text';
import styled from 'styled-components';
import * as React from 'react';

export const DrawerHeader = ({
  onBackPress,
  onClosePress,
  title,
  okButton,
  canSubmit,
  isLoading,
}: {
  canSubmit?: boolean;
  onBackPress?: () => void;
  onClosePress?: () => void;
  title?: string;
  okButton?: boolean;
  children?: React.ReactNode;
  isLoading?: boolean;
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
      overflow={'hidden'}
      sStyles={{
        minHeight: '40px',
      }}
    >
      {onBackPress && (
        <ButtonIcon
          variant={'textSmall'}
          icon={'SmallArrowLeft'}
          iconSize={'28px'}
          padding={'0'}
          gap={4}
          style={{ minWidth: 'max-content', minHeight: '100%' }}
          onClick={onBackPress}
        ></ButtonIcon>
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
          variant={'textSmall'}
          gap={4}
          type={'submit'}
          padding={'0 6px'}
          icon={'done'}
          iconSize={'22px'}
          style={{ minWidth: 'max-content', minHeight: '100%' }}
          disabled={!canSubmit}
          isLoading={isLoading}
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
  onGoBackPress,
}: {
  canSubmit?: boolean;
  resetButtonShown?: boolean;
  extraFooter?: React.ReactNode;
  loading?: boolean;
  onCreatePress?: () => void;
  submitButtonText?: string;
  onGoBackPress?: () => void;
}) => {
  return (
    <Footer fillWidth>
      {extraFooter}

      <FlexBox padding={'8px 8px 16px'} fxDirection={'row'} gap={8} alignItems={'center'}>
        {onGoBackPress && (
          <ButtonIcon variant={'onlyIcon'} icon={'SmallArrowLeft'} size={'28px'} iconSize={'90%'} type={'reset'} />
        )}

        {resetButtonShown && (
          <ButtonIcon variant={'onlyIcon'} icon={'clear'} size={'28px'} iconSize={'90%'} type={'reset'} />
        )}

        {onCreatePress && (
          <ButtonIcon variant={'onlyIcon'} icon={'plus'} size={'32px'} iconSize={'90%'} onClick={onCreatePress} />
        )}

        <ButtonIcon
          variant={'filledMiddle'}
          flex={1}
          type={'submit'}
          // style={{ padding: '0 12px' }}
          // textTransform={'uppercase'}
          fontWeight={600}
          endIcon={'done'}
          // endIconSize={'24px'}
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

// export const OverlayForm = ({
//   children,
//   ...props
// }: { children?: React.ReactNode } & React.HTMLAttributes<HTMLFormElement>) => {
//   const theme=useTheme()
//   return <FlexForm flex={1} overflow={'hidden'} maxWidth={'480px'} width={'100%'} background={theme.modalBackgroundColor} {...props}>{children}</FlexForm>;
// };

export const OverlayForm = styled(FlexForm)`
  flex: 1;

  display: flex;
  flex-direction: column;

  width: 100%;
  max-width: 480px;

  padding: 0 8px;

  overflow: hidden;

  background-color: ${p => p.theme.modalBackgroundColor};
`;
