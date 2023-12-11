import CellTextDbl from './CellTextDbl';
import Cell from './Cell';
import CellDateSimple from './CellDateSimple';
import CellStatus from './CellStatus';
import CellContactsDbl from './CellContacts';
import CellTags from './CellTags';
import CellValueByPath from './CellValueByPath';
import CellTextDblAndAvatar from './CellTextDblAndAvatar';
import CellNumberWithSpaces from './CellNumberWithSpaces';
import CellTextAndAvatar from './CellTextAndAvatar';
import CellText from './CellText';

export const CellsMap = {
  cell: Cell,
  text: CellText,
  valueByPath: CellValueByPath,
  cellDbl: CellTextDbl,
  status: CellStatus,
  dateSimple: CellDateSimple,
  dateDbl: CellDateSimple,
  contacts: CellContactsDbl,
  tags: CellTags,
  doubleDataWithAvatar: CellTextDblAndAvatar,
  dataWithAvatar: CellTextAndAvatar,
  numberWithSpaces: CellNumberWithSpaces,
};

export type CellActionsName = keyof typeof CellsMap;
