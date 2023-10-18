import { FilterOption } from '../ModalForm/ModalFilter';
import { useEffect, useState } from 'react';
import { checks } from '../../utils';
import FlexBox from './FlexBox';
import CheckBox from '../TableList/TebleCells/CellComponents/CheckBox';
import { Text } from './Text';

export interface CheckboxesListOption<V = any> extends Partial<FilterOption<V>> {
  description?: string;
}

export type CheckboxesListOnChangeHandler = (ids: string[]) => void;

const CheckboxesListSelector = <V = any,>({
  options,
  onChangeIndex,
  currentIndex,
  currentOption,
  multiple,
  onChange,
  value,
  disabled,
}: {
  onChangeIndex?: (index: number) => void;
  onChange?: CheckboxesListOnChangeHandler;
  options?: CheckboxesListOption<V>[];
  currentIndex?: number;
  currentOption?: CheckboxesListOption<V>;
  value?: string[];
  multiple?: boolean;
  disabled?: boolean;
}) => {
  const [current, setCurrent] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = (id: string) => {
    if (multiple) {
      setSelectedIds(p => {
        const newValue = selectedIds.includes(id) ? p.filter(el => el !== id) : [...p, id];
        onChange && onChange(newValue);
        return newValue;
      });
    } else {
      setSelectedIds([id]);
      onChange && onChange([id]);
    }
  };
  const handleSetCurrent = (idx: number) => {
    setCurrent(idx);
    onChangeIndex && onChangeIndex(idx);
  };

  useEffect(() => {
    if (!checks.isUnd(currentIndex)) {
      setCurrent(currentIndex);
    }
  }, [currentIndex]);

  useEffect(() => {
    if (multiple) return;
    if (!checks.isUnd(currentOption) && !checks.isUnd(options)) {
      setCurrent(options.findIndex(o => o?.value === currentOption?.value || o?._id === currentOption?._id));
    }
  }, [currentOption, multiple, options]);

  useEffect(() => {
    if (!multiple) return;
    if (!checks.isUnd(value) && checks.isArray(value)) {
      setSelectedIds(value);
    }
  }, [multiple, value]);
  return (
    <FlexBox fillWidth gap={8}>
      {options?.map((o, idx) => {
        return (
          <FlexBox
            key={`m-opt_${o.value}`}
            fxDirection={'row'}
            gap={8}
            padding={'2px 4px'}
            alignItems={'center'}
            style={{ opacity: disabled ? 0.7 : 1, pointerEvents: disabled ? 'none' : 'all' }}
            onClick={() => {
              if (disabled) return;
              handleSetCurrent(idx);
              o?._id && handleSelect(o?._id);
            }}
          >
            <CheckBox
              checked={(o?._id && selectedIds.includes(o?._id)) || idx === current}
              size={'22px'}
              disabled={disabled}
            />

            <Text>{o?.label}</Text>
          </FlexBox>
        );
      })}
    </FlexBox>
  );
};

export default CheckboxesListSelector;
