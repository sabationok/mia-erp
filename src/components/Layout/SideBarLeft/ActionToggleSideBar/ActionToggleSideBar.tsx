import React from 'react';
import ButtonIcon from 'components/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import { useSideBar } from '../SideBarProvider';

const ActionToggleSideBar: React.FC = () => {
  const { isOpen, onTogglerClick } = useSideBar();

  return (
    <ButtonIcon
      iconId={isOpen ? iconId.burgerOpen : iconId.burger}
      style={{ width: '100%', height: '28px' }}
      iconSize="80%"
      variant="def"
      onClick={onTogglerClick}
    />
  );
};

export default ActionToggleSideBar;
