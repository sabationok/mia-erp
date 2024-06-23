import ButtonIcon from 'components/atoms/ButtonIcon';
import React, { useState } from 'react';
import styled from 'styled-components';
import FlexBox, { FlexLi } from '../../atoms/FlexBox';
import { TableSortOrderEnum, TableSortParam } from '../tableTypes.types';
import ModalBase from '../../atoms/Modal';
import { CreatedModal } from '../../../Providers/ModalProvider/ModalProvider';

export interface TableSortParamsListProps extends CreatedModal {
  sortParams?: TableSortParam[];
  current?: TableSortParam;
  sortOrder?: TableSortOrderEnum;
  onSelect: (param: TableSortParam, sortOrder: TableSortOrderEnum) => void;
  multiple?: boolean;
}
export const ModalSortLst: React.FC<TableSortParamsListProps & CreatedModal> = ({
  sortParams,
  onSelect,
  multiple,
  current,
  ...props
}) => {
  return (
    <ModalBase fitContentH fitContentV $hasFooter={false} title={'Сортування'} {...props}>
      <TableSortParamsList {...{ sortParams, onSelect, current, isOpen: true }} />
    </ModalBase>
  );
};
const TableSortParamsList: React.FC<TableSortParamsListProps> = ({ sortParams, sortOrder, onSelect, current }) => {
  const [state, setState] = useState<{ param?: TableSortParam; sortOrder?: TableSortOrderEnum }>({
    param: current,
    sortOrder,
  });

  function registerSelector(param: TableSortParam, sortOrder: TableSortOrderEnum) {
    return () => {
      onSelect && onSelect(param, sortOrder);

      setState({ param, sortOrder });
    };
  }

  function isActiveParam(param: TableSortParam) {
    return param.dataPath === state?.param?.dataPath;
  }
  function isActiveOrder(sortOrder: TableSortOrderEnum) {
    return state?.sortOrder === sortOrder;
  }

  return (
    <Box data-table-sort-close padding={'0 0 16px'}>
      <SelectList>
        {sortParams?.map(param => {
          const isActive = isActiveParam(param);
          return (
            <ListParam key={`sortItem-${param.dataKey || param.dataPath}`} isActive={isActive}>
              <ParamLabel>{param.label || param.label}</ParamLabel>

              <SetOrderButton
                className="button"
                isActive={isActive && isActiveOrder(TableSortOrderEnum.DESC)}
                variant="onlyIconNoEffects"
                size={'36px'}
                iconSize="90%"
                icon={'SmallArrowDown'}
                onClick={registerSelector(param, TableSortOrderEnum.DESC)}
              />

              <SetOrderButton
                className="button"
                isActive={isActive && isActiveOrder(TableSortOrderEnum.ASC)}
                variant="onlyIconNoEffects"
                size={'36px'}
                iconSize="90%"
                icon={'SmallArrowUp'}
                onClick={registerSelector(param, TableSortOrderEnum.ASC)}
              />
            </ListParam>
          );
        })}
      </SelectList>
    </Box>
  );
};

const Box = styled(FlexBox)`
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  height: max-content;

  overflow: auto;

  color: ${({ theme }) => theme.fontColorHeader};
  fill: ${({ theme }) => theme.fontColorHeader};

  background-color: ${({ theme }) => theme.modalBackgroundColor};
  box-shadow: ${({ theme }) => theme.globals.shadowMain};
  transition:
    all ${({ theme }) => theme.globals.timingFunctionMain},
    transform ${({ theme }) => theme.globals.timingFnMui};
`;
const SelectList = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: fit-content;
`;
const SetOrderButton = styled(ButtonIcon)<{ isActive: boolean }>`
  visibility: hidden;
  transition: none;
  fill: ${({ isActive, theme }) => (isActive ? theme.accentColor.base : theme.fontColorHeader)};
`;
const ListParam = styled(FlexLi)`
  flex-direction: row;
  align-items: center;

  position: relative;

  font-size: 14px;

  padding: 0 8px;

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
