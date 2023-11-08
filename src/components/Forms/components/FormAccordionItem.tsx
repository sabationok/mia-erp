import { useEffect, useState } from 'react';

import FlexBox, { FlexBoxProps } from '../../atoms/FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { isBoolean } from 'lodash';
import { t } from '../../../lang';

export interface FormAccordeonItemProps {
  children?: React.ReactNode;
  maxHeight?: string;
  title?: React.ReactNode;
  renderHeader?: React.ReactNode;
  renderFooter?: React.ReactNode;
  toggled?: boolean;
  open?: boolean;
  disabled?: boolean;
  contentContainerStyle?: FlexBoxProps;
  activeBackgroundColor?: string;
  className?: string;
}

const FormAccordionItem: React.FC<FormAccordeonItemProps> = ({
  children,
  maxHeight = '32px',
  renderHeader,
  renderFooter,
  toggled = true,
  open = false,
  disabled,
  contentContainerStyle,
  activeBackgroundColor = 'rgba(220, 220, 220, 1)',
  className,
}) => {
  const [isOpen, setIsOpen] = useState(!!disabled || open);
  function handleToggleOpen() {
    if (!toggled) return;
    setIsOpen(prev => !prev);
  }

  useEffect(() => {
    if (isBoolean(disabled) && disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  return (
    <Container style={{ maxHeight: isOpen ? '100%' : maxHeight }} className={className}>
      <Header
        fillWidth
        fxDirection={'row'}
        className={'header'}
        isOpen={isOpen}
        alignItems={'center'}
        justifyContent={'space-between'}
        activeBackgroundColor={activeBackgroundColor}
      >
        <StButton
          icon={toggled ? (isOpen ? 'SmallArrowDown' : 'SmallArrowRight') : undefined}
          iconSize={'24px'}
          variant={'def'}
          onClick={handleToggleOpen}
          disabled={!toggled || disabled || !children}
          isOpen={isOpen}
        >
          {isOpen ? t('Close') : t('Open')}
        </StButton>

        {renderHeader}
      </Header>

      <ContentBox padding={'0 8px'} overflow={'hidden'} {...contentContainerStyle} className={'content'}>
        {children}
      </ContentBox>

      {renderFooter}
    </Container>
  );
};

const Container = styled(FlexBox)`
  //position: relative;
  min-height: 32px;
  //height: max-content;
  max-height: 32px;
  //overflow: hidden;

  color: inherit;

  border-top: 1px solid ${({ theme }) => theme.trBorderClr};
  transition: all ${({ theme }) => theme.globals.timingFnMain};
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};
  }
`;

const Header = styled(FlexBox)<{ isOpen?: boolean; activeBackgroundColor?: string }>`
  min-height: 32px;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 50;

  color: inherit;
  border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};
  background-color: ${({ theme }) => theme.modalBackgroundColor};
`;

const ContentBox = styled(FlexBox)`
  height: max-content;

  transition: all ${({ theme }) => theme.globals.timingFnMain};
`;

const StButton = styled(ButtonIcon)<{ isOpen?: boolean; activeBackgroundColor?: string }>`
  justify-content: flex-start;

  padding: 0 8px 0 0;

  min-width: min-content;

  flex: 1;

  font-size: 14px;
  font-weight: 500;
  color: inherit;

  fill: ${({ theme }) => theme.accentColor.base};

  &:hover,
  &:active,
  &:focus {
    background-color: inherit;
  }
`;

export default FormAccordionItem;
