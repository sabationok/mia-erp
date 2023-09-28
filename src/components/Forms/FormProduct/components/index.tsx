import FlexBox from '../../../atoms/FlexBox';
import ButtonIcon from '../../../atoms/ButtonIcon/ButtonIcon';
import { Text } from '../../../atoms/Text';
import styled from 'styled-components';

export const OverlayHeader = ({
  onClose,
  title,
  showSubmitButton,
}: {
  onClose?: () => void;
  title?: string;
  showSubmitButton?: boolean;
}) => {
  return (
    <Header padding={'4px 0'}>
      <FlexBox fillWidth fxDirection={'row'} justifyContent={'space-between'} alignItems={'stretch'} height={'32px'}>
        <ButtonIcon
          variant={'textExtraSmall'}
          icon={'SmallArrowLeft'}
          iconSize={'22px'}
          padding={'0 6px'}
          style={{ minWidth: 'max-content', minHeight: '100%' }}
          onClick={onClose}
        >
          {'Back'}
        </ButtonIcon>

        <FlexBox justifyContent={'center'} overflow={'hidden'}>
          <Text
            $weight={600}
            $size={16}
            style={{ textTransform: 'uppercase', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
          >
            {title}
          </Text>
        </FlexBox>

        {showSubmitButton && (
          <ButtonIcon
            variant={'textExtraSmall'}
            gap={'6px'}
            type={'submit'}
            padding={'0 6px'}
            endIcon={'done'}
            endIconSize={'22px'}
            style={{ minWidth: 'max-content', minHeight: '100%' }}
          >
            {'Ok'}
          </ButtonIcon>
        )}
      </FlexBox>
    </Header>
  );
};
const Header = styled(FlexBox)`
  height: 32px;
`;

export const OverlayFooter = ({
  onCreatePress,
  submitButtonText = 'Прийняти',
  loading,
  extraFooter,
}: {
  extraFooter?: React.ReactNode;
  loading?: boolean;
  onCreatePress?: () => void;
  submitButtonText?: string;
}) => {
  return (
    <Footer fillWidth>
      {extraFooter}

      <FlexBox padding={'8px 8px'} fxDirection={'row'} gap={8} alignItems={'center'}>
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
          disabled={loading}
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
