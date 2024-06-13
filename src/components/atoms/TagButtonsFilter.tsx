import { FilterChangeHandler, FilterOption, FilterSelectHandler, FilterSelectValueHandler } from './TabSelector';
import React, { useCallback, useMemo, useState } from 'react';
import ButtonIcon from './ButtonIcon';
import FlexBox from './FlexBox';
import { Text } from './Text';
import { isUndefined } from 'lodash';

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
  value,
  numColumns,
  gap,
  name = 'filter',
  onSelect,
  onChange,
  onSelectValue,
  resetButtonPosition,
  resetButtonLabel,
  onChangeIds,
}: {
  options?: TagButtonsFilterOption<Value | string>[];
  value?: Value | string[];
  onSelect?: TagButtonsFilterOnSelect<Value | string>;
  onChange?: TagButtonsFilterOnChange<Value | string>;
  onSelectValue?: TagButtonsFilterOnSelectValue<Value | string>;
  onChangeIds?: TagButtonsFilterOnSelectValue<Value | string | string[]>;
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
      const _value = option.value || option._id;
      if (!_value) {
        console.warn('Not found option value or _id');
        return;
      }

      if (!multiple) {
        setSelectedValues([_value]);

        if (onChangeIds) return onChangeIds({ name, value: _value });
        if (onSelect) return onSelect(option, option.value, index);
        if (onSelectValue) return onSelectValue({ name, value: _value });
      } else {
        const ids = Array.isArray(value) ? value : selectedValues;
        const newData = !ids.includes(_value) ? [...ids, _value] : ids.filter(el => el !== _value);

        setSelectedValues(newData);
        if (onChangeIds) return onChangeIds({ name, value: newData });
        if (onChange) return onChange(newData, name);
      }
    },
    [multiple, name, onChange, onChangeIds, onSelect, onSelectValue, selectedValues, value]
  );

  const renderOptions = useMemo(() => {
    return options?.map((opt, index) => {
      const _value = opt.value || opt._id || index.toString();
      const isActive = !!_value && (value || selectedValues).includes(_value);

      return (
        <ButtonIcon
          isActive={isActive}
          key={`tag-opt_${_value}`}
          variant={isActive ? 'filledMiddle' : 'outlinedMiddle'}
          onClick={() => handleSelect(opt, index)}
          style={{
            // width: '100%',
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
  }, [handleSelect, options, selectedValues, value]);

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
      // flex={1}
      flexWrap={'wrap'}
      style={
        isUndefined(numColumns)
          ? { flexDirection: 'row' }
          : { display: 'grid', gridTemplateColumns: `repeat(${numColumns || 3}, 1fr)` }
      }
    >
      {resetButtonPosition === 'start' && renderResetButton}

      {renderOptions}

      {resetButtonPosition === 'end' && renderResetButton}
    </FlexBox>
  );
};

export default TagButtonsFilter;
