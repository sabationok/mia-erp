import { useEffect, useState } from 'react';

import FlexBox, { FlexBoxProps } from '../../atoms/FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';
import { isUndefined } from 'lodash';

export interface FormAccordeonItemProps {
  children?: React.ReactNode;
  maxHeight?: string;
  renderHeader?: React.ReactNode;
  toggled?: boolean;
  open?: boolean;
  disabled?: boolean;
  contentContainerStyle?: FlexBoxProps;
  activeBackgroundColor?: string;
  className?: string;
}

const FormAccordeonItem: React.FC<FormAccordeonItemProps> = ({
  children,
  maxHeight = '32px',
  renderHeader = 'Інформація',
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
    if (!isUndefined(disabled) && disabled) {
      setIsOpen(false);
    }
  }, [disabled]);

  return (
    <Container style={{ maxHeight: isOpen ? '100%' : maxHeight }} className={className}>
      <StButton
        icon={toggled ? (isOpen ? 'SmallArrowDown' : 'SmallArrowRight') : undefined}
        iconSize={'24px'}
        variant={'def'}
        onClick={handleToggleOpen}
        disabled={!toggled || disabled || !children}
        isOpen={isOpen}
        activeBackgroundColor={activeBackgroundColor}
        className={'header'}
      >
        {renderHeader}
      </StButton>

      <ContentBox padding={'0 8px'} {...contentContainerStyle} className={'content'}>
        {children}
      </ContentBox>
    </Container>
  );
};

const Container = styled(FlexBox)`
  display: flex;
  grid-template-columns: 1fr;
  //grid-template-rows: repeat(10, 200px);

  position: relative;
  min-height: 32px;
  //height: max-content;
  max-height: 32px;
  overflow: hidden;

  border-top: 1px solid ${({ theme }) => theme.trBorderClr};
  transition: all ${({ theme }) => theme.globals.timingFnMain};
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};
  }
`;

const ContentBox = styled(FlexBox)`
  height: max-content;

  transition: all ${({ theme }) => theme.globals.timingFnMain};
`;

const StButton = styled(ButtonIcon)<{ isOpen?: boolean; activeBackgroundColor?: string }>`
  justify-content: flex-start;

  padding: 0 8px 0 0;

  width: 100%;
  min-height: 32px;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;

  font-size: 14px;
  font-weight: 700;

  fill: ${({ theme }) => theme.accentColor.base};
  border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};
  background-color: ${({ theme, isOpen }) => (isOpen ? theme.fieldBackgroundColor : theme.modalBackgroundColor)};
`;

export default FormAccordeonItem;
