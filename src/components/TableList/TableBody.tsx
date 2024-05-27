import TableRow from './TableRows/TableRow';
import { useTable } from './TableList';

import styled from 'styled-components';
import { forwardRef, useMemo } from 'react';
import { IBase } from '../../redux/app-redux.types';

const TableBody: React.ForwardRefRenderFunction<any, any> = (props, ref) => {
  const { tableData, rowRef, selectedRow, onRowClick, selectedRows = [] } = useTable();

  const handleOnRowClick = (ev: React.MouseEvent<HTMLDivElement>) => {
    if (!rowRef) return;
    let rowEl: any;
    const { target } = ev;

    if (target instanceof HTMLElement && !target.closest('[data-row]')) {
      rowRef?.current && rowRef.current.classList.remove('selected');
      // onRowClick instanceof Function && onRowClick();
      return;
    }
    rowEl = target instanceof HTMLElement ? target.closest('[data-row]') : null;

    if (rowEl && onRowClick instanceof Function) {
      // onRowClick({ _id: rowEl?.id?.replace('_', '') });
    }
    if (rowEl !== rowRef.current) {
      rowRef.current?.classList.remove('selected');
      rowRef.current = rowEl;
      rowRef?.current?.classList.add('selected');
      return;
    }
    if (rowEl === rowRef.current) {
      rowRef.current?.classList.remove('selected');
      rowRef.current = undefined;
      // onRowClick instanceof Function && onRowClick();
    }
  };

  const renderRows = useMemo(
    () =>
      tableData?.map((rowData, idx) => {
        return (
          <TableRow
            key={idx}
            {...{
              rowData,
              idx,
              checked: selectedRows?.includes(rowData._id),
              isActive: (selectedRow as IBase)?._id === rowData?._id,
              onPress: () => onRowClick && onRowClick({ _id: rowData?._id, rowData }),
            }}
          />
        );
      }),
    [onRowClick, selectedRow, selectedRows, tableData]
  );

  return <TBody onClick={handleOnRowClick}>{renderRows}</TBody>;
};

const TBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  align-content: start;

  min-width: 100%;

  position: relative;

  background-color: ${p => p.theme.backgroundColorLight};

  & .selected {
    background-color: ${({ theme }) => theme.tableRowBackgroundActive};

    &:hover {
      background-color: ${({ theme }) => theme.tableRowBackgroundHover};
    }
  }
`;

export default forwardRef(TableBody);

// {/* <TableRow {...{ rowData: tableData[0] }} /> */}

// {/* {tableData.map((rowData, idx) => {
//   return <TableRow key={idx} {...{ rowData, idx }} />;
// })}

// {tableData.map((rowData, idx) => {
//   return <TableRow key={idx} {...{ rowData, idx }} />;
// })}

// {tableData.map((rowData, idx) => {
//   return <TableRow key={idx} {...{ rowData, idx }} />;
// })}

// {tableData.map((rowData, idx) => {
//   return <TableRow key={idx} {...{ rowData, idx }} />;
// })}

// {tableData.map((rowData, idx) => {
//   return <TableRow key={idx} {...{ rowData, idx }} />;
// })}

// {tableData.map((rowData, idx) => {
//   return <TableRow key={idx} {...{ rowData, idx }} />;
// })} */}
