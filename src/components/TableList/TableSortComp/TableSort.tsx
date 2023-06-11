import React, { useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';

import TableSortParamsList from './TableSortParamsList';
import styled from 'styled-components';
import { SelectItem } from 'components/TableList/TableList';

export interface TableSortProps {
  tableSortParams: SelectItem[];
  onSelect?: (param: SelectItem, sortOrder: SelectItem['sortOrder']) => void;
}

const TableSort: React.FC<TableSortProps> = ({ tableSortParams, onSelect }) => {
  // const modal = useModalProvider();
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);
  const [current, setCurrent] = useState<SelectItem>();

  function onOpenClick(newState?: boolean) {
    setIsOpen(newState);
  }

  function handleSelect(param: SelectItem, sortOrder: SelectItem['sortOrder']) {
    setCurrent({ ...param, sortOrder });
  }

  return (
    <Box>
      <StButton
        sortOrder={current?.sortOrder}
        variant="def"
        iconId="sort"
        iconSize="18px"
        endIconSize="26px"
        endIconId="SmallArrowDown"
        onClick={() => onOpenClick(true)}
        data-table-sort-open
      >
        <span title={current?.name || current?.label || ''}>
          {current?.name || current?.label || 'Оберіть параметр'}
        </span>
      </StButton>

      <ListBox isOpen={!!isOpen}>
        <TableSortParamsList {...{ tableSortParams, onSelect: handleSelect, current, isOpen, onOpenClick }} />
      </ListBox>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  max-width: 150px;
  min-width: 150px;
`;

const StButton = styled(ButtonIcon)<{ sortOrder?: SelectItem['sortOrder'] }>`
  display: grid;
  grid-template-columns: 26px 1fr 26px;
  height: 100%;
  max-width: 100%;
  width: 100%;

  padding-left: 4px;

  fill: ${({ theme }) => theme.accentColor.base};
  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.fieldColor};

  & span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &:active,
  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.fieldColor};
  }

  & .endIcon {
    transform: ${({ sortOrder }) => `rotate(${sortOrder && !['DESC', 'desc'].includes(sortOrder) ? 180 : 0}deg)`};
  }
`;

const ListBox = styled.div<{ isOpen: boolean }>`
  position: absolute;

  bottom: 0;
  left: 0;
  z-index: 200;

  min-height: 100%;
  width: 100%;
  max-width: 480px;

  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};

  /* outline: 3px solid tomato; */
`;

export default TableSort;
