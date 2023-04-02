import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { ModalFormProps } from 'components/ModalForm/ModalForm';
import { iconId } from 'data';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { SelectItem } from 'components/TableList/TableList';

export interface TableSortParamsListProps extends ModalFormProps {
  tableSortParams?: SelectItem[];
  current: SelectItem & { descedantOrder: boolean };
  isOpen?: boolean;
  onOpenClick: (isOpen?: boolean) => void;
  handleSetCurrent: (param: SelectItem, descedantOrder: boolean) => <T = any>(args?: T | undefined) => any;
}

const TableSortParamsList: React.FC<TableSortParamsListProps> = ({
  tableSortParams,
  handleSetCurrent,
  current,
  onOpenClick,
  isOpen,
}) => {
  const [currentEl, setCurrentEl] = useState<SelectItem & { descedantOrder: boolean }>(current);

  function handleSetCurrentState(param: SelectItem, descedantOrder: boolean) {
    return () => {
      handleSetCurrent(param, descedantOrder) && handleSetCurrent(param, descedantOrder)();
      setCurrentEl({ ...param, descedantOrder });
    };
  }
  function isActive(param: SelectItem, descedantOrder: boolean) {
    return param.dataKey === currentEl?.dataKey && currentEl.descedantOrder === descedantOrder;
  }

  useEffect(() => {
    function onMenuClose(ev: MouseEvent | KeyboardEvent) {
      const { target } = ev;

      if (target instanceof HTMLElement && target?.closest('[data-table-sort-open]')) return onOpenClick(true);
      if (target instanceof HTMLElement && !target?.closest('[data-table-sort-close]')) onOpenClick(false);
      if (ev instanceof KeyboardEvent && ev?.code === 'Escape') onOpenClick(false);
    }
    document.addEventListener('click', onMenuClose);
    document.addEventListener('keydown', onMenuClose);

    return () => {
      document.removeEventListener('click', onMenuClose);
      document.removeEventListener('keydown', onMenuClose);
    };
  }, [isOpen, onOpenClick]);
  return (
    <SelectList isOpen={isOpen} data-table-sort-close>
      <Title>
        <span>Сортування</span>

        <ButtonIcon variant="def" iconId="close" iconSize="26px" onClick={() => onOpenClick(false)} />
      </Title>

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
  position: absolute;
  top: 0;
  right: 0;
  z-index: 2000;

  min-height: 150px;
  max-height: 50vh;
  min-width: 150px;
  min-width: max-content;
  padding: 8px;
  overflow: auto;
  border-radius: 2px;
  border: 1px solid ${({ theme }) => theme.borderColor};

  color: ${({ theme }) => theme.fontColorHeader};
  fill: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain},
    transform ${({ theme }) => theme.globals.timingFnMui};
  /* transform-origin: top right; */

  ${({ isOpen }) =>
    isOpen
      ? css`
          transform: translate(0%, 0);
        `
      : css`
          transform: translate(100%, 0);
          /* opacity: 0; */
          visibility: hidden;
          pointer-events: none;
        `}

  @media screen  and (min-height:480px) {
    max-height: max-content;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 600;
  & span {
    padding: 0 8px;
  }

  border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};
`;
const ListParam = styled.li`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* gap: 8px; */
`;
const ParamLabel = styled.div`
  flex-grow: 1;
  align-items: center;

  padding: 0 8px;
  min-width: max-content;
`;
const SetOrderButton = styled(ButtonIcon)<{ isActive: boolean }>`
  fill: ${({ isActive, theme }) => (isActive ? theme.accentColor.base : theme.fontColorHeader)};
`;

export default TableSortParamsList;
