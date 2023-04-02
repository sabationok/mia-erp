import React from 'react';
import TableFilter from './TableFilter';
import styled from 'styled-components';
import { useTable } from '../TableList';
import TableActions from './TableActions/TableActions';
import DeviceConrol from 'components/atoms/DeviceTypeInformer/DeviceTypeController';
import TabelSearch from './TableSearch/TabelSearch';
import TableSort from './TableSortComp/TableSort';
import TablePagination from './TablePagination';

const TableOverHead: React.FC = () => {
  const { tableActions, useFilterSelectors, tableSearchParams } = useTable();
  return (
    <OverHead>
      <LeftSide>
        <TabelSearch {...{ tableSearchParams }} />
      </LeftSide>

      <RightSide>
        <TableSort tableSortParams={tableSearchParams} />

        <TablePagination />

        <TableFilter
          {...{ title: 'Фільтрація транзакцій' }}
          useFilterSelectors={useFilterSelectors ? useFilterSelectors : () => []}
        />

        <DeviceConrol.MinDesktop>
          <TableActions {...tableActions} />
        </DeviceConrol.MinDesktop>
      </RightSide>
    </OverHead>
  );
};

const OverHead = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  gap: 8px;

  position: relative;
  z-index: 10;

  width: 100%;
  padding: 8px;
  @media screen and (min-width: 480px) {
    padding: 20px 8px 16px;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const LeftSide = styled.div``;
const RightSide = styled.div`
  align-self: flex-end;

  display: flex;
  justify-content: flex-end;
  gap: 8px;
`;

export default TableOverHead;
