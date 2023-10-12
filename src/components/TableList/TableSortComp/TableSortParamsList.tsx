import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { ModalFormProps } from 'components/ModalForm';
import React, { useState } from 'react';
import styled from 'styled-components';
import { SelectItem } from 'components/TableList/TableList';
import { iconId } from '../../../img/sprite';

export interface TableSortParamsListProps extends Omit<ModalFormProps, 'onSelect'> {
  tableSortParams?: SelectItem[];
  current?: SelectItem;
  isOpen?: boolean;
  // onOpenClick: (isOpen?: boolean) => void;
  onSelect: (param: SelectItem, sortOrder: SelectItem['sortOrder']) => void;
}

const TableSortParamsList: React.FC<TableSortParamsListProps> = ({ tableSortParams, onSelect, current }) => {
  const [currentEl, setCurrentEl] = useState<SelectItem | undefined>(current);

  function handleSetCurrentState(param: SelectItem, sortOrder: SelectItem['sortOrder']) {
    return () => {
      onSelect && onSelect(param, sortOrder);

      setCurrentEl({ ...param, sortOrder });
    };
  }

  function isActive(param: SelectItem, sortOrder: SelectItem['sortOrder']) {
    return param.dataPath === currentEl?.dataPath && currentEl?.sortOrder === sortOrder;
  }

  return (
    <Box data-table-sort-close>
      <SelectList>
        {tableSortParams?.map(param => (
          <ListParam
            key={`sortItem-${param.dataKey || param.dataPath}`}
            isActive={param.dataPath === currentEl?.dataPath}
          >
            <ParamLabel>{param.name || param.label}</ParamLabel>

            <SetOrderButton
              className="button"
              isActive={isActive(param, 'desc')}
              variant="onlyIconNoEffects"
              size="100%"
              iconSize="80%"
              iconId={iconId.SmallArrowDown}
              onClick={handleSetCurrentState(param, 'desc')}
            />

            <SetOrderButton
              className="button"
              isActive={isActive(param, 'asc')}
              variant="onlyIconNoEffects"
              size="100%"
              iconSize="80%"
              iconId={iconId.SmallArrowUp}
              onClick={handleSetCurrentState(param, 'asc')}
            />
          </ListParam>
        ))}
      </SelectList>
    </Box>
  );
};

const Box = styled.div<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;

  max-height: 100%;
  max-width: 100%;
  width: 100%;
  height: max-content;

  overflow: auto;

  color: ${({ theme }) => theme.fontColorHeader};
  fill: ${({ theme }) => theme.fontColorHeader};

  background-color: ${({ theme }) => theme.modalBackgroundColor};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain},
    transform ${({ theme }) => theme.globals.timingFnMui};
`;
const SelectList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
`;
const SetOrderButton = styled(ButtonIcon)<{ isActive: boolean }>`
  visibility: hidden;
  transition: none;
  fill: ${({ isActive, theme }) => (isActive ? theme.accentColor.base : theme.fontColorHeader)};
`;
const ListParam = styled.li<{ isActive: boolean }>`
  display: grid;
  grid-template-columns: 1fr 36px 36px;
  grid-template-rows: 36px;
  align-items: center;
  position: relative;

  font-size: 14px;

  padding: 0 8px;

  cursor: default;

  color: ${({ isActive, theme }) => (isActive ? theme.fontColorHeader : '')};
  background-color: ${({ isActive, theme }) => (isActive ? theme.backgroundColorSecondary : '')};

  button {
    visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};
  }

  &:hover {
    color: ${({ theme }) => theme.fontColorHeader};
    background-color: ${({ theme }) => theme.backgroundColorSecondary};

    button {
      visibility: visible;
    }
  }

  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;

    transform: translateY(-50%);

    width: 3px;
    height: 50%;

    background-color: transparent;
    transition: height ${({ theme }) => theme.globals.timingFunctionLong};
  }

  &:hover {
    &::before {
      height: 100%;
      background-color: ${({ theme }) => theme.accentColor.base};
    }
  }

  &:active {
  }

  @media screen and (min-width: 480px) {
    grid-template-columns: 1fr 26px 26px;
    grid-template-rows: 26px;
  }
`;
const ParamLabel = styled.div`
  flex-grow: 1;
  align-items: center;

  margin-right: 8px;
  min-width: max-content;
`;

export default TableSortParamsList;
