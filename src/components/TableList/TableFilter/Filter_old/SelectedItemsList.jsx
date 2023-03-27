import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import React from 'react';
import styled from 'styled-components';

const SelectedItemsList = ({ isOpen = false, onChange, list = [] }) => {
  return (
    <ItemsList isOpen={isOpen}>
      {list.map(item => (
        <SeletedItem key={item._id}>
          <ButtonIcon
            size="26px"
            variant={item?.checked && 'def'}
            iconId={item?.checked ? iconId.checkBoxOn : iconId.checkBoxOff}
            aria-checked={item?.checked}
            onClick={() => onChange && onChange(item._id)}
          />

          <span>{item?.title || item?.name}</span>
        </SeletedItem>
      ))}
    </ItemsList>
  );
};

const ItemsList = styled.ul`
  display: grid;
  gap: 8px;

  width: 100%;
  overflow: hidden;
  padding: ${({ isOpen }) => (isOpen ? '4px' : 0)};

  max-height: ${({ isOpen }) => (isOpen ? '100%' : 0)};
`;
const SeletedItem = styled.li`
  display: flex;
  align-items: center;

  gap: 8px;

  padding: 5px 8px;

  background-color: ${({ theme }) => theme.backgroundColorMain};
  border-radius: 2px;
`;

export default SelectedItemsList;
