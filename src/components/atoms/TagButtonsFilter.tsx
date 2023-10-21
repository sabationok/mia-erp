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
import { Text } from './Text';

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
  options?: FilterOption<Value>[];
  values?: Value[];
  onSelect?: FilterSelectHandler<Value>;
  onSelectValue?: FilterSelectValueHandler<Value>;
  onChange?: FilterChangeHandler<Value>;
  multiple?: boolean;
  numColumns?: number;
  gap?: number;
  name?: string;
  resetButtonPosition?: 'start' | 'end';
  resetButtonLabel?: string;
}) => {
  const [selectedValues, setSelectedValues] = useState<Value[]>([]);

  const handleSelect = useCallback(
    (option: FilterOption<Value>, index: number) => {
      setSelectedValues(prev => {
        if (!multiple) {
          onSelect && onSelect(option, option.value, index);
          onSelectValue && onSelectValue({ name, value: option.value });
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
          style={{ width: '100%', minWidth: 'unset', padding: '4px 8px' }}
        >
          <Text $ellipsisMode={true} $size={12} style={{ fontWeight: 'inherit' }}>
            {checks.isStr(opt?.label) ? t(opt.label) : opt.value}
          </Text>
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
