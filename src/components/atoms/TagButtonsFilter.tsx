import { FilterChangeHandler, FilterOption, FilterSelectHandler, FilterSelectValueHandler } from './TabSelector';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import ButtonIcon from './ButtonIcon';
import FlexBox from './FlexBox';
import { Text } from './Text';
import { isArray } from 'lodash';

export type TagButtonsFilterOnSelectValue<Value = any> = FilterSelectValueHandler<Value>;
export type TagButtonsFilterOnSelect<
  Value = any,
  Option extends TagButtonsFilterOption<Value> = any,
> = FilterSelectHandler<Value, any, Option>;
export type TagButtonsFilterOnChange<Value = any> = FilterChangeHandler<Value>;
export type TagButtonsFilterOption<Value = any> = FilterOption<Value>;

const TagButtonsFilter = <Value extends string = string>({
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
  options?: TagButtonsFilterOption<Value | string>[];
  values?: Value | string[];
  onSelect?: TagButtonsFilterOnSelect<Value | string>;
  onChange?: TagButtonsFilterOnChange<Value | string>;
  onSelectValue?: TagButtonsFilterOnSelectValue<Value | string>;
  multiple?: boolean;
  numColumns?: number;
  gap?: number;
  name?: string;
  resetButtonPosition?: 'start' | 'end';
  resetButtonLabel?: string;
}) => {
  const [selectedValues, setSelectedValues] = useState<(Value | string)[]>([]);

  const handleSelect = useCallback(
    (option: TagButtonsFilterOption<Value | string>, index: number) => {
      const value = option.value || option._id;
      if (!value) {
        console.warn('Not found option value or _id');
        return;
      }
      if (!multiple) {
        if (onSelect) onSelect(option, option.value, index);
        if (onSelectValue) onSelectValue({ name, value: value });
        setSelectedValues([value]);
      } else {
        const newData = !selectedValues.includes(value)
          ? [...selectedValues, value]
          : selectedValues.filter(el => el !== value);
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
    if (isArray(values)) {
      setSelectedValues(values);
    }
  }, [values]);

  const renderOptions = useMemo(() => {
    return options?.map((opt, index) => {
      const value = opt.value || opt._id || index.toString();
      const isActive = !!value && selectedValues.includes(value);
      return (
        <ButtonIcon
          isActive={isActive}
          key={`tag-opt_${value}`}
          variant={isActive ? 'filledMiddle' : 'outlinedMiddle'}
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
          <Text $ellipsisMode={true} $size={13} style={{ fontWeight: 'inherit' }}>
            {opt.label}
          </Text>
        </ButtonIcon>
      );
    });
  }, [handleSelect, options, selectedValues]);

  const renderResetButton = (
    <ButtonIcon
      variant={'defaultMiddle'}
      onClick={() => setSelectedValues([])}
      style={{ width: '100%', minWidth: 'unset', padding: '4px 8px' }}
    >
      <Text $ellipsisMode={true} $size={12} style={{ fontWeight: 'inherit' }}>
        {resetButtonLabel || 'Clear'}
      </Text>
    </ButtonIcon>
  );

  return (
    <FlexBox
      fillWidth
      gap={gap || 8}
      fxDirection={'row'}
      flex={1}
      flexWrap={'wrap'}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${numColumns || 3}, 1fr)` }}
    >
      {resetButtonPosition === 'start' && renderResetButton}

      {renderOptions}

      {resetButtonPosition === 'end' && renderResetButton}
    </FlexBox>
  );
};

export default TagButtonsFilter;
