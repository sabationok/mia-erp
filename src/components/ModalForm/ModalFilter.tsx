import { useState } from 'react';
import styled from 'styled-components';
import { ModalFormProps } from './ModalForm';

const ModalFilter: React.FC<Pick<ModalFormProps, 'filterOptions' | 'onOptSelect'>> = ({
  filterOptions,
  onOptSelect,
}) => {
  const [current, setCurrent] = useState<number>(0);
  return (
    <Filter gridRepeat={filterOptions?.length}>
      {filterOptions &&
        filterOptions?.length > 0 &&
        filterOptions?.map((opt, idx: number) => (
          <FilterBtn
            key={opt?.label || idx}
            isActive={idx === current}
            type="button"
            onClick={() => {
              setCurrent(idx);
              if (typeof onOptSelect === 'function') onOptSelect(opt);
            }}
          >
            {opt?.label || opt?.name || `option ${idx + 1}`}
          </FilterBtn>
        ))}
    </Filter>
  );
};

const Filter = styled.div<{ gridRepeat?: number }>`
  display: grid;
  align-items: center;
  grid-template-columns: ${({ gridRepeat }) => `repeat(${gridRepeat || 1}, 1fr)`};

  height: 44px;

  background-color: inherit;
`;

const FilterBtn = styled.button<{ isActive: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  min-height: 20px;

  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.05em;
  color: inherit;

  text-transform: uppercase;

  background-color: ${({ isActive, theme }) => (isActive ? 'inherit' : `${theme.borderColor}`)};
  border-style: none;
`;

export default ModalFilter;
