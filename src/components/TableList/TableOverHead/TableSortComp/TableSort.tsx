import React, { useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import styled from 'styled-components';
import { SelectItem } from '../TableSearch/SearchParamInput';
import TableSortParamsList from './TableSortParamsList';

export interface TableSortProps {
  tableSortParams?: SelectItem[];
}

const TableSort: React.FC<TableSortProps> = ({ tableSortParams }) => {
  const modal = useModalProvider();
  const [current, setCurrent] = useState<SelectItem & { descedantOrder: boolean }>({
    descedantOrder: false,
    dataKey: 'contractor',
    label: 'Контрагент',
  });

  function handleSetCurrent(param: SelectItem, descedantOrder: boolean) {
    return () => {
      setCurrent({ ...param, descedantOrder });
    };
  }
  function onOpenList() {
    modal.handleOpenModal({
      ModalChildren: TableSortParamsList,
      modalChildrenProps: { tableSortParams, handleSetCurrent, current },
    });
  }

  return (
    <Box>
      <div>Сортувати за:</div>

      <DropDownBox>
        <StButton
          descedantOrder={current?.descedantOrder}
          variant="def"
          endIconSize="26px"
          endIconId="SmallArrowDown"
          onClick={onOpenList}
        >
          {current.name || current.label}
        </StButton>
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
const StButton = styled(ButtonIcon)<{ descedantOrder?: boolean }>`
  width: fit-content;
  height: 100%;

  padding-left: 8px;

  fill: ${({ theme }) => theme.accentColor.base};
  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  &:active,
  &:focus,
  &:hover {
    background-color: ${({ theme }) => theme.backgroundColorSecondary};
  }
  & .endIcon {
    transform: ${({ descedantOrder }) => `rotate(${!descedantOrder ? 180 : 0}deg)`};
  }
`;

export default TableSort;
