import { LangKeyEnum } from '../../lang';
import React, { useMemo } from 'react';
import { enumToFilterOptions } from '../../utils/fabrics';
import ButtonsGroup from './ButtonsGroup';

const LangButtonsGroup = ({ onChange, disabled }: { onChange?: (value: LangKeyEnum) => void; disabled?: boolean }) => {
  const options = useMemo(() => enumToFilterOptions(LangKeyEnum), []);

  return <ButtonsGroup disabled={disabled} options={options} onSelect={info => onChange && onChange(info.value)} />;
};

export default LangButtonsGroup;
