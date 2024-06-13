import { FilterChangeHandler, FilterSelectValueHandler } from './TabSelector';
import React, { useCallback, useMemo, useState } from 'react';
import ButtonIcon from './ButtonIcon';
import FlexBox from './FlexBox';
import { Text } from './Text';
import { isUndefined } from 'lodash';
import { MaybeNull } from '../../types/utils.types';

export type TagFilterOnSelectValue<Value = any> = FilterSelectValueHandler<Value>;

export type TagSelectOption<V = any, Name extends string = any> = {
  _id?: string;

  label?: MaybeNull<string>;

  name?: Name;

  value?: V;

  disabled?: boolean;

  isActive?: boolean;
};

export type TagSelectHandler<
  V = any,
  Name extends string = any,
  Option extends TagSelectOption<V, Name> = TagSelectOption<V, Name>,
> = (option: Option, value?: V, index?: number, name?: string) => void;

export type TagButtonsFilterOnSelect<
  Value = any,
  Option extends TagSelectOption<Value> = TagSelectOption<Value>,
> = TagSelectHandler<Value, any, Option>;

export type TagButtonsFilterOnChange<Value = any> = FilterChangeHandler<Value>;

const TagButtonsFilter = <
  Value extends string = string,
  Option extends TagSelectOption<Value | string> = TagSelectOption<Value | string>,
>({
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
  disabledCheck,
}: {
  options?: Option[];
  value?: Value | string[];
  onSelect?: TagButtonsFilterOnSelect<Value | string, Option>;
  onChange?: TagButtonsFilterOnChange<Value | string>;
  onSelectValue?: TagFilterOnSelectValue<Value | string>;
  disabledCheck?: (item: TagSelectOption<Value | string>) => boolean;
  onChangeIds?: TagFilterOnSelectValue<Value | string | string[]>;
  multiple?: boolean;
  numColumns?: number;
  gap?: number;
  name?: string;
  resetButtonPosition?: 'start' | 'end';
  resetButtonLabel?: string;
}) => {
  const [selectedValues, setSelectedValues] = useState<(Value | string)[]>([]);

  const handleSelect = useCallback(
    (option: Option, index: number) => {
      const _value = option.value || option._id;
      if (!_value) {
        console.warn('Not found option value or _id');
        return;
      }

      if (!multiple) {
        setSelectedValues([_value]);

        if (onSelect) onSelect(option, option.value, index);
        if (onChangeIds) onChangeIds({ name, value: _value });
        if (onSelectValue) onSelectValue({ name, value: _value });
        return;
      } else {
        const ids = Array.isArray(value) ? value : selectedValues;
        const newData = !ids.includes(_value) ? [...ids, _value] : ids.filter(el => el !== _value);

        setSelectedValues(newData);

        if (onChangeIds) onChangeIds({ name, value: newData });
        if (onChange) onChange(newData, name);
      }
    },
    [multiple, name, onChange, onChangeIds, onSelect, onSelectValue, selectedValues, value]
  );

  const renderOptions = useMemo(() => {
    return options?.map((opt, index) => {
      const _values = value || selectedValues;
      const _value = opt.value || opt._id || index.toString();
      const isActive = value && (Array.isArray(_values) ? _values.includes(_value) : _value === _values);

      return (
        <ButtonIcon
          isActive={isActive}
          key={`tag-opt_${_value}`}
          variant={isActive ? 'filledMiddle' : 'outlinedMiddle'}
          onClick={() => handleSelect(opt, index)}
          disabled={disabledCheck && disabledCheck(opt)}
          style={{
            // width: '100%',
            minWidth: 'unset',
            padding: '4px 8px',

            // borderColor: !isActive ? opt?.color ?? '' : '',
            // backgroundColor: isActive ? opt?.color ?? '' : '',
            // color: !isActive ? opt?.color ?? '' : '',
          }}
        >
          <Text $ellipsisMode={true} $size={13} style={{ fontWeight: 'inherit' }}>
            {opt.label}
          </Text>
        </ButtonIcon>
      );
    });
  }, [disabledCheck, handleSelect, options, selectedValues, value]);

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
