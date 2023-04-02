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
  const { tableActions, useFilterSelectors, tableSearchParams, tableSortParams } = useTable();
  return (
    <OverHead>
      <LeftSide>
        <TabelSearch {...{ tableSearchParams }} />
      </LeftSide>

      <RightSide>
        <TableSort {...{ tableSortParams }} />

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
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-between;

  gap: 8px;

  position: relative;
  z-index: 10;

  width: 100%;
  padding: 8px;
  @media screen and (max-height: 480px) {
    padding: 8px;
  }
  @media screen and (min-height: 280px) {
    grid-template-columns: 1fr max-content;
  }
  @media screen and (min-width: 480px) and (min-height: 480px) {
    padding: 20px 8px 16px;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  overflow: hidden;
`;
const RightSide = styled.div`
  align-self: flex-end;

  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 8px;

  /* overflow: hidden; */
`;

export default TableOverHead;
