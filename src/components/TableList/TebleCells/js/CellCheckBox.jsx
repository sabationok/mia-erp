import { useState } from 'react';
import { useTable } from '../../TableList';

import { useRow } from '../../TableRows/RowContext';
import CheckBox from '../CellComponents/CheckBox';
import s from './TableCells.module.scss';

const CellCheckBox = ({ title, idx, className }) => {
  const { rowData } = useRow();
  const { selectedRows = [], onSelectRow, onUnselectRow } = useTable();
  const classNames = [s.checkboxColl, className].join(' ');
  const [isSelectedRow, setIsSelectedRow] = useState(false);

  function onChange(ev) {
    const selectedRow = selectedRows.find(el => el?._id === rowData?._id);

    if (selectedRow) {
      setIsSelectedRow(false);
      onUnselectRow({ ev, rowData });
      return;
    }
    setIsSelectedRow(true);
    onSelectRow({ ev, rowData });
  }

  return (
    <div className={classNames}>
      <CheckBox id={rowData._id} onChange={onChange} checked={isSelectedRow} />
    </div>
  );
};

export default CellCheckBox;
