import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { checks } from '../../utils';
import { t } from '../../lang';
import { MaybeNull } from '../../types/utils.types';

export interface ModalFormFilterProps<V = any, D = any> {
  getDefaultValue?: (opt: FilterOption<V, D>) => number;
  preventFilter?: boolean;
  filterOptions?: FilterOption<V, D>[];

  onOptSelect?: FilterSelectHandler<V, D>;
  onFilterValueSelect?: FilterSelectValueHandler<V>;
  onChangeIndex?: (index: number) => void;

  name?: any;
  defaultOption?: number | FilterOption<V, D> | V;
  currentIndex?: number;
  defaultFilterValue?: string;
  renderLabel?: (info: { option?: FilterOption<V, D>; index: number; isActive: boolean }) => React.ReactNode;

  asStepper?: boolean;
  onReset?: () => void;

  optionProps?: { fitContentH?: boolean };
}

export interface FilterOption<V = any, D = any> extends Record<string, any> {
  _id?: string;
  label?: MaybeNull<string>;
  name?: string;
  value: V;
  data?: D;
  color?: string;
  extraLabel?: React.ReactNode;
  getLabel?: (data?: D) => React.ReactNode;
  disabled?: boolean;
  isActive?: boolean;
}

export interface DynamicFilterOption<V = any> extends FilterOption<V> {
  onPress?: () => void;
  onSelect?: (option: FilterOption<V>) => void;
}
// export type FilterOptionSelectHandler<V = any, D = any> = (option: FilterOption<V, D>, value: V, index: number) => void;

export type FilterSelectHandler<V = any, D = any> = (
  option: FilterOption<V, D>,
  value: V,
  index: number,
  name?: string
) => void;
export type FilterSelectValueHandler<V = any> = (info: { name: any & string; value: V }) => void;

export type FilterChangeHandler<V = any> = (values: V[], name?: string) => void;
export interface FilterOpt<V = any, D = any> extends FilterOption<V, D> {}

const ModalFilter = <V = any, D = any>({
  filterOptions = [],
  onOptSelect,
  preventFilter,
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
  onReset,
  ...props
}: ModalFormFilterProps<V, D> & React.HTMLAttributes<HTMLDivElement>) => {
  const [current, setCurrent] = useState<number>(currentIndex);
  // const { listRef } = useScrollTo<HTMLDivElement>(current.toString());

  const handleSelectOpt = useCallback(
    (idx: number, option: FilterOpt) => {
      return () => {
        setCurrent(idx);

        if (checks.isFun(onChangeIndex)) onChangeIndex(idx);
        if (checks.isFun(onFilterValueSelect)) onFilterValueSelect({ name, value: option.value });
        if (checks.isFun(onOptSelect)) onOptSelect(option, option.value, idx);
      };
    },
    [name, onFilterValueSelect, onOptSelect, onChangeIndex]
  );

  const handleReset = () => {
    if (onReset) {
      setCurrent(-1);
      onReset();
    }
  };

  useEffect(() => {
    if (checks.isNotUnd(currentIndex)) {
      setCurrent(currentIndex);
      return;
    }

    if (checks.isNotUnd(defaultFilterValue)) {
      const defIndex = filterOptions.findIndex(el => el.value === defaultFilterValue);
      defIndex > 0 && setCurrent(defIndex);
    }
  }, [currentIndex, defaultFilterValue, filterOptions]);

  useEffect(() => {
    if (preventFilter || defaultFilterValue) return;

    if (filterOptions.length > 0) {
      checks.isFun(onChangeIndex) && onChangeIndex(current);
      checks.isFun(onOptSelect) && onOptSelect(filterOptions[current], filterOptions[current].value, current);
      checks.isFun(onFilterValueSelect) && onFilterValueSelect({ name, value: filterOptions[current].value });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderOptions = useMemo(() => {
    return filterOptions?.map((opt, idx) => (
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
  }, [asStepper, current, filterOptions, handleSelectOpt, renderLabel]);
  useEffect(() => {
    console.log(filterOptions);
  }, [filterOptions]);

  return (
    <Filter
      className="filter"
      gridRepeat={(filterOptions?.length ?? 0) + (onReset ? 1 : 0)}
      optionProps={optionProps}
      {...props}
    >
      {onReset && (
        <StButtonIcon variant="def" onClick={handleReset} isActive={current === -1}>
          <span className={'inner'}>{t('All')}</span>
        </StButtonIcon>
      )}

      {renderOptions}
    </Filter>
  );
};

const Filter = styled.div<{ gridRepeat?: number; optionProps?: { fitContentH?: boolean } }>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ gridRepeat, optionProps }) =>
    `repeat(${gridRepeat || 1}, minmax(${(optionProps?.fitContentH && 'min-content') || '150px'} ,1fr))`};

  height: 32px;
  min-height: 32px;
  overflow: auto;

  background-color: ${({ theme }) => theme.modalBackgroundColor};

  //border-right: 1px solid ${({ theme }) => theme.modalBorderColor};
  //border-left: 1px solid ${({ theme }) => theme.modalBorderColor};

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const StButtonIcon = styled(ButtonIcon)<{ asStep?: boolean; customLabel?: boolean }>`
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  gap: 0;

  font-weight: 600;
  font-size: 11px;
  text-transform: uppercase;
  text-align: center;

  border-radius: 0;
  border-style: none;
  border-width: 0;

  height: 100%;
  min-height: 28px;

  padding: ${p => (p.customLabel ? '2px 4px' : '6px 12px')};

  color: ${({ theme }) => theme.fontColorHeader};

  &:hover {
    color: ${({ theme }) => theme.accentColor.base};
    &::after {
      width: 100%;
    }
  }
  & .inner {
    text-align: center;
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &::before {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};
  }

  &::after {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: ${p => (p.asStep ? 0 : 50)}%;
    height: 2px;
    width: ${p => (p.isActive ? 100 : 0)}%;
    transition: all ${({ theme }) => theme.globals.timingFnMui};
    transform: translate(${p => (p.asStep ? 0 : -50)}%);
    background-color: ${({ theme }) => theme.accentColor.base};
  }

  &[disabled] {
    opacity: ${p => (p?.asStep ? 1 : '60%')};
  }
`;

export default ModalFilter;
