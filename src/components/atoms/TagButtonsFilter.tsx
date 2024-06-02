import { FilterChangeHandler, FilterOption, FilterSelectHandler, FilterSelectValueHandler } from './TabSelector';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ButtonIcon from './ButtonIcon';
import { checks } from '../../utils';
import FlexBox from './FlexBox';
import { t } from '../../lang';
import { Text } from './Text';

export type TagButtonsFilterOnSelectValue<Value = any> = FilterSelectValueHandler<Value>;
export type TagButtonsFilterOnSelect<Value = any> = FilterSelectHandler<Value>;
export type TagButtonsFilterOnChange<Value = any> = FilterChangeHandler<Value>;
export type TagButtonsFilterOption<Value = any> = FilterOption<Value>;

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
  resetButtonPosition,
  resetButtonLabel,
}: {
  options?: TagButtonsFilterOption<Value>[];
  values?: Value[];
  onSelect?: TagButtonsFilterOnSelect<Value>;
  onChange?: TagButtonsFilterOnChange<Value>;
  onSelectValue?: TagButtonsFilterOnSelectValue<Value>;
  multiple?: boolean;
  numColumns?: number;
  gap?: number;
  name?: string;
  resetButtonPosition?: 'start' | 'end';
  resetButtonLabel?: string;
}) => {
  const [selectedValues, setSelectedValues] = useState<Value[]>([]);

  const handleSelect = useCallback(
    (option: TagButtonsFilterOption<Value>, index: number) => {
      if (!multiple) {
        if (onSelect) onSelect(option, option.value, index);
        if (onSelectValue) onSelectValue({ name, value: option.value });
        setSelectedValues([option.value]);
      } else {
        const newData = !selectedValues.includes(option.value)
          ? [...selectedValues, option.value]
          : selectedValues.filter(el => el !== option.value);
        if (onChange) {
          onChange(newData, name);
        } else {
          setSelectedValues(newData);
        }
      }
    },
    [multiple, name, onChange, onSelect, onSelectValue, selectedValues]
  );

  useEffect(() => {
    if (checks.isArray(values)) {
      setSelectedValues(values);
    }
  }, [values]);

  const renderFilter = useMemo(() => {
    return options?.map((opt, index) => {
      const isActive = selectedValues.includes(opt.value);
      return (
        <ButtonIcon
          isActive={isActive}
          key={`f-opt_${opt.value}`}
          variant={isActive ? 'filledSmall' : 'outlinedSmall'}
          onClick={() => handleSelect(opt, index)}
          style={{
            width: '100%',
            minWidth: 'unset',
            padding: '4px 8px',

            borderColor: !isActive ? opt?.color ?? '' : '',
            backgroundColor: isActive ? opt?.color ?? '' : '',
            color: !isActive ? opt?.color ?? '' : '',
          }}
        >
          <Text $ellipsisMode={true} $size={12} style={{ fontWeight: 'inherit' }}>
            {checks.isStr(opt?.label) ? t(opt.label) : opt.value}
          </Text>
        </ButtonIcon>
      );
    });
  }, [handleSelect, options, selectedValues]);

  return (
    <FlexBox
      fillWidth
      gap={gap || 8}
      fxDirection={'row'}
      flex={1}
      flexWrap={'wrap'}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${numColumns || 2}, 1fr)` }}
    >
      {resetButtonPosition === 'start' && (
        <ButtonIcon
          variant={selectedValues.length === 0 ? 'filledSmall' : 'outlinedSmall'}
          onClick={() => setSelectedValues([])}
          style={{ width: '100%', minWidth: 'unset', padding: '4px 8px' }}
        >
          <Text $ellipsisMode={true} $size={12} style={{ fontWeight: 'inherit' }}>
            {resetButtonLabel || 'Clear'}
          </Text>
        </ButtonIcon>
      )}

      {renderFilter}

      {resetButtonPosition === 'end' && (
        <ButtonIcon
          variant={selectedValues.length === 0 ? 'filledSmall' : 'outlinedSmall'}
          onClick={() => setSelectedValues([])}
        >
          {resetButtonLabel || 'Clear'}
        </ButtonIcon>
      )}
    </FlexBox>
  );
};

export default TagButtonsFilter;
