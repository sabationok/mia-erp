import { LangKeyEnum } from '../../i18e';
import React from 'react';
import { enumToFilterOptions } from '../../utils';
import ButtonsGroup from './ButtonsGroup';

const langOptions = enumToFilterOptions(LangKeyEnum);
const LangButtonsGroup = ({
  onChange,
  disabled,
  value,
}: {
  value?: LangKeyEnum;
  onChange?: (value: LangKeyEnum) => void;
  disabled?: boolean;
}) => {
  return (
    <ButtonsGroup
      disabled={disabled}
      value={value}
      options={langOptions}
      onSelect={info => onChange && onChange(info.value)}
    />
  );
};

export default LangButtonsGroup;
