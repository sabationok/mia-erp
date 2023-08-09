import FlexBox from '../atoms/FlexBox';
import styled from 'styled-components';
import { useState } from 'react';

const columns = [
  { label: 'S', id: 'atr_1_1', width: '100px' },
  { label: 'M', id: 'atr_1_2', width: '100px' },
  { label: 'L', id: 'atr_1_3', width: '100px' },
  { label: 'XL', id: 'atr_1_4', width: '100px' },
];
const rows = [
  { label: 'gray', id: 'atr_2_1' },
  { label: 'blue', id: 'atr_2_2' },
  { label: 'red', id: 'atr_2_3' },
  { label: 'black', id: 'atr_2_4' },
];
const variation = {
  product_id: 123,
  product_name: 'Футболка з коротким рукавом',
  description: 'Красива футболка для літньої погоди',
  variations: {
    atr_2_1: {
      id: 'atr_2_1',
      atr_1_1: { id: 'atr_1_1', quantity: 6, reserved: 0 },
      atr_1_2: { id: 'atr_1_2', quantity: 5, reserved: 0 },
      atr_1_4: { id: 'atr_1_4', quantity: 12, reserved: 0 },
    },
    atr_2_2: {
      id: 'atr_2_2',
      atr_1_1: { id: 'atr_1_1', quantity: 12, reserved: 0 },
      atr_1_2: { id: 'atr_1_2', quantity: 25, reserved: 0 },
      atr_1_3: { id: 'atr_1_3', quantity: 5, reserved: 0 },
    },
  } as Record<string, Record<string, { quantity?: number; reserved?: number }>>,
};
interface TableVariationsState {
  atr_1?: { id?: string; label?: string };
  atr_2?: { id?: string; label?: string; quantity?: number; reserved?: number };
}
const TableVariations = () => {
  const [current, setCurrent] = useState<TableVariationsState>({});
  const isCellActive = (colId: string, rowId: string) => {
    return current?.atr_1?.id === colId && current?.atr_2?.id === rowId;
  };
  const isRowActive = (rowId: string) => current.atr_2?.id === rowId;
  return (
    <Table>
      <TableScroll overflow={'auto'}>
        <Head fxDirection={'row'} height={'40px'}>
          <HeadRow fxDirection={'row'}>
            <RowStickyCell borderColor={'#fff'} padding={'0 10px'}>
              {'Параметр'}
            </RowStickyCell>

            <HeadTitles fxDirection={'row'}>
              {columns.map((title, idx) => (
                <CellTitle key={`title-${title.label}`} width={title.width}>
                  {title.label || idx}
                </CellTitle>
              ))}
            </HeadTitles>
          </HeadRow>
        </Head>
        <Body>
          {rows.map(row => (
            <Row key={`row-${row.label}`} height={'40px'} fxDirection={'row'} isActive={isRowActive(row.id)}>
              <RowStickyCell padding={'4px 10px'}>{row.label}</RowStickyCell>
              <RowData fxDirection={'row'}>
                {columns.map(col => {
                  const data = variation.variations[row.id] ? variation.variations[row.id][col.id] : undefined;
                  return (
                    <Cell
                      key={`${col.id}-${row.id}`}
                      width={col.width}
                      isActive={isCellActive(col.id, row.id)}
                      onClick={() => {
                        setCurrent({
                          atr_1: col,
                          atr_2: { ...data, ...row },
                        });
                      }}
                    >
                      <span className={'quantity'}>{data ? data?.quantity || 0 : '-'}</span>
                      <span className={'reserved'}>{data ? data?.reserved || 0 : '-'}</span>
                    </Cell>
                  );
                })}
              </RowData>
            </Row>
          ))}
        </Body>
      </TableScroll>
    </Table>
  );
};
const Table = styled(FlexBox)`
  position: relative;
  overflow: hidden;
`;
const Head = styled(FlexBox)`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 15;
  font-weight: 600;
  text-transform: uppercase;
  background-color: ${({ theme }) => theme.tableHeaderBackground};
`;
const TableScroll = styled(FlexBox)`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 40px 1fr min-content;

  height: 100%;
  width: 100%;
  overflow: auto;
`;
const HeadRow = styled(FlexBox)`
  padding: 4px 0;
  background-color: inherit;
`;
const HeadTitles = styled(FlexBox)``;

const RowStickyCell = styled(FlexBox)<{ borderColor?: string; backgroundColor?: string }>`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 10;

  width: 150px;
  background-color: ${({ backgroundColor = 'inherit' }) => backgroundColor};
  border-right: 2px solid ${({ borderColor = 'inherit' }) => borderColor};

  font-weight: 700;
  text-transform: uppercase;
`;
const Body = styled(FlexBox)`
  position: relative;
`;
const CellTitle = styled(FlexBox)`
  padding: 0 10px;
  border-right: 2px solid #fff;

  font-weight: 700;
  text-transform: uppercase;
`;
const Row = styled(FlexBox)<{ isActive?: boolean }>`
  position: relative;

  border-top: 1px solid ${({ theme, isActive }) => (isActive ? theme.accentColor.light : 'transparent')};
  border-bottom: 1px solid ${({ theme, isActive }) => (isActive ? theme.accentColor.light : theme.modalBorderColor)};
  background-color: ${({ theme }) => theme.modalBackgroundColor};

  &:hover {
    background-color: ${({ theme }) => theme.tableRowBackgroundHover};
    z-index: 15;
    box-shadow: ${({ theme }) => theme.tableRowShadow};
  }
`;
const RowData = styled(FlexBox)`
  background-color: inherit;
`;

const Cell = styled(FlexBox)<{ isActive?: boolean }>`
  padding: 4px 10px;
  text-align: right;

  cursor: pointer;
  background-color: ${({ theme, isActive }) => (isActive ? theme.accentColor.light : 'inherit')};

  & .quantity {
    text-align: right;
  }

  & .reserved {
    text-align: right;
  }

  &:hover {
    z-index: 25;
    transform: scale(1.25);

    background-color: ${({ theme, isActive }) => (isActive ? theme.accentColor.light : 'inherit')};

    border-radius: 4px;
    box-shadow: ${({ theme }) => theme.tableRowShadow};
  }
`;
export default TableVariations;
