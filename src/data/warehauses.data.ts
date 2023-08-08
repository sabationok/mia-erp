import { CellTittleProps } from '../components/TableList/TebleCells/CellTitle';

export const warehousesTableColumnsForOrderCreateOrderSlotForm: CellTittleProps[] = [
  {
    top: { name: 'Склад' },
    bottom: { name: 'Номер' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: 'Залишок' },
    bottom: { name: 'Резерв' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: '' },
    width: '150px',
    action: 'valueByPath',
  },
  {
    top: { name: '' },
    width: '150px',
    action: 'valueByPath',
  },
];
