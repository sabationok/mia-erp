import React from 'react';

import styled from 'styled-components';
import { useTable } from '../TableList';
import DeviceControl from 'components/atoms/DeviceTypeInformer/DeviceTypeController';
import TableSearchForm from './TableSearchForm/TableSearchForm';
import TActions from '../TableActions';
import TableFilter from '../TableFilter';
import FlexBox from '../../atoms/FlexBox';

const TableOverHead: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  const { actionsCreator, isFilter, tableSearchParams, isSearch = true } = useTable();

  return (
    <OverHead className="tOverHead" {...props}>
      <LeftSide className={'leftSide'} padding={isSearch ? '4px 8px' : '0'}>
        {isSearch && <TableSearchForm {...{ tableSearchParams }} />}
      </LeftSide>

      <DeviceControl.MinDesktop>
        <RightSide className={'rightSide'} padding={!isFilter && !isFilter && !actionsCreator ? '0' : '4px 8px'}>
          {isFilter && <TableFilter />}

          {isFilter && actionsCreator && <Separator />}

          {actionsCreator && <TActions renderSeparator={<Separator />} />}
        </RightSide>
      </DeviceControl.MinDesktop>
    </OverHead>
  );
};

const OverHead = styled.div<{ padding?: string }>`
  display: grid;
  grid-template-columns: 1fr;
  justify-content: space-between;

  gap: 8px;
  padding: ${({ padding = '0' }) => padding};

  position: relative;
  z-index: 50;

  width: 100%;

  background-color: ${({ theme }) => theme.tableBackgroundColor};
  @media screen and (max-height: 480px) {
    //padding: 8px;
  }
  @media screen and (min-height: 280px) and (min-width: 480px) {
    grid-template-columns: 1fr min-content;
  }
  @media screen and (min-width: 480px) and (min-height: 480px) {
    //padding: 20px 8px 16px;
  }
  @media screen and (min-width: 768px) {
    flex-direction: row;
  }
`;
const LeftSide = styled(FlexBox)`
  align-items: center;
  justify-content: space-between;

  /* overflow: hidden; */
`;
const RightSide = styled(FlexBox)`
  align-self: flex-end;

  justify-content: flex-end;
  align-items: center;
  gap: 8px;

  /* overflow: hidden; */
`;
const Separator = styled.div`
  position: relative;

  align-self: stretch;

  min-height: 100%;

  margin: 0 5px;

  &::before {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    height: 100%;
    width: 1px;
    border-right: 2px solid ${({ theme }) => theme.tableHeaderStroke};
  }
`;

export default TableOverHead;
