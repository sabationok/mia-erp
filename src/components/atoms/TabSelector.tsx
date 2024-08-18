import ButtonIcon, { buttonPointerCss } from 'components/atoms/ButtonIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { t } from '../../lang';
import { MaybeNull } from '../../types/utils.types';
import { isFunction, isUndefined } from 'lodash';
import FlexBox from './FlexBox';

export interface ModalFormFilterProps<V = any, D = any, Option extends FilterOption<V, D> = any> {
  getDefaultValue?: (opt: Option) => number;
  preventDefault?: boolean;
  options?: Option[];

  onOptSelect?: FilterSelectHandler<V, D, Option>;
  onSelect?: FilterSelectHandler<V, D, Option>;
  onFilterValueSelect?: FilterSelectValueHandler<V>;
  onChangeIndex?: (index: number) => void;

  name?: any;
  defaultOption?: Option;
  currentIndex?: number;
  defaultFilterValue?: string;
  renderLabel?: (info: { option?: Option; index: number; isActive: boolean }) => React.ReactNode;

  asStepper?: boolean;
  onResetPress?: () => void;

  optionProps?: { fitContentH?: boolean };
}

export interface FilterOption<V = any, D = any> extends Record<string, any> {
  _id?: string;
  label?: MaybeNull<string>;
  name?: string;
  value?: V;
  data?: D;
  color?: string;
  extraLabel?: React.ReactNode;
  getLabel?: (data?: D) => React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
}

// export interface DynamicFilterOption<V = any> extends FilterOption<V> {
//   onPress?: () => void;
//   onSelect?: (option: FilterOption<V>) => void;
// }
// export type FilterOptionSelectHandler<V = any, D = any> = (option: FilterOption<V, D>, value: V, index: number) => void;

export type FilterSelectHandler<V = any, D = any, Option extends FilterOption<V, D> = any> = (
  option: Option,
  value?: V,
  index?: number,
  name?: string
) => void;

export type FilterSelectValueHandler<V = any> = (info: { name: any & string; value: V }) => void;

export type FilterChangeHandler<V = any> = (values: V[], name?: string) => void;

export type TabOption<V = any, D = any> = FilterOption<V, D>;

const TabSelector = <V = any, D = any, Option extends FilterOption<V, D> = any>({
  options = [],
  onOptSelect,
  onSelect,
  preventDefault,
  defaultFilterValue,
  defaultOption,
  getDefaultValue,
  onFilterValueSelect,
  currentIndex = 0,
  asStepper,
  name,
  onChangeIndex,
  optionProps,
  renderLabel,
  onResetPress,
  ...props
}: ModalFormFilterProps<V, D, Option> & Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect' | 'onReset'>) => {
  const [current, setCurrent] = useState<number>(currentIndex);

  const handleSelectOpt = useCallback(
    (idx: number, option: TabOption) => {
      return () => {
        setCurrent(idx);

        if (isFunction(onChangeIndex)) onChangeIndex(idx);
        if (isFunction(onFilterValueSelect)) onFilterValueSelect({ name, value: option.value });
        if (isFunction(onOptSelect)) onOptSelect(option, option.value, idx);
        if (isFunction(onSelect)) onSelect(option, option.value, idx);
      };
    },
    [onChangeIndex, onFilterValueSelect, name, onOptSelect, onSelect]
  );

  const handleReset = () => {
    if (onResetPress) {
      setCurrent(-1);
      onResetPress();
    }
  };

  useEffect(() => {
    if (onResetPress || preventDefault) return;
    if (!isUndefined(currentIndex)) {
      setCurrent(currentIndex);
      return;
    }
  }, [currentIndex, onResetPress, preventDefault]);

  useEffect(() => {
    if (onResetPress || preventDefault) return;
    if (!isUndefined(defaultFilterValue)) {
      const defIndex = options.findIndex(el => el.value === defaultFilterValue || el._id === defaultFilterValue);
      defIndex > 0 && setCurrent(defIndex);
    }
  }, [defaultFilterValue, onResetPress, options, preventDefault]);

  useEffect(() => {
    if (onResetPress || preventDefault || defaultFilterValue) return;

    if (options.length > 0) {
      if (isFunction(onChangeIndex)) onChangeIndex(current);
      if (isFunction(onFilterValueSelect)) onFilterValueSelect({ name, value: options[current].value });
      if (isFunction(onOptSelect)) onOptSelect(options[current], options[current].value, current);
      if (isFunction(onSelect)) onSelect(options[current], options[current].value, current);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderOptions = useMemo(() => {
    return options?.map((opt, idx) => (
      <StButtonIcon
        key={idx}
        id={`filter-opt_${opt?.value || idx}`}
        variant="def"
        disabled={asStepper || opt?.disabled}
        onClick={handleSelectOpt(idx, opt)}
        asStep={asStepper}
        isActive={asStepper ? idx <= current : current === idx}
        customLabel={!!renderLabel}
      >
        {renderLabel ? (
          renderLabel({ option: opt, index: idx, isActive: asStepper ? idx <= current : current === idx })
        ) : (
          <>
            <span className={'inner'}>{opt?.label}</span>
            {opt.extraLabel || null}
          </>
        )}
      </StButtonIcon>
    ));
  }, [asStepper, current, options, handleSelectOpt, renderLabel]);

  return (
    <FilterBox className="filter" overflow={'hidden'} fillWidth maxWidth={'100%'} {...props}>
      <Filter optionProps={optionProps} gridRepeat={(options?.length ?? 0) + (onResetPress ? 1 : 0)}>
        {onResetPress && (
          <StButtonIcon variant="def" onClick={handleReset} isActive={current === -1}>
            <span className={'inner'}>{t('All')}</span>
          </StButtonIcon>
        )}
        {renderOptions}
      </Filter>
    </FilterBox>
  );
};

const FilterBox = styled(FlexBox)`
  @media screen and (max-width: 480px) {
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;
const Filter = styled.div<{ gridRepeat?: number; optionProps?: { fitContentH?: boolean } }>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ gridRepeat, optionProps }) =>
    `repeat(${gridRepeat || 1}, minmax(${(optionProps?.fitContentH && 'min-content') || '150px'} ,1fr))`};

  height: max-content;
  min-height: 32px;
  min-width: 100%;
  overflow: auto;
  max-width: 100%;

  background-color: ${({ theme }) => theme.modalBackgroundColor};

  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};

  @media screen and (max-width: 480px) {
    &::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const StButtonIcon = styled(ButtonIcon)<{ asStep?: boolean; customLabel?: boolean }>`
  ${buttonPointerCss.bottom}
`;

export default TabSelector;
