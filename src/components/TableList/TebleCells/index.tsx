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
import CellPrices from './CellPrices';

export const CellsMap = {
  cell: Cell,
  text: CellText,
  textDbl: CellTextDbl,
  valueByPath: CellValueByPath,
  status: CellStatus,
  dateSimple: CellDateSimple,
  dateDbl: CellDateSimple,
  contacts: CellContactsDbl,
  tags: CellTags,
  doubleDataWithAvatar: CellTextDblAndAvatar,
  dataWithAvatar: CellTextAndAvatar,
  numberWithSpaces: CellNumberWithSpaces,
  prices: CellPrices,
};

export type CellActionsName = keyof typeof CellsMap;
