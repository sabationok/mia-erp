import { useState } from 'react';
import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { useModalProvider } from 'components/ModalProvider/ModalProvider';
import { iconId } from 'data';
import styled from 'styled-components';
import { useTable } from '../TableList';

import SearchParamInput from './SearchParamInput/SearchParamInput';
import Filter from 'components/Filter/Filter';

const TableFilter: React.FC = () => {
  const modal = useModalProvider();
  const [searchParam, setSearchParam] = useState<any>({});
  const { tableSearchParams = [], filter } = useTable();

  function onSelect(item: any) {
    console.log(item);
    setSearchParam(item);
  }

  return (
    <FilterContainer isFilter={filter}>
      {filter && (
        <ButtonIcon
          iconId={iconId.filterOff}
          size="28px"
          variant="onlyIcon"
          onClick={() => {
            modal.handleOpenModal({ ModalChildren: Filter });
          }}
        />
      )}

      <StyledLabel>
        <SearchInput type="text" placeholder="Пошук" />
      </StyledLabel>

      <SearchParamInput {...{ data: tableSearchParams, onSelect, searchParam, defaultValue: searchParam?.title }} />

      <ButtonIcon iconId={iconId.search} size="28px" variant="onlyIconFilled" />
    </FilterContainer>
  );
};
// <{ filter?: boolean }>
// grid-template-columns: ${({ filter }) => {
// console.log(filter);
// return filter ? 'min-content 1.2fr 1fr min-content' : '1.2fr 1fr min-content';
// }};
const FilterContainer = styled.div<{ isFilter?: boolean }>`
  display: grid;
  grid-template-columns: ${({ isFilter }) =>
    isFilter ? 'min-content 1.2fr 1fr min-content' : '1.2fr 1fr min-content'};
  grid-template-rows: 28px;
  gap: 8px;

  color: inherit;
`;

const StyledLabel = styled.label`
  position: relative;

  border-style: none;
  border-image: none;
  border-width: 0;

  &::before {
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

  &:focus-within {
    &::before {
      width: 100%;
    }
  }
`;
const SearchInput = styled.input`
  height: 100%;
  width: 100%;
  padding: 4px 8px;

  font-size: 12px;
  font-family: inherit;
  color: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }
  background-color: transparent;

  border-style: none;
  border-bottom: 1px solid ${({ theme }) => theme.globals.inputBorder};
  &:hover,
  &:focus {
    /* border-bottom-color: ${({ theme }) => theme.accentColor.hover}; */
    outline-style: none;
  }
`;
export default TableFilter;
