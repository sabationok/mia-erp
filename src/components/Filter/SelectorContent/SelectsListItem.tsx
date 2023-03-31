import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

export interface SelectsListItemProps {
  checked?: boolean;
  _id: string;
  label: string;
  name?: string;
  onSelect: <T = any | undefined>(item: T) => void;
}

const SelectsListItem: React.FC<SelectsListItemProps & React.HTMLAttributes<HTMLDivElement>> = ({
  checked,
  label,
  name,
  _id,
  onSelect,
}) => {
  const [isChecked, setIsChecked] = useState<boolean | undefined>(checked);
  function handleSelect() {
    setIsChecked(prev => {
      onSelect({ _id, checked: checked ? !checked : !prev, label });
      return checked ? checked : !prev;
    });
  }

  useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  return (
    <StyledItem>
      <ButtonIcon
        size="26px"
        iconSize="100%"
        variant="onlyIcon"
        iconId={!!isChecked ? iconId.checkBoxOn : iconId.checkBoxOff}
        aria-checked={!!isChecked}
        onClick={handleSelect}
      ></ButtonIcon>

      <span>{label || name}</span>
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
