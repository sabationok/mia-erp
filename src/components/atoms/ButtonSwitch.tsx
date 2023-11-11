import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { t } from '../../lang';
import ButtonsGroup from './ButtonsGroup';

interface ButtonSwitchProps {
  acceptLabel?: string;
  rejectLabel?: string;
  onChange?: (res: boolean) => void;
  value?: boolean;
  name?: string;
}

const ButtonSwitch = ({ name = '', onChange, value = false, acceptLabel, rejectLabel }: ButtonSwitchProps) => {
  const [current, setCurrent] = useState(value);
  const handleChange = (index: number) => {
    if (onChange) {
      onChange(!!index);
    } else {
      setCurrent(!!index);
    }
  };

  const options = useMemo(
    () => [
      { value: false, label: t(rejectLabel || 'No') },
      { value: true, label: t(acceptLabel || 'Yes') },
    ],
    [acceptLabel, rejectLabel]
  );
  useEffect(() => {
    if (!_.isUndefined(value)) {
      setCurrent(value);
    }
  }, [value]);
  return <ButtonsGroup options={options} defaultIndex={current ? 1 : 0} onChangeIndex={handleChange} />;
};

export default ButtonSwitch;
