import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { ModalFormProps } from 'components/ModalForm';
import { iconId } from 'data';
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { SelectItem } from 'components/TableList/TableList';

export interface TableSortParamsListProps extends ModalFormProps {
  tableSortParams?: SelectItem[];
  current: SelectItem & { descending: boolean };
  isOpen?: boolean;
  onOpenClick: (isOpen?: boolean) => void;
  handleSetCurrent: (param: SelectItem, descending: boolean) => <T = any>(args?: T | undefined) => any;
}

const TableSortParamsList: React.FC<TableSortParamsListProps> = ({
                                                                   tableSortParams,
                                                                   handleSetCurrent,
                                                                   current,
                                                                   onOpenClick,
                                                                   isOpen,
                                                                 }) => {
  const [currentEl, setCurrentEl] = useState<SelectItem & { descending: boolean }>(current);

  function handleSetCurrentState(param: SelectItem, descending: boolean) {
    return () => {
      handleSetCurrent(param, descending) && handleSetCurrent(param, descending)();
      setCurrentEl({ ...param, descending });
    };
  }

  function isActive(param: SelectItem, descending: boolean) {
    return param.dataKey === currentEl?.dataKey && currentEl.descending === descending;
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
    <Box isOpen={isOpen} data-table-sort-close>
      <Title>
        <span>Сортування</span>

        <ButtonIcon variant='onlyIconNoEffects' iconId='close' iconSize='26px' onClick={() => onOpenClick(false)} />
      </Title>

      <SelectList>
        {tableSortParams?.map(param => (
          <ListParam key={param.dataKey || param.dataPath} isActive={param.dataPath === currentEl?.dataPath}>
            <ParamLabel>{param.name || param.label}</ParamLabel>

            <SetOrderButton
              className='button'
              isActive={isActive(param, true)}
              variant='onlyIconNoEffects'
              size='100%'
              iconSize='80%'
              iconId={iconId.SmallArrowDown}
              onClick={handleSetCurrentState(param, true)}
            />

            <SetOrderButton
              className='button'
              isActive={isActive(param, false)}
              variant='onlyIconNoEffects'
              size='100%'
              iconSize='80%'
              iconId={iconId.SmallArrowUp}
              onClick={handleSetCurrentState(param, false)}
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
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 2000;

  min-height: 150px;
  max-height: 70vh;
  min-width: max-content;

  overflow: hidden;
  border-radius: 2px;
    /* border: 1px solid ${({ theme }) => theme.borderColor}; */

  color: ${({ theme }) => theme.fontColorHeader};
  fill: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  /* backdrop-filter: blur(3px); */
  background-color: ${({ theme }) => theme.backdropColor};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  transition: all ${({ theme }) => theme.globals.timingFunctionMain},
  transform ${({ theme }) => theme.globals.timingFnMui};

  ${({ isOpen }) =>
          isOpen
                  ? css`
                    transform: translate(0, 0);
                  `
                  : css`
                    transform: translate(0, 100%);
                    /* opacity: 0; */
                    visibility: hidden;
                    pointer-events: none;
                  `};
  @media screen and(min-height: 480px) {
    max-height: 90vh;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  position: sticky;
  top: 0;
  left: 0;
  z-index: 100;

  width: 100%;
  height: 36px;

  font-size: 14px;

  color: ${({ theme }) => theme.fontColorHeader};
  background-color: ${({ theme }) => theme.backgroundColorMain};

  & span {
    padding: 0 8px;
  }

  @media screen and (min-width: 480px) {
    height: 26px;
  }
`;
const SelectList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;

  overflow: auto;

  background-color: ${({ theme }) => theme.backgroundColorLight};
`;
const SetOrderButton = styled(ButtonIcon)<{ isActive: boolean }>`
  visibility: hidden;
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

  button {
    visibility: ${({ isActive }) => (isActive ? 'visible' : 'hidden')};

    &::before {
    }
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
