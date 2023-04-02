import React, { useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
// import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import TableSortParamsList from './TableSortParamsList';
import styled from 'styled-components';
import { SelectItem } from 'components/TableList/TableList';

export interface TableSortProps {
  tableSortParams: SelectItem[];
}

const TableSort: React.FC<TableSortProps> = ({ tableSortParams }) => {
  // const modal = useModalProvider();
  const [isOpen, setIsOpen] = useState<boolean | undefined>(false);
  const [current, setCurrent] = useState<SelectItem & { descending: boolean }>({
    descending: false,
    ...tableSortParams[0],
  });

  function onOpenClick(newState?: boolean) {
    setIsOpen(newState);
  }
  function handleSetCurrent(param: SelectItem, descending: boolean) {
    return () => {
      setCurrent({ ...param, descending });
    };
  }
  // function onOpenList() {
  //   modal.handleOpenModal({
  //     ModalChildren: TableSortParamsList,
  //     modalChildrenProps: { tableSortParams, handleSetCurrent, current, onOpenClick },
  //   });
  // }

  return (
    <Box>
      {/* <div>Сортувати за:</div> */}

      <DropDownBox>
        <StButton
          descending={current?.descending}
          variant="def"
          iconId="sort"
          iconSize="26px"
          endIconSize="26px"
          endIconId="SmallArrowDown"
          onClick={() => onOpenClick(true)}
          data-table-sort-open
        >
          <span title={current.name || current.label}>{current.name || current.label}</span>
        </StButton>
        <ListBox isOpen={!!isOpen}>
          <TableSortParamsList {...{ tableSortParams, handleSetCurrent, current, isOpen, onOpenClick }} />
        </ListBox>
      </DropDownBox>
    </Box>
  );
};

const Box = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const DropDownBox = styled.div`
  /* position: relative; */
`;
const StButton = styled(ButtonIcon)<{ descending?: boolean }>`
  display: grid;
  grid-template-columns: 26px 1fr 26px;
  height: 100%;
  max-width: 100%;
  /* max-width: 160px; */

  padding-left: 4px;

  fill: ${({ theme }) => theme.accentColor.base};
  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorLight};

  & span {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  }

  &:active,
  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColorLight};
  }
  & .endIcon {
    transform: ${({ descending }) => `rotate(${!descending ? 180 : 0}deg)`};
  }
`;

const ListBox = styled.div<{ isOpen: boolean }>`
  position: absolute;

  top: 0;
  right: 0;
  z-index: 2000;

  height: 100%;

  pointer-events: ${({ isOpen }) => (isOpen ? 'all' : 'none')};

  @media screen and (min-height: 480px) {
    top: 100%;
  }
`;

export default TableSort;
