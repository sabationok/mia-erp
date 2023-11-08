import { memo, useMemo, useState } from 'react';
import _ from 'lodash';
import { t } from '../../lang';
import ButtonsGroup from './ButtonsGroup';

interface ButtonSwitchProps {
  acceptLabel?: string;
  rejectLabel?: string;
  onChange?: (res: boolean) => void;
  value?: boolean;
}

const ButtonSwitch = ({ onChange, value, acceptLabel, rejectLabel }: ButtonSwitchProps) => {
  const [current, setCurrent] = useState(false);
  const handleChange = (index: number) => {
    if (onChange) {
      onChange(!!index);
    } else {
      setCurrent(!!index);
    }
  };

  const defIndex = useMemo(() => ((_.isUndefined(value) ? current : value) ? 1 : 0), [current, value]);

  const options = useMemo(
    () => [
      { value: false, label: t(rejectLabel || 'No') },
      { value: true, label: t(acceptLabel || 'Yes') },
    ],
    [acceptLabel, rejectLabel]
  );

  return <ButtonsGroup options={options} defaultIndex={defIndex} onChangeIndex={handleChange} />;
};

export default memo(ButtonSwitch);
