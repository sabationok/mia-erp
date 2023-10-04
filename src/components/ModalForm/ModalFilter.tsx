import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { checks } from '../../utils';

export interface ModalFormFilterProps<V = any, D = any> {
  defaultOption?: number | FilterOpt<V, D> | V;
  getDefaultValue?: (opt: FilterOpt<V, D>) => number;
  preventFilter?: boolean;
  onOptSelect?: FilterSelectHandler<V, D>;
  onFilterValueSelect?: FilterSelectValueHandler<V>;
  filterOptions?: FilterOption<V, D>[];
  name?: any;
  currentIndex?: number;
  defaultFilterValue?: string;
  asStepper?: boolean;
}

export interface FilterOpt<V = any, D = any> extends Record<string, any> {
  _id?: string;
  label: string;
  name?: string;
  value: V;
  data?: D;
  color?: string;
  extraLabel?: string | React.ReactNode;
  getLabel?: (data?: D) => string | React.ReactNode;
  disabled?: boolean;
}
// export type FilterOptionSelectHandler<V = any, D = any> = (option: FilterOpt<V, D>, value: V, index: number) => void;

export type FilterSelectHandler<V = any, D = any> = (
  option: FilterOption<V, D>,
  value: V,
  index: number,
  name?: string
) => void;
export type FilterSelectValueHandler<V = any> = (name: any & string, value: V) => void;

export type FilterChangeHandler<V = any> = (values: V[], name?: string) => void;
export interface FilterOption<V = any, D = any> extends FilterOpt<V, D> {}

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
  ...props
}: ModalFormFilterProps<V, D> & React.HTMLAttributes<HTMLDivElement>) => {
  const [current, setCurrent] = useState<number>(currentIndex);
  // const { listRef } = useScrollTo<HTMLDivElement>(current.toString());

  const handleSelectOpt = useCallback(
    (idx: number, option: FilterOpt) => {
      return () => {
        setCurrent(idx);

        if (checks.isFun(onFilterValueSelect)) {
          onFilterValueSelect(name, option.value);
        }

        if (checks.isFun(onOptSelect)) onOptSelect(option, option.value, idx);
      };
    },
    [name, onFilterValueSelect, onOptSelect]
  );

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
      checks.isFun(onOptSelect) && onOptSelect(filterOptions[current], filterOptions[current].value, current);
      checks.isFun(onFilterValueSelect) && onFilterValueSelect(name, filterOptions[current].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderOptions = useMemo(
    () =>
      filterOptions?.map((opt, idx) => (
        <StButtonIcon
          key={idx}
          id={`filter-opt_${opt?.value || idx}`}
          variant="def"
          disabled={asStepper || opt?.disabled}
          onClick={handleSelectOpt(idx, opt)}
          asStep={asStepper}
          isActive={asStepper ? idx <= current : current === idx}
        >
          <span className={'inner'}>{opt?.label}</span>
          {opt.extraLabel || null}
        </StButtonIcon>
      )),
    [asStepper, current, filterOptions, handleSelectOpt]
  );

  return filterOptions?.length && filterOptions?.length > 0 ? (
    <Filter className="filter" gridRepeat={filterOptions?.length} {...props}>
      {renderOptions}
    </Filter>
  ) : (
    <></>
  );
};

const Filter = styled.div<{ gridRepeat?: number }>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ gridRepeat }) => `repeat(${gridRepeat || 1}, minmax(150px, 1fr))`};

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

const StButtonIcon = styled(ButtonIcon)<{ asStep?: boolean }>`
  position: relative;
  flex-direction: column;
  justify-content: space-around;
  gap: 0;

  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  border-radius: 0;
  border-style: none;
  border-width: 0;

  height: 100%;
  min-height: 28px;

  padding: 6px 12px;

  color: ${({ theme }) => theme.fontColorHeader};

  & .inner {
    text-align: center;
    width: 100%;
    overflow: hidden;
    white-space: pre-wrap;
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
