import TableRow from './TableRows/TableRow';
import { useTable } from './TableList';

import styled from 'styled-components';

const TableBody: React.FC = () => {
  const { tableData, rowRef, onRowClick } = useTable();

  function handleOnRowClick(ev: React.MouseEvent<HTMLDivElement>) {
    if (!(ev instanceof MouseEvent)) return;
    const { target } = ev;
    let rowEl: any;

    if (target instanceof HTMLElement && !target.closest('[data-row]')) {
      rowRef?.current && rowRef.current.classList.remove('selected');
      return;
    }
    rowEl = target instanceof HTMLElement && target.closest('[data-row]');

    if (onRowClick instanceof Function) {
      let rowData = tableData?.find(el => el?._id === rowEl?.id);

      onRowClick({ ev, _id: rowEl?.id, data: rowData });
    }

    if (!rowRef?.current) {
      if (rowRef?.current) rowRef.current = rowEl;
      rowRef?.current?.classList.add('selected');
      return;
    }

    if (rowEl !== rowRef.current) {
      rowRef.current.classList.remove('selected');
      rowRef.current = rowEl;
    }

    rowRef?.current?.classList.toggle('selected');
  }

  return (
    <TBody onClick={handleOnRowClick}>
      {tableData?.map((rowData, idx) => {
        return <TableRow key={idx} {...{ rowData, idx }} />;
      })}
    </TBody>
  );
};

const TBody = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: min-content;
  align-content: start;

  min-width: 100%;

  position: relative;
  & .selected {
    background-color: var(--ligthOrange);

    &:hover {
      background-color: var(--ligthOrange);
    }
  }
`;

export default TableBody;

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
