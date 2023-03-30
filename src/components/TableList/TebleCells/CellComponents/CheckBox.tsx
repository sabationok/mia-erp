import React from 'react';
import SvgIcon from 'components/atoms/SvgIcon/SvgIcon';
import { iconId } from 'data';

import styled from 'styled-components';
export interface CustomCheckBoxProps {
  size?: string;
  icon?: string;
}
const CheckBox: React.FC<CustomCheckBoxProps & React.InputHTMLAttributes<HTMLInputElement>> = ({
  onChange,
  id = '1',
  checked = false,
  size = '24px',
  icon,
}) => {
  return (
    <StLabel htmlFor={id}>
      <input id={id} className="visually-hidden" type="checkbox" onChange={onChange} />

      <SvgIcon size={size} iconId={icon || checked ? iconId.checkBoxOn : iconId.checkBoxOff} />
    </StLabel>
  );
};
const StLabel = styled.label<{ checked?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
  fill: ${({ theme, checked }) => (checked ? theme.accentColor.base : theme.fillColor)};
`;

export default CheckBox;
