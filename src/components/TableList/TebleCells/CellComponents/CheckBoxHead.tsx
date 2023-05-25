import { useState } from 'react';
import CheckBox, {
  CustomCheckboxEvent,
  CustomCheckboxEventHandler,
} from './CheckBox';

export interface CheckBoxHeadProps {
  onChange?: CustomCheckboxEventHandler;
}

const CheckBoxHead: React.FC<CheckBoxHeadProps> = ({ onChange }) => {
  // const [status, setStatus] = useState<'avery' | 'some' | 'none'>();
  const [some, setSome] = useState(false);
  const [everyOn, setEveryOn] = useState(false);

  // const [everyOff, setEveryOff] = useState(true);

  function handleChange({ checked, event }: CustomCheckboxEvent) {
    onChange && onChange({ checked, event });

    setSome(false);

    setEveryOn(prev => !prev);

    // setEveryOff(prev => !prev);
  }

  return (
    <CheckBox
      onChange={handleChange}
      checked={some ? false : everyOn}
      icon={some ? 'checkBoxMinus' : undefined}
    />
  );
};

export default CheckBoxHead;

// iconId={(everyOn && iconId.checkBoxOn) || (some && iconId.checkBoxMinus) || (everyOff && iconId.checkBoxOff)}
