import React from 'react';

import styled from 'styled-components';
import { useTable } from '../TableList';
import TableActions from './TableActions/TableActions';
import DeviceConrol from 'components/atoms/DeviceTypeInformer/DeviceTypeController';
import TableSearchForm from './TableSearchForm/TableSearchForm';

const TableOverHead: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  const { tableActions, tableSearchParams, isSearch = true } = useTable();
  

  return (
    <OverHead className='tOverHead' {...props}>
      <LeftSide className='leftSide'>
        {isSearch && <TableSearchForm {...{ tableSearchParams }} />}
      </LeftSide>

      <DeviceConrol.MinDesktop>
        <RightSide className='rightSide'>
          {tableActions && <TableActions {...tableActions} />}
        </RightSide>
      </DeviceConrol.MinDesktop>
    </OverHead>
  );
};

const OverHead = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-between;

  gap: 8px;

  position: relative;
  z-index: 50;

  width: 100%;
  padding: 8px;
  @media screen and (max-height: 480px) {
    padding: 8px;
  }
  @media screen and (min-height: 280px) and (min-width: 480px) {
    grid-template-columns: 1fr min-content;
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

  /* overflow: hidden; */
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
