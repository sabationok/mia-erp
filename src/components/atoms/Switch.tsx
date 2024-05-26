import React, { memo, useEffect, useState } from 'react';
import styled from 'styled-components';
import { OnCheckBoxChangeHandler } from '../TableList/tableTypes.types';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import { isUndefined } from 'lodash';

type Props = {
  checked?: boolean;
  onChange?: OnCheckBoxChangeHandler;
  mr?: number;
  disabled?: boolean;
  size?: string;
};

function Switch({ checked, onChange, mr, disabled = false, size = '20px' }: Props) {
  const [isChecked, setIsChecked] = useState<boolean>(checked ?? false);

  const onSwitchPress = () => {
    if (onChange) {
      onChange({ checked: !isChecked });
    } else {
      setIsChecked(p => !p);
    }
  };

  useEffect(() => {
    setIsChecked(disabled ? false : checked ?? false);
  }, [checked, disabled]);

  useEffect(() => {
    if (!isUndefined(checked)) {
      setIsChecked(checked);
    }
  }, [checked]);

  return (
    <StSwitch
      variant={'onlyIconNoEffects'}
      onClick={onSwitchPress}
      icon={isChecked ? 'lightMode' : 'darkMode'}
      size={size}
      iconSize={'90%'}
      isActive={isChecked}
    />
  );
}

const StSwitch = styled(ButtonIcon)<{
  disabled?: boolean;
}>`
  fill: ${({ isActive, theme }) => (isActive ? '' : theme.modalBorderColor)};

  opacity: ${({ disabled }) => (disabled ? '70%' : 1)};
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'all')};
`;
export default memo(Switch);
