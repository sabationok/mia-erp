import ButtonIcon from 'components/ButtonIcon/ButtonIcon';

import s from './RowActions.module.scss';

const RowActionItem = ({ title, onClick, iconId = '' }) => {
  return (
    <div className={s.listItem}>
      {title && <span className={s.actionTitle}>{title}</span>}
      <ButtonIcon size="100%" iconSize="80%" iconId={iconId} className={s.actionsBtn} onClick={onClick} />
    </div>
  );
};

export default RowActionItem;
