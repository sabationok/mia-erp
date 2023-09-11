import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';

type Props = {
  active?: boolean;
  onChange?: (value: boolean) => void;
  size?: number;
  disabled?: boolean;
};

function Toggler({ active = false, onChange, size = 14, disabled = false }: Props) {
  const [_active, setActive] = useState(active ?? false);

  useEffect(() => {
    setActive(disabled ? false : active ?? false);
  }, [active, disabled]);
  const onTogglerPress = () => {
    setActive(!_active);
    onChange && onChange(!_active);
  };

  return (
    <Container
      onClick={onTogglerPress}
      size={size}
      isActive={_active ?? false}
      disabled={disabled}
      aria-checked={_active}
    >
      <Circle isActive={_active ?? false} size={size} />
    </Container>
  );
}

const Container = styled.div<{
  isActive: boolean;
  disabled?: boolean;
  size?: number;
}>`
  display: flex;
  align-items: center;
  //position: relative;
  //justify-content: ${p => (p.isActive ? 'flex-end' : 'flex-start')};

  padding: 2px;
  width: ${({ size = 16 }) => size * 2.5}px;
  height: ${({ size = 16 }) => size + 6}px;

  //background-color: ${p => p.theme.sideBarBackgroundColor};
  border-radius: 100px;
  background-color: ${({ isActive, theme }) => (isActive ? theme.accentColor.light : theme.sideBarBackgroundColor)};

  border: 1px solid ${({ isActive, theme }) => (isActive ? theme.accentColor.base : '#e9e7dd')};

  opacity: ${({ disabled }) => (disabled ? '70%' : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
  cursor: pointer;

  transition: all ${p => p.theme.globals.timingFunctionMain};
`;

const Circle = styled.div<{ isActive: boolean; size?: number }>`
  width: ${({ size = 16 }) => size}px;
  height: ${({ size = 16 }) => size}px;

  margin-left: ${({ isActive, size = 16 }) => (isActive ? size * 1.5 - 6 : 0)}px;

  border-radius: 50%;
  background-color: ${({ isActive, theme }) => (isActive ? theme.accentColor.base : '#e9e7dd')};
  transition: all ${p => p.theme.globals.timingFunctionMain};
`;

export default memo(Toggler);
