import { useEffect, useMemo, useState } from 'react';
import _ from 'lodash';
import { t } from '../../i18e';
import ButtonsGroup from './ButtonsGroup';
import { MaybeNull } from '../../types/utils.types';

export type ButtonSwitchChangeHandler<Name extends string | number = string> = (res: boolean, name?: Name) => void;
interface ButtonSwitchProps<Name extends string | number = string> {
  acceptLabel?: string;
  rejectLabel?: string;
  onChange?: ButtonSwitchChangeHandler<Name>;
  value?: MaybeNull<boolean>;
  name?: Name;
  disabled?: boolean;
}

const ButtonSwitch = <Name extends string | number = string>({
  name,
  onChange,
  value = false,
  acceptLabel,
  rejectLabel,
  disabled,
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
      { value: false, label: rejectLabel ?? t('No') },
      { value: true, label: acceptLabel ?? t('Yes') },
    ],
    [acceptLabel, rejectLabel]
  );

  useEffect(() => {
    if (!_.isUndefined(value)) {
      setCurrent(value);
    }
  }, [value]);

  return <ButtonsGroup options={options} disabled={disabled} value={current} onChangeIndex={handleChange} />;
};

export default ButtonSwitch;
