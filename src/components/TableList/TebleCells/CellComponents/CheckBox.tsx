import React, { memo, useEffect, useState } from 'react';
import SvgIcon from 'components/atoms/SvgIcon/SvgIcon';
import * as _ from 'lodash';
import styled from 'styled-components';
import { IconIdType } from 'img/sprite';

export interface CustomCheckBoxProps {
  size?: string;
  icon?: IconIdType | null;
  idx?: string | number;
  onChange?: CustomCheckboxEventHandler;
}

export type CustomCheckboxEventHandler = (customEvent: CustomCheckboxEvent) => void;

export interface CustomCheckboxEvent {
  checked: boolean;
  event?: React.MouseEvent<HTMLButtonElement>;
}

const CheckBox: React.FC<CustomCheckBoxProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>> = ({
  onChange,
  disabled,
  id = '1',
  checked = false,
  size = '20px',
  icon,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  function onChangeHandler(event: React.MouseEvent<HTMLButtonElement>) {
    setIsChecked(prev => {
      return !prev;
    });
    onChange && onChange({ checked: !isChecked, event });
  }

  useEffect(() => {
    if (!_.isUndefined(checked)) {
      setIsChecked(checked);
    }
  }, [checked]);

  return (
    <Box id={id} checked={isChecked} type={'button'} disabled={disabled} onClick={onChangeHandler}>
      <SvgIcon size={size} icon={icon || (isChecked ? 'checkBoxOn' : 'checkBoxOff')} style={{ fill: 'inherit' }} />
    </Box>
  );
};
const Box = styled.button<{ checked?: boolean; disabled?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  border-style: none;
  background-color: inherit;
  padding: 0;
  position: relative;

  //width: 100%;
  //height: 100%;
  fill: ${({ theme, checked }) => (checked ? theme.accentColor.base : theme.fillColor)};
  border-radius: 3px;
  overflow: hidden;

  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
  cursor: ${({ disabled }) => (disabled ? 'default' : 'pointer')};

  &:hover {
    fill: ${({ theme }) => theme.accentColor.hover};
  }

  &:active {
    fill: ${({ theme }) => theme.accentColor.pressed};
  }

  &:focus,
  &:focus-visible {
    fill: ${({ theme }) => theme.accentColor.hover};
    outline: none;
  }
`;

export default memo(CheckBox);
