import React from 'react';
import styled from 'styled-components';

interface CloseButtonProps {
  style?: any;
  size?: string;
  onClick?: React.MouseEventHandler;
}

const CloseButton: React.FC<CloseButtonProps> = ({ style, size, onClick }) => {
  const styles = {
    width: size,
    height: size,
    ...style,
  };

  return (
    <StyledButton style={styles} type="button" onClick={onClick}>
      <IconBox size={'100%'}>
        <Svg viewBox="0 0 24 24">
          <path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </Svg>
      </IconBox>
    </StyledButton>
  );
};

const StyledButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 150;

  font-size: 16px;
  color: rgba(0, 0, 0, 0.1);
  fill: rgba(0, 0, 0, 0.5);

  padding: 0;

  border-style: none;
  border: 1px solid transparent;

  background-color: rgba(0, 0, 0, 0);
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
const IconBox = styled.div<{ size: string }>`
  width: ${({ size }) => size || '100%'};
  height: ${({ size }) => size || '100%'};
  display: flex;
  align-items: center;
  justify-content: center;
  fill: inherit;
`;
const Svg = styled.svg`
  width: 100%;
  height: 100%;
  pointer-events: none;
  transition: all 250ms cubic-bezier(0.4, 0, 0.2, 1);
`;

export default CloseButton;
