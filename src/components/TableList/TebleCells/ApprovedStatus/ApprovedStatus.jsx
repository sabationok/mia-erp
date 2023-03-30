import React from 'react';
import SvgIcon from 'components/atoms/SvgIcon/SvgIcon';

import s from './ApprovedStatus.module.scss';
const ApprovedStatus = ({ status = 'success' }) => {
  const className = [s.statusBox, s[status]].join(' ');

  const text = {
    success: 'Прийнято',
    pending: 'Очікує',
    rejected: 'Відхилено',
  };
  const iconId = {
    success: 'success',
    pending: 'time',
    rejected: 'error',
  };
  return (
    <div className={className}>
      <SvgIcon iconId={iconId[status]} size="18px" />
      <span>{text[status]}</span>
    </div>
  );
};

export default ApprovedStatus;
