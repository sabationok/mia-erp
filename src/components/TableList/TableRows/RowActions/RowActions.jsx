import React, { useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useRow } from '../TableRow';
import RowActionItem from './RowActionItem';

import s from './RowActions.module.scss';

const baseRoutes = {
  '/products': 'product',
  '/refunds': 'refund',
  '/orders': 'order',
};

const RowActions = () => {
  const location = useLocation();
  const { isActionsOpen, handleToggleActions, rowData } = useRow();
  const pathRef = useRef(`${location.pathname}/${rowData._id}/${baseRoutes[location.pathname]}`);
  const linkRef = useRef(`${window.location.origin}/counter-app-ts${pathRef.current}`);
  const navigate = useNavigate();

  function navigateById() {
    navigate(pathRef.current);
  }

  async function copyLink() {
    await navigator.clipboard.writeText(linkRef.current);

    toast.info(`Посилання скопійоване до буферу обміну`);
  }

  async function handleShareBtnClick() {
    const shareData = {
      title: `Поділитись`,
      text: `Прошу переглянути`,
      url: linkRef.current,
    };
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log(err);
      toast.error(`Помилка: ${err}`);
    }
  }

  const rowActionArr = [
    { title: null, onClick: handleToggleActions, iconId: 'close' },
    { title: 'Поділитись', onClick: handleShareBtnClick, iconId: 'share' },
    { title: 'Посилання', onClick: copyLink, iconId: 'link' },
    { title: 'Показати деталі', onClick: navigateById, iconId: 'openInNew' },
  ];

  return (
    <div className={[isActionsOpen ? s.rowActionsVisible : s.rowActions, 'listRowActions'].join(' ')}>
      {rowActionArr.map(item => (
        <RowActionItem key={item.iconId} {...item} />
      ))}
    </div>
  );
};

export default RowActions;
