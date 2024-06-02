import { useTable } from './TableList';
import FlexBox, { FlexLi, FlexUl } from '../atoms/FlexBox';
import styled from 'styled-components';
import React, { useEffect, useMemo, useState } from 'react';
import ButtonIcon from '../atoms/ButtonIcon';
import { useCloseByEscapeOrClickOnBackdrop } from '../../hooks';

export interface TableActionsListProps {
  closeOnClickOut?: boolean;
}

const TableActionsList = ({ closeOnClickOut }: TableActionsListProps) => {
  const { selectedRow, selectedRows, tableActions } = useTable();

  const renderActions = useMemo(() => {
    return tableActions?.actions?.map((action, index) => {
      return <Action key={`action_${action?.name ?? index}`}></Action>;
    });
  }, [tableActions?.actions]);

  const [isShown, setIsShown] = useState(false);

  function onMenuBtnClick() {
    setIsShown(prev => !prev);
  }

  useCloseByEscapeOrClickOnBackdrop(setIsShown, 'data-burger', closeOnClickOut);

  useEffect(() => {
    if (selectedRow) setIsShown(true);
    if (!selectedRow && selectedRows && selectedRows?.length === 0) {
      setIsShown(false);
    }
  }, [selectedRow, selectedRows]);

  return (
    <>
      <ActionsBox>
        <List>{renderActions}</List>
      </ActionsBox>

      <ToggleButton isShown={isShown} icon={'plus'} variant="def" iconSize="70%" size="48px" onClick={onMenuBtnClick} />
    </>
  );
};
const ActionsBox = styled(FlexBox)`
  position: absolute;
  top: 0;
  right: 0;
  z-index: 30;

  padding: 8px;
`;
const List = styled(FlexUl)`
  border-radius: 4px;
`;

const Action = styled(FlexLi)``;

const ToggleButton = styled(ButtonIcon)<{ isShown: boolean }>`
  position: absolute;
  bottom: 0;
  right: 0;
  z-index: 70;

  border-radius: 50%;
  fill: ${({ theme }) => theme.accentColor.base};

  box-shadow: ${({ isShown, theme }) => (isShown ? theme.globals.shadowMain : '')};
  background-color: ${({ theme, isShown }) => (isShown ? theme.backgroundColorMain : theme.backgroundColorSecondary)};
  transition: ${({ theme }) => theme.globals.timingFunctionMain};

  & .icon {
    transition: all ${({ theme }) => theme.globals.timingFnMui};
  }

  & .icon {
    transform: ${({ isShown }) => (isShown ? 'rotate(45deg)' : '')};
  }

  &:hover {
    background-color: ${({ theme }) => theme.backgroundColorMain};
  }

  &:active {
    background-color: ${({ theme }) => theme.backgroundColorMain};
  }
`;

export default TableActionsList;
