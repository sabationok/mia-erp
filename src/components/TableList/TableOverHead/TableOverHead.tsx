import React from 'react';

import styled from 'styled-components';
import { useTable } from '../TableList';
import TableSearchForm from './TableSearchForm/TableSearchForm';
import TActions from '../TableActions';
import TableFilter from '../TableFilter';
import DeviceControl from 'components/atoms/DeviceTypeInformer/DeviceTypeController';
import FlexBox from '../../atoms/FlexBox';

const TableOverHead: React.FC<React.HTMLAttributes<HTMLDivElement>> = props => {
  const {
    quickActionsPosition,
    quickActionsDirection,
    actionsCreator,
    isFilter,
    onSubmitSearch,
    tableSearchParams,
    isSearch = true,
  } = useTable();

  const actions = (
    <ActionsBox
      className={'rightSide'}
      style={{ padding: !isFilter && !isFilter && !actionsCreator ? '0' : '4px 8px' }}
    >
      <FlexBox
        fxDirection={quickActionsDirection === 'row-reverse' ? 'row-reverse' : 'row'}
        margin={'0 0 0 auto'}
        gap={12}
        style={{ justifySelf: 'flex-end' }}
      >
        {isFilter && <TableFilter />}

        {isFilter && actionsCreator && <Separator />}

        {actionsCreator && <TActions renderSeparator={<Separator />} />}
      </FlexBox>
    </ActionsBox>
  );

  return (
    <OverHead className="tOverHead" {...props} fxDirection={'row'} flexWrap={'wrap'}>
      <LeftSide className={'leftSide'} style={{ padding: isSearch ? '4px 8px' : '0' }}>
        {isSearch && <TableSearchForm {...{ tableSearchParams }} onSubmit={onSubmitSearch} />}
      </LeftSide>

      {quickActionsPosition === 'top' ? actions : <DeviceControl.MinDesktop>{actions}</DeviceControl.MinDesktop>}
    </OverHead>
  );
};

const OverHead = styled(FlexBox)`
  justify-content: space-between;

  gap: 8px;

  position: relative;
  overflow: hidden;
  z-index: 50;

  width: 100%;

  transform-origin: right;
  //background-color: ${({ theme }) => theme.tableBackgroundColor};
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
const LeftSide = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* overflow: hidden; */
`;
const ActionsBox = styled(FlexBox)`
  //flex-direction: row-reverse;
  align-self: flex-end;
  //justify-self: flex-end;
  //justify-content: flex-end;
  max-width: 100%;

  align-items: center;
  gap: 8px;

  margin-left: auto;

  overflow: auto;

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  ::-webkit-scrollbar-button {
    height: 0;
    width: 0;
    overflow: hidden;
  }
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
