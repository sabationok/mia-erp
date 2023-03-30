import React from 'react';
import TableFilter from './TableFilter/TableFilter';
import styled from 'styled-components';
import { useTable } from './TableList';
import TableActions from './TableActions/TableActions';
import DeviceConrol from 'components/atoms/DeviceTypeInformer/DeviceTypeController';

const TableOverHead: React.FC = () => {
  const { tableActions } = useTable();
  return (
    <OverHead>
      <TableFilter />

      <DeviceConrol.MinDesktop>
        <TableActions {...tableActions} />
      </DeviceConrol.MinDesktop>
    </OverHead>
  );
};

const OverHead = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 8px;
  @media screen and (min-width: 480px) {
    padding: 20px 8px 16px;
  }
`;
export default TableOverHead;
