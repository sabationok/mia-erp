import { FilterOption } from './TabSelector';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { checks } from '../../utils';
import FlexBox from './FlexBox';
import CheckBox from '../TableList/TebleCells/CellComponents/CheckBox';
import { Text } from './Text';

export interface CheckboxesListOption<V = any> extends Partial<FilterOption<V>> {
  description?: string;
}

export type CheckboxesListOnChangeHandler = (ids: string[]) => void;

const CheckboxesListSelector = <Option = any, V = any>({
  options,
  onChangeIndex,
  currentIndex,
  currentOption,
  multiple,
  onChange,
  value,
  disabled,
  disabledCheck,
  renderLabel,
}: {
  onChangeIndex?: (index: number) => void;
  onChange?: CheckboxesListOnChangeHandler;
  options?: (Option & CheckboxesListOption<V>)[];
  currentIndex?: number;
  currentOption?: CheckboxesListOption<V>;
  value?: string[];
  multiple?: boolean;
  disabled?: boolean;
  renderLabel?:
    | null
    | ((info: { option: Option & CheckboxesListOption<V>; index: number; checked?: boolean }) => React.ReactNode);
  disabledCheck?: (option: Option & CheckboxesListOption<V>, index: number) => boolean;
}) => {
  const [current, setCurrent] = useState(0);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const handleSelect = useCallback(
    (id: string) => {
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
    },
    [multiple, onChange, selectedIds]
  );
  const handleSetCurrent = useCallback(
    (idx: number) => {
      if (onChangeIndex) {
        onChangeIndex(idx);
      } else {
        setCurrent(idx);
      }
    },
    [onChangeIndex]
  );

  const renderOptions = useMemo(() => {
    return options?.map((o, idx) => {
      const isDisabled = disabledCheck ? disabledCheck(o, idx) : disabled;

      return (
        <FlexBox
          key={`m-opt_${o.value}`}
          fxDirection={'row'}
          gap={8}
          padding={'2px 4px'}
          alignItems={'center'}
          style={{ opacity: isDisabled ? 0.7 : 1, pointerEvents: isDisabled ? 'none' : 'all' }}
          onClick={() => {
            if (isDisabled) return;
            handleSetCurrent(idx);
            o?._id && handleSelect(o?._id);
          }}
        >
          <CheckBox
            checked={(o?._id && selectedIds.includes(o?._id)) || idx === current}
            size={'22px'}
            disabled={isDisabled}
          />

          {renderLabel ? (
            renderLabel({
              option: o,
              index: idx,
              checked: (o?._id && selectedIds.includes(o?._id)) || idx === current,
            })
          ) : (
            <Text>{o?.label}</Text>
          )}
        </FlexBox>
      );
    });
  }, [current, disabled, disabledCheck, handleSelect, handleSetCurrent, options, renderLabel, selectedIds]);

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
      {renderOptions}
    </FlexBox>
  );
};

export default CheckboxesListSelector;
