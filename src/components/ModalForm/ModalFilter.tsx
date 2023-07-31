import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

export interface ModalFormFilterProps<V = any, D = any> {
  defaultOption?: number | FilterOpt<V, D> | V;
  getDefaultValue?: (opt: FilterOpt<V, D>) => number;
  preventFilter?: boolean;
  onOptSelect?: FilterOptionSelectHandler<V>;
  filterOptions?: FilterOpt<V, D>[];
  defaultFilterValue?: string;
}

export interface FilterOpt<V = any, D = any> extends Record<string, any> {
  _id?: string;
  label: string;
  name?: string;
  value: V;
  data?: D;
  extraLabel?: string | React.ReactNode;
  getLabel?: (data?: D) => string | React.ReactNode;
  disabled?: boolean;
}

export type FilterOptionSelectHandler<V = any, D = any> = (option: FilterOpt<V, D>, value: FilterOpt['value']) => void;

const ModalFilter: React.FC<ModalFormFilterProps & React.HTMLAttributes<HTMLDivElement>> = ({
  filterOptions,
  onOptSelect,
  preventFilter,
  defaultFilterValue,
  defaultOption,
  getDefaultValue,
  ...props
}) => {
  const [current, setCurrent] = useState<number>(typeof defaultOption === 'number' ? defaultOption : 0);

  const handleSelectOpt = useCallback(
    (idx: number, option: FilterOpt) => {
      return () => {
        setCurrent(idx);
        if (!onOptSelect) return console.log('No passed "onSelect" handler', option);
        if (typeof onOptSelect === 'function') onOptSelect(option, option.value);
      };
    },
    [onOptSelect]
  );

  useEffect(() => {
    if (preventFilter || defaultFilterValue) return;

    if (filterOptions && Array.isArray(filterOptions)) {
      typeof onOptSelect === 'function' && onOptSelect(filterOptions[current], filterOptions[current].value);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (defaultFilterValue && Array.isArray(filterOptions)) {
      const defIndex = filterOptions.findIndex(el => el.value === defaultFilterValue);
      defIndex > 0 && setCurrent(defIndex);
    }
  }, [defaultFilterValue, filterOptions]);

  const renderOptions = useMemo(
    () =>
      filterOptions &&
      filterOptions?.length > 0 &&
      filterOptions?.map((opt, idx) => (
        <StButtonIcon
          key={idx}
          variant="def"
          disabled={opt?.disabled}
          className={current === idx ? 'filterBtn active' : 'filterBtn'}
          onClick={handleSelectOpt(idx, opt)}
        >
          <span className={'inner'}>{opt?.label}</span>
          {opt.extraLabel || null}
        </StButtonIcon>
      )),
    [current, filterOptions, handleSelectOpt]
  );

  return (
    <Filter className="filter" gridRepeat={filterOptions?.length} {...props}>
      {renderOptions}
    </Filter>
  );
};

const Filter = styled.div<{ gridRepeat?: number }>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ gridRepeat }) => `repeat(${gridRepeat || 1}, minmax(150px, 1fr))`};

  min-height: 36px;
  overflow: auto;

  background-color: ${({ theme }) => theme.backgroundColorSecondary};

  border-right: 1px solid ${({ theme }) => theme.modalBorderColor};
  border-left: 1px solid ${({ theme }) => theme.modalBorderColor};

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const StButtonIcon = styled(ButtonIcon)`
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
    left: 50%;
    height: 2px;
    width: 0;
    transition: all ${({ theme }) => theme.globals.timingFnMui};
    transform: translate(-50%);
    background-color: ${({ theme }) => theme.accentColor.base};
  }

  &.active {
    &::after {
      width: 100%;
    }
  }

  &[disabled] {
    opacity: 60%;
  }
`;

export default ModalFilter;
