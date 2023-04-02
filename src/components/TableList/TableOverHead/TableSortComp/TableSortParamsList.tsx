import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { ModalFormProps } from 'components/ModalForm/ModalForm';
import { iconId } from 'data';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { SelectItem } from '../TableSearch/SearchParamInput';

export interface TableSortParamsListProps extends ModalFormProps {
  tableSortParams?: SelectItem[];
  current: SelectItem & { descedantOrder: boolean };
  onClose?: () => void;
  handleSetCurrent: (param: SelectItem, descedantOrder: boolean) => <T = any>(args?: T | undefined) => any;
}

const TableSortParamsList: React.FC<TableSortParamsListProps> = ({
  tableSortParams,
  handleSetCurrent,
  current,
  onClose,
}) => {
  const [currentEl, setCurrentEl] = useState<SelectItem & { descedantOrder: boolean }>(current);

  function handleSetCurrentState(param: SelectItem, descedantOrder: boolean) {
    return () => {
      handleSetCurrent(param, descedantOrder) && handleSetCurrent(param, descedantOrder)();
      setCurrentEl({ ...param, descedantOrder });
      onClose && onClose();
    };
  }
  function isActive(param: SelectItem, descedantOrder: boolean) {
    return param.dataKey === currentEl?.dataKey && currentEl.descedantOrder === descedantOrder;
  }
  return (
    <SelectList>
      {tableSortParams?.map(param => (
        <ListParam key={param.dataKey}>
          <ParamLabel>{param.name || param.label}</ParamLabel>

          <SetOrderButton
            isActive={isActive(param, true)}
            variant="onlyIcon"
            iconId={iconId.SmallArrowDown}
            onClick={handleSetCurrentState(param, true)}
          />

          <SetOrderButton
            isActive={isActive(param, false)}
            variant="onlyIcon"
            iconId={iconId.SmallArrowUp}
            onClick={handleSetCurrentState(param, false)}
          />
        </ListParam>
      ))}
    </SelectList>
  );
};

const SelectList = styled.ul<{ isOpen?: boolean }>`
  display: flex;
  flex-direction: column;

  min-height: 150px;
  max-height: 70vh;
  min-width: 150px;
  min-width: max-content;
  padding: 8px;
  overflow: auto;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.borderColor};

  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain},
    transform ${({ theme }) => theme.globals.timingFnMui};
  /* transform-origin: top right; */

  /* ${({ isOpen }) =>
    isOpen
      ? css`
          transform: translate(100%, 0);
        `
      : css`
          transform: scale(0.7, 0.8);
          opacity: 0;
          visibility: hidden;
          pointer-events: none;
        `} */
`;
const ListParam = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  color: ${({ theme }) => theme.fontColorHeader};
  /* gap: 8px; */
`;
const ParamLabel = styled.div`
  flex-grow: 1;
  align-items: center;

  padding: 0 8px;
  min-width: max-content;

  color: ${({ theme }) => theme.fillColorHeader};
`;
const SetOrderButton = styled(ButtonIcon)<{ isActive: boolean }>`
  fill: ${({ isActive, theme }) => (isActive ? theme.accentColor.base : theme.fillColor)};
`;

export default TableSortParamsList;
