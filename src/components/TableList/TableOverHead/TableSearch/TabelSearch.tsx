import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { iconId } from 'data';
import React, { useState } from 'react';
import styled from 'styled-components';
import SearchParamInput, { SelectItem } from './SearchParamInput';

export interface TableSearchProps {
  tableSearchParams?: SelectItem[];
}

const TabelSearch: React.FC<TableSearchProps> = ({ tableSearchParams }) => {
  const [searchParam, setSearchParam] = useState<SelectItem>();
  function onSelect(item: SelectItem) {
    console.log(item);
    setSearchParam(item);
  }
  return (
    <SearchContainer>
      <StyledLabel>
        <SearchInput type="text" placeholder="Пошук" />
      </StyledLabel>

      <SearchParamInput {...{ data: tableSearchParams, onSelect, searchParam, defaultValue: searchParam?.title }} />

      <ButtonIcon iconId={iconId.search} size="28px" variant="onlyIconFilled" />
    </SearchContainer>
  );
};

const SearchContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr min-content;
  gap: 8px;
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
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.globals.inputBorder};
  &:hover,
  &:focus {
    /* border-bottom-color: ${({ theme }) => theme.accentColor.hover}; */
    outline-style: none;
  }
`;
export default TabelSearch;
