import CellTextDbl from './CellTextDbl';
import Cell from './Cell';
import CellDateSimple from './CellDateSimple';
import CellStatus from './CellStatus';
import CellContactsDbl from './CellContacts';
import CellTags from './CellTags';
import CellValueByPath from './CellValueByPath';
import CellTextDblAndAvatar from './CellTextDblAndAvatar';

export const CellsMap = {
  cell: Cell,
  cellDbl: CellTextDbl,
  dateSimple: CellDateSimple,
  status: CellStatus,
  dateDbl: CellDateSimple,
  contacts: CellContactsDbl,
  tags: CellTags,
  valueByPath: CellValueByPath,
  doubleDataWithAvatar: CellTextDblAndAvatar,
};

export type CellActionsName = keyof typeof CellsMap;
