import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { t } from '../../lang';
import ButtonsGroup from './ButtonsGroup';

interface ButtonSwitchProps<Name extends string | number | symbol = string> {
  acceptLabel?: string;
  rejectLabel?: string;
  onChange?: (res: boolean, name?: Name) => void;
  value?: boolean;
  name?: Name;
}

const ButtonSwitch = <Name extends string | number | symbol = string>({
  name,
  onChange,
  value = false,
  acceptLabel,
  rejectLabel,
}: ButtonSwitchProps<Name>) => {
  const [current, setCurrent] = useState(value);
  const handleChange = (index: number) => {
    if (onChange) {
      onChange(!!index, name);
    } else {
      setCurrent(!!index);
    }
  };

  const options = useMemo(
    () => [
      { value: false, label: t(rejectLabel ?? 'No') },
      { value: true, label: t(acceptLabel ?? 'Yes') },
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
