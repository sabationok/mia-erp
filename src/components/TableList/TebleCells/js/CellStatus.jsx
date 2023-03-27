import React from 'react';
import { useRow } from '../../TableRows/RowContext';
import Status from '../CellComponents/StatusComp';

import s from './TableCells.module.scss';
const CellStatus = ({ title, idx, className, onClick }) => {
  const { rowData } = useRow();
  const content = rowData[title?.action] || '---';
  const actionClassName = content !== '---' ? s[title?.action] : s.empty;
  const classNames = [s.coll, actionClassName, className].join(' ');
  // console.log(rowData?.orderStatus);
  return (
    <div className={classNames} onClick={onClick}>
      <Status status={rowData[title?.dataKey]} />
    </div>
  );
};

export default CellStatus;
