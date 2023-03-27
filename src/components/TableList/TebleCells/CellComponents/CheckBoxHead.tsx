import { useTable } from 'components/TableList/TableList';
import { iconId } from 'data';
import { useState, useEffect } from 'react';
import CheckBox from './CheckBox';

export interface CheckBoxHeadProps {
  onChange: React.ChangeEventHandler;
}

const CheckBoxHead: React.FC<CheckBoxHeadProps> = ({ onChange }) => {
  const { tableData } = useTable();
  const [status, setStatus] = useState<'avery' | 'some' | 'none'>();
  const [some, setSome] = useState(false);
  const [everyOn, setEveryOn] = useState(false);
  const [everyOff, setEveryOff] = useState(true);
  // const [currentIconId, setCurrentIconId] = useState('');

  // const statusMap = {
  //   checkBoxOn: 'checkBoxOn',
  //   checkBoxOff: 'checkBoxOff',
  //   checkBoxMinus: 'checkBoxMinus',
  // };

  function handleChange(ev: React.ChangeEvent) {
    onChange(ev);

    setSome(false);

    setEveryOn(!everyOn);

    setEveryOff(!everyOff);
  }

  useEffect(() => {
    setStatus(status);

    // let some, everyOn;

    // some = tableData?.some(item => item?.selected);

    // if (some) {
    //   setCurrentIconId(iconId.checkBoxMinus);
    //   return;
    // }
    // everyOn = tableData?.every(item => item?.selected);

    // if (everyOn) {
    //   setCurrentIconId(iconId.checkBoxOn);
    //   return;
    // }

    // setCurrentIconId(some ? iconId.checkBoxMinus : everyOn ? iconId.checkBoxOn : iconId.checkBoxOff);
  }, [everyOff, everyOn, some, status, tableData]);

  return (
    <CheckBox
      onChange={handleChange}
      icon={some ? iconId.checkBoxMinus : everyOn ? iconId.checkBoxOn : everyOff ? iconId.checkBoxOff : ''}
    />
  );
};

export default CheckBoxHead;

// iconId={(everyOn && iconId.checkBoxOn) || (some && iconId.checkBoxMinus) || (everyOff && iconId.checkBoxOff)}
