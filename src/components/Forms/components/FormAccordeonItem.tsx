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
}

const FormAccordeonItem: React.FC<FormAccordeonItemProps> = ({
  children,
  maxHeight = '32px',
  renderHeader = 'Інформація',
  toggled = true,
  open = false,
  disabled,
  contentContainerStyle,
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
    <Container style={{ maxHeight: isOpen ? '100%' : maxHeight }}>
      <StButton
        icon={!isOpen ? 'SmallArrowDown' : 'SmallArrowUp'}
        iconSize={'24px'}
        variant={'def'}
        onClick={handleToggleOpen}
        disabled={disabled || !children}
      >
        {renderHeader}
      </StButton>

      <ContentBox {...contentContainerStyle}>{children}</ContentBox>
    </Container>
  );
};

const Container = styled(FlexBox)`
  display: grid;
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

  .isOpenItem {
    overflow: visible;
    max-height: 100%;

    & .btn {
      background-color: ${({ theme }) => theme.fieldColor};
    }

    & .icon {
      transform: rotate(0deg);
    }

    & .contentBox {
      // max-height: 100%;
    }
  }
`;
const ContentBox = styled(FlexBox)`
  position: relative;
  // max-height: 0px;
  //overflow: hidden;
  height: max-content;
  padding: 8px 16px;

  transition: all ${({ theme }) => theme.globals.timingFnMain};
`;

const StButton = styled(ButtonIcon)`
  justify-content: flex-start;

  padding: 0 8px;

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
`;

export default FormAccordeonItem;
