import React from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useSideBar } from '../SideBarProvider';
import styled from 'styled-components';

const ActionToggleSideBar: React.FC = () => {
  const { isOpen, onTogglerClick } = useSideBar();

  return (
    <StButton icon={isOpen ? 'burgerOpen' : 'burger'} iconSize="28px" variant="defNoEffects" onClick={onTogglerClick} />
  );
};
const StButton = styled(ButtonIcon)`
  max-height: 100%;
  width: 100%;
  height: 100%;
`;

export default ActionToggleSideBar;
