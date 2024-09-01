import { FilterChangeHandler, FilterSelectValueHandler } from './TabSelector';
import React, { CSSProperties, useCallback, useMemo, useState } from 'react';
import ButtonIcon, { ButtonIconProps } from './ButtonIcon';
import FlexBox from './FlexBox';
import { Text } from './Text';
import { isUndefined } from 'lodash';
import { MaybeNull } from '../../types/utils.types';
import { t } from 'i18e';

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

export interface TagButtonsFilterProps<
  Value extends string = string,
  Option extends TagSelectOption<Value | string> = TagSelectOption<Value | string>,
> {
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
  placeholder?: string;
  resetButtonPosition?: 'start' | 'end';
  resetButtonLabel?: string;
  getButtonStyles?: (option: Option) => CSSProperties;
  getButtonProps?: (option: Option) => Pick<ButtonIconProps, 'colorSchema'>;
}

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
  getButtonStyles,
  getButtonProps,
  placeholder,
}: TagButtonsFilterProps<Value, Option>) => {
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
      const _maybeArray = value || selectedValues;
      const _value = opt.value || opt._id || index.toString();
      const isActive = Array.isArray(_maybeArray) ? _maybeArray.includes(_value) : _value === _maybeArray;

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

            ...(getButtonStyles && getButtonStyles(opt)),
          }}
          {...(getButtonProps && getButtonProps(opt))}
        >
          <Text $ellipsisMode={true} $size={13} color={'inherit'} style={{ fontWeight: 'inherit' }}>
            {opt.label}
          </Text>
        </ButtonIcon>
      );
    });
  }, [getButtonProps, disabledCheck, getButtonStyles, handleSelect, options, selectedValues, value]);

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

      {renderOptions?.length ? (
        renderOptions
      ) : (
        <FlexBox padding={'16px'} margin={'auto'}>
          <Text $align={'center'} $weight={600}>
            {placeholder ?? t('Not found options')}
          </Text>
        </FlexBox>
      )}

      {resetButtonPosition === 'end' && renderResetButton}
    </FlexBox>
  );
};

export default TagButtonsFilter;
