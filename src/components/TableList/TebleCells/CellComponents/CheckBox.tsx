import React, { memo, useEffect, useState } from 'react';
import SvgIcon from 'components/atoms/SvgIcon/SvgIcon';
import * as _ from 'lodash';
import styled from 'styled-components';
import { IconIdType } from 'img/sprite';
import { FlexLabel } from '../../../atoms/FlexBox';

export interface CheckBoxProps {
  size?: string;
  icon?: IconIdType | null;
  idx?: string | number;
  onChange?: CustomCheckboxEventHandler;
}
export interface ButtonCheckboxEvent extends React.ChangeEvent<HTMLInputElement> {
  checked: boolean;
}

export type CustomCheckboxEventHandler = (event: ButtonCheckboxEvent) => void;

const CheckBox: React.FC<CheckBoxProps & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'>> = ({
  onChange,
  disabled,
  id = '1',
  checked = false,
  size = '20px',
  icon,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange && onChange({ ...event, checked: event.target.checked });
    } else {
      setIsChecked(event.target.checked);
    }
  }

  useEffect(() => {
    if (!_.isUndefined(checked)) {
      setIsChecked(checked);
    }
  }, [checked]);

  return (
    <Label disabled={disabled} checked={isChecked}>
      <StInput
        id={`checkbox_${id ?? ''}`}
        className={'visually-hidden'}
        checked={isChecked}
        type={'checkbox'}
        disabled={disabled}
        onChange={onChangeHandler}
      ></StInput>

      <SvgIcon size={size} icon={icon || (isChecked ? 'checkBoxOn' : 'checkBoxOff')} style={{ fill: 'inherit' }} />
    </Label>
  );
};
const Label = styled(FlexLabel)<{ checked?: boolean; disabled?: boolean }>`
  border-style: none;
  background-color: inherit;
  padding: 0;
  position: relative;

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
const StInput = styled.input<{ checked?: boolean; disabled?: boolean }>`
  //visibility: hidden;
  //opacity: 0;
  //
  //appearance: none;
  //max-width: 0;
  //max-height: 0;
  //width: 100%;
  //height: 100%;
`;

export default memo(CheckBox);
