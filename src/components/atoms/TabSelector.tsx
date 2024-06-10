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
  onReset?: () => void;

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
  onReset,
  ...props
}: ModalFormFilterProps<V, D, Option> & React.HTMLAttributes<HTMLDivElement>) => {
  const [current, setCurrent] = useState<number>(currentIndex);

  const handleSelectOpt = useCallback(
    (idx: number, option: TabOption) => {
      return () => {
        setCurrent(idx);

        if (isFunction(onChangeIndex)) onChangeIndex(idx);
        if (isFunction(onFilterValueSelect)) onFilterValueSelect({ name, value: option.value });
        if (isFunction(onOptSelect)) onOptSelect(option, option.value, idx);
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
    if (!isUndefined(currentIndex)) {
      setCurrent(currentIndex);
      return;
    }
  }, [currentIndex]);

  useEffect(() => {
    if (!isUndefined(defaultFilterValue)) {
      const defIndex = options.findIndex(el => el.value === defaultFilterValue || el._id === defaultFilterValue);
      defIndex > 0 && setCurrent(defIndex);
    }
  }, [defaultFilterValue, options]);

  useEffect(() => {
    if (preventDefault || defaultFilterValue) return;

    if (options.length > 0) {
      // isFunction(onChangeIndex) && onChangeIndex(current);
      // isFunction(onOptSelect) && onOptSelect(options[current], options[current].value, current);
      // isFunction(onFilterValueSelect) && onFilterValueSelect({ name, value: options[current].value });
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
    <FlexBox className="filter" overflow={'hidden'} fillWidth maxWidth={'100%'} {...props}>
      {onReset && (
        <StButtonIcon variant="def" onClick={handleReset} isActive={current === -1}>
          <span className={'inner'}>{t('All')}</span>
        </StButtonIcon>
      )}

      <Filter optionProps={optionProps} gridRepeat={(options?.length ?? 0) + (onReset ? 1 : 0)}>
        {renderOptions}
      </Filter>
    </FlexBox>
  );
};

const Filter = styled.div<{ gridRepeat?: number; optionProps?: { fitContentH?: boolean } }>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ gridRepeat, optionProps }) =>
    `repeat(${gridRepeat || 1}, minmax(${(optionProps?.fitContentH && 'min-content') || '150px'} ,1fr))`};

  height: 32px;
  min-height: 32px;
  min-width: 100%;
  overflow: auto;
  max-width: 100%;

  background-color: ${({ theme }) => theme.modalBackgroundColor};

  //border-right: 1px solid ${({ theme }) => theme.modalBorderColor};
  //border-left: 1px solid ${({ theme }) => theme.modalBorderColor};
  border-bottom: 1px solid ${({ theme }) => theme.modalBorderColor};

  &::-webkit-scrollbar {
    width: 0;
    height: 0;
  }
`;

const StButtonIcon = styled(ButtonIcon)<{ asStep?: boolean; customLabel?: boolean }>`
  ${buttonPointerCss.bottom}
`;

export default TabSelector;
