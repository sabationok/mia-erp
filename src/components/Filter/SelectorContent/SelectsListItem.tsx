import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import React, { useState } from 'react';
import styled from 'styled-components';

export interface SelectsListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  checked?: boolean;
  _id: string;
  label: string;
  onSelect: <T = any | undefined>(item: T) => void;
}

const SelectsListItem: React.FC<SelectsListItemProps> = ({ checked, label, _id, onSelect }) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(checked || false);
  function handleSelect() {
    setIsChecked(prev => {
      onSelect({ _id, checked: checked ? !checked : !prev, label });
      return checked ? checked : !prev;
    });
  }

  return (
    <StyledItem>
      <ButtonIcon
        size="26px"
        iconSize="100%"
        variant="onlyIcon"
        iconId={isChecked ? iconId.checkBoxOn : iconId.checkBoxOff}
        aria-checked={isChecked}
        onClick={handleSelect}
      ></ButtonIcon>

      <span>{label}</span>
    </StyledItem>
  );
};

const StyledItem = styled.li`
  display: flex;
  align-items: center;

  gap: 8px;

  padding: 0 8px;

  border-radius: 2px;
`;

export default SelectsListItem;
