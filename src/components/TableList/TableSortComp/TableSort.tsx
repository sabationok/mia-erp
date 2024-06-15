import React, { useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon';
import { ModalSortLst } from './TableSortParamsList';
import styled from 'styled-components';
import { ITableListProps } from 'components/TableList/TableList';
import { useModalProvider } from '../../../Providers/ModalProvider/ModalProvider';
import { TableSortOrderEnum, TableSortParam } from '../tableTypes.types';
import FlexBox from '../../atoms/FlexBox';

export interface TableSortProps {
  sortParams?: TableSortParam[];
  sortOrder?: TableSortOrderEnum;
  onSelect?: ITableListProps['onTableSortChange'];
}

const TableSort: React.FC<TableSortProps> = ({ sortParams, sortOrder, onSelect }) => {
  const modals = useModalProvider();
  const [state, setState] = useState<{ param?: TableSortParam; sortOrder?: TableSortOrderEnum }>({});

  function handleSelect(param: TableSortParam, sortOrder: TableSortProps['sortOrder']) {
    setState({ param, sortOrder });
    sortOrder && onSelect && onSelect(param, sortOrder);
  }
  function onOpenClick() {
    modals.create(ModalSortLst, {
      sortParams,
      current: state.param,
      sortOrder: state.sortOrder,
      onSelect: handleSelect,
    });
  }

  return (
    <Box padding={'4px 0'}>
      <StButton
        sortOrder={state?.sortOrder}
        variant="def"
        endIconSize="26px"
        endIconId="SmallArrowDown"
        onClick={onOpenClick}
        data-table-sort-open
      >
        <span title={state?.param?.label || ''} style={{ textAlign: 'start' }}>
          {state?.param?.label || 'Оберіть параметр'}
        </span>
      </StButton>
    </Box>
  );
};

const Box = styled(FlexBox)`
  display: flex;
  align-items: center;
  gap: 8px;

  //max-width: 150px;
  //min-width: 250px;
  width: 200px;
`;

const StButton = styled(ButtonIcon)<TableSortProps>`
  height: 100%;
  max-width: 100%;
  width: 100%;

  padding: 0 8px;

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

export default TableSort;
