import { useState } from 'react';

import FlexBox from '../../atoms/FlexBox';
import styled from 'styled-components';
import ButtonIcon from '../../atoms/ButtonIcon/ButtonIcon';

export interface FormAccordeonItemProps {
  children?: React.ReactNode;
  maxHeight?: string;
  renderHeader?: React.ReactNode;
  toggled?: boolean;
  open?: boolean;
}

const FormAccordeonItem: React.FC<FormAccordeonItemProps> = ({
  children,
  maxHeight = '32px',
  renderHeader = 'Інформація',
  toggled = true,
  open = false,
}) => {
  const [isOpen, setIsOpen] = useState(open);

  function handleToggleOpen() {
    if (!toggled) return;
    setIsOpen(!isOpen);
  }

  return (
    <Container style={{ maxHeight: isOpen ? '100%' : maxHeight }}>
      <StButton
        icon={!isOpen ? 'SmallArrowDown' : 'SmallArrowUp'}
        iconSize={'24px'}
        variant={'def'}
        onClick={handleToggleOpen}
        disabled={!children && true}
      >
        {renderHeader}
      </StButton>

      <ContentBox>
        <Content>{children}</Content>
      </ContentBox>
    </Container>
  );
};

const Container = styled(FlexBox)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: max-content 1fr;

  min-height: 32px;
  max-height: 32px;
  overflow: hidden;
  // overflow: auto;

  border-top: 1px solid ${({ theme }) => theme.trBorderClr};
  transition: all ${({ theme }) => theme.globals.timingFnMain};
  &:last-child {
    border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};
  }

  .isOpenItem {
    overflow: visible;
    max-height: 100%;

    & .btn {
      color: var(--brand_clr__2);
      fill: var(--brand_clr__2);

      background-color: rgba(254, 254, 254, 0.5);
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
  overflow: hidden;

  transition: all ${({ theme }) => theme.globals.timingFnMain};
`;
const Content = styled(FlexBox)`
  max-height: 100%;
  max-width: 100%;
  overflow: hidden;
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
`;

export default FormAccordeonItem;
