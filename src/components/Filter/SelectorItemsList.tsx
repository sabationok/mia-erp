import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import { useState } from 'react';
import styled from 'styled-components';

export interface SelectorListItem {
  label?: string;
  _id?: string;
  checked?: boolean;
}

export interface SelectorItemsList {
  onChange: (id: string) => void;
  isOpen: boolean;
  list: SelectorListItem[];
}

const SelectorItemsList: React.FC<SelectorItemsList & React.HTMLAttributes<HTMLDivElement>> = ({
  isOpen = false,
  onChange,
  list = [],
  ...props
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredList, SetFilteredList] = useState<SelectorListItem[]>();

  return (
    <ListContainer {...props}>
      <StInput type="text" placeholder="Пошук" />
      <ItemsList isOpen={isOpen}>
        {list.map((item, idx) => (
          <SeletedItem key={idx}>
            <ButtonIcon
              size="26px"
              variant="onlyIcon"
              iconId={item?.checked ? iconId.checkBoxOn : iconId.checkBoxOff}
              aria-checked={!!item?.checked}
              onClick={() => onChange && item?._id && onChange(item?._id)}
            />

            <span>{item?.label}</span>
          </SeletedItem>
        ))}
      </ItemsList>
    </ListContainer>
  );
};
const StInput = styled.input`
  width: 100%;
  padding: 4px 8px;
  color: ${({ theme }) => theme.fillColorHeader};

  border-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.globals.inputBorder};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  &:focus,
  &:hover {
    border-bottom: 1px solid ${({ theme }) => theme.accentColor.base};
  }
  &::placeholder {
    color: ${({ theme }) => theme.fontColorHeader};
  }
`;
const ListContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 28px 1fr;

  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  color: ${({ theme }) => theme.fontColorHeader};

  border-radius: 2px;
  background-color: ${({ theme }) => theme.backgroundColorSecondary};
`;

const ItemsList = styled.ul<{ isOpen: boolean }>`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 22px;

  padding: 8px 0;
  gap: 2px;

  width: 100%;
  max-height: 100%;
  overflow: auto;

  /* background-color: #323234; */
`;
const SeletedItem = styled.li`
  display: flex;
  align-items: center;

  gap: 8px;

  padding: 0 8px;

  border-radius: 2px;
`;

export default SelectorItemsList;
