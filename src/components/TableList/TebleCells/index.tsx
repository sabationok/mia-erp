import CellTextDbl from './CellTextDbl';
import Cell from './Cell';
import CellDateSimple from './CellDateSimple';
import CellStatus from './CellStatus';

export type CellActionsName = 'string' | 'cell' | 'cellDbl' | 'dateSimple' | 'dateDbl' | 'status';
type CellVarianType = {
  [key in CellActionsName]?: React.FC<any>;
};

export const CellsMap: CellVarianType = {
  cell: Cell,
  cellDbl: CellTextDbl,
  dateSimple: CellDateSimple,
  status: CellStatus,
  dateDbl: CellDateSimple,
};

// import CellCategory from './CellCategory';
// import CellStatusApprove from './CellStatusApprove';
// import CellStatusVisibility from './CellStatusVisibility';
// import CellStatusAvailability from './CellStatusAvailability';
// import CellStatusType from './CellStatusType';
// import CellNumber from './CellNumber';
// import CellTransactionDate from './CellTransactionDate';
// import CellDateDbl from './CellDateDbl';
// import CellDate from './CellDate';
// import CellStatus from './CellStatus';
// import CellCheckBox from './CellCheckBox';
// import CellActions from './CellActions';
// import CellTextNested from './CellTextNested';
// import CellNestedDbl from './CellNestedDbl';
// actions: CellActions,
// checkbox: CellCheckBox,
// transactionDate: CellTransactionDate,
// date: CellDate,
// dateDbl: CellDateDbl,
// category: CellCategory,
// approvedStatus: CellStatusApprove,
// visibilityStatus: CellStatusVisibility,
// availabilityStatus: CellStatusAvailability,
// typeStatus: CellStatusType,
// number: CellNumber,
// status: CellStatus,
// nestedDbl: CellNestedDbl,
// nested: CellTextNested,
