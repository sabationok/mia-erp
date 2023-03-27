import React from 'react';
import { useRow } from '../../TableRows/RowContext';
import DateInfo from '../CellComponents/DateComp';

import s from './TableCells.module.scss';

const CellDateDbl = ({ title, className }) => {
  const { rowData } = useRow();

  const content = rowData[title?.dataKey];
  const actionClassName = content ? s[title?.action] : s.empty;
  const classNames = [s.coll, s.collDate, actionClassName, className].join(' ');

  return (
    <div className={classNames}>
      <DateInfo dateInfo={rowData?.createdAt} />

      <DateInfo dateInfo={rowData?.updatedAt} />
    </div>
  );
};

export default CellDateDbl;
