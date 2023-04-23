import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ModalFormProps } from './ModalForm';

export interface ModalFormFilterProps extends Pick<ModalFormProps, 'filterOptions' | 'onOptSelect' | 'preventFilter' | 'defaultFilterValue'> {
}

const ModalFilter: React.FC<ModalFormFilterProps & React.HTMLAttributes<HTMLDivElement>> = ({
                                                                                              filterOptions,
                                                                                              onOptSelect,
                                                                                              preventFilter,
                                                                                              defaultFilterValue,
                                                                                              ...props
                                                                                            }) => {
  const [current, setCurrent] = useState<number>(0);

  useEffect(() => {
    if (preventFilter || defaultFilterValue) return;

    if (filterOptions) {
      const opt = Array.isArray(filterOptions) && filterOptions[current];
      (typeof onOptSelect === 'function') && onOptSelect(opt);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (defaultFilterValue && filterOptions) {
      const defIndex = filterOptions.findIndex(el => el.value === defaultFilterValue);
      defIndex > 0 && setCurrent(defIndex);
    }

  }, [defaultFilterValue, filterOptions]);

  useEffect(() => {
    if (Array.isArray(filterOptions)) {
      // if (typeof onOptSelect === 'function') onOptSelect(filterOptions[current]);
    }
  }, [current, filterOptions, onOptSelect]);


  return (
    <Filter className='filter' gridRepeat={filterOptions?.length} {...props}>
      {filterOptions &&
        filterOptions?.length > 0 &&
        filterOptions?.map((opt, idx) => (
          <StButtonIcon
            key={idx}
            variant='def'
            className={current === idx ? 'filterBtn active' : 'filterBtn'}
            onClick={() => {
              setCurrent(idx);
              if (typeof onOptSelect === 'function') onOptSelect(filterOptions[idx]);
            }}
          >
            {opt?.label || opt?.name || null}

            {opt.getLabel && opt.getLabel()}
          </StButtonIcon>
        ))}
    </Filter>
  );
};

const Filter = styled.div<{ gridRepeat?: number }>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ gridRepeat }) => `repeat(${gridRepeat || 1}, 1fr)`};

  height: 100%;

  background-color: transparent;
`;

const StButtonIcon = styled(ButtonIcon)`
  position: relative;
  flex-direction: column;

  font-weight: 700;
  font-size: 12px;
  text-transform: uppercase;
  text-align: center;

  border-radius: 0;
  border-style: none;
  border-width: 0;

  height: 100%;
  min-height: 20px;

  color: ${({ theme }) => theme.fontColorHeader};

  &::before {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    border-bottom: 1px solid ${({ theme }) => theme.trBorderClr};
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
`;

export default ModalFilter;
