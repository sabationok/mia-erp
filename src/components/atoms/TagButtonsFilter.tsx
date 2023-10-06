import {
  FilterChangeHandler,
  FilterOption,
  FilterSelectHandler,
  FilterSelectValueHandler,
} from '../ModalForm/ModalFilter';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ButtonIcon from './ButtonIcon/ButtonIcon';
import { checks } from '../../utils';
import FlexBox from './FlexBox';
import { t } from '../../lang';

const TagButtonsFilter = <Value extends string | number = any>({
  options,
  multiple,
  values,
  numColumns,
  gap,
  name = 'filter',
  onSelect,
  onChange,
  onSelectValue,
}: {
  options?: FilterOption<Value>[];
  values?: Value[];
  onSelect?: FilterSelectHandler<Value>;
  onSelectValue?: FilterSelectValueHandler<Value>;
  onChange?: FilterChangeHandler<Value>;
  multiple?: boolean;
  numColumns?: number;
  gap?: number;
  name?: string;
}) => {
  const [selectedValues, setSelectedValues] = useState<Value[]>([]);

  const handleSelect = useCallback(
    (option: FilterOption<Value>, index: number) => {
      setSelectedValues(prev => {
        if (!multiple) {
          onSelect && onSelect(option, option.value, index);
          onSelectValue && onSelectValue(name, option.value);
          return [option.value];
        }

        const newData = !prev.includes(option.value) ? [...prev, option.value] : prev.filter(el => el !== option.value);
        onChange && onChange(newData, name);
        return newData;
      });
    },
    [multiple, name, onChange, onSelect, onSelectValue]
  );

  const renderFilter = useMemo(() => {
    return options?.map((opt, index) => {
      const isActive = selectedValues.includes(opt.value);
      return (
        <ButtonIcon
          isActive={isActive}
          key={`f-opt_${opt.value}`}
          variant={isActive ? 'filledSmall' : 'outlinedSmall'}
          onClick={() => handleSelect(opt, index)}
        >
          {checks.isStr(opt.value) ? t(opt.value) : opt.value}
        </ButtonIcon>
      );
    });
  }, [handleSelect, options, selectedValues]);

  useEffect(() => {
    if (checks.isArray(values)) {
      setSelectedValues(values);
    }
  }, [values]);

  return (
    <FlexBox
      fillWidth
      gap={gap || 8}
      fxDirection={'row'}
      flex={1}
      flexWrap={'wrap'}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${numColumns || 2}, 1fr)` }}
    >
      {renderFilter}
    </FlexBox>
  );
};

export default TagButtonsFilter;
