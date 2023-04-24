import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { SelectItem } from 'components/TableList/TableList';
import { iconId } from 'data';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SearchParamInput from './SearchParamInput';

export interface TableSearchProps {
  tableSearchParams?: SelectItem[];
}

const TableSearchForm: React.FC<TableSearchProps> = ({ tableSearchParams }) => {
  const [searchParam, setSearchParam] = useState<SelectItem | undefined>();
  const [searchValue, setSearchValue] = useState<{ search: string }>({ search: '' });

  function onSelect(item: SelectItem) {
    setSearchParam(item);
  }

  function onSubmit(ev: React.FormEvent) {
    ev.preventDefault();

    console.log({
      searchFormData: {
        searchParam,
        searchValue,
      },
    });
  }

  function onChange(ev: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = ev.target;
    setSearchValue(prev => ({ ...prev, [name]: value }));
  }

  useEffect(() => {
    console.log(searchParam);
  }, [searchParam]);
  return (
    <SearchForm onSubmit={onSubmit}>
      <StyledLabel>
        <SearchInput
          type='text'
          name='search'
          value={searchValue.search}
          placeholder={searchParam?.label ? `Пошук за: "${searchParam?.label}"` : 'Оберіть параметр пошуку'}
          onChange={onChange}
        />
      </StyledLabel>


      <ButtonIcon
        iconId={iconId.search}
        size='28px'
        iconSize={'90%'}
        variant='onlyIconNoEffects'
        disabled={!searchParam?.label || !searchValue.search}
        type='submit'
      />


      <SearchParamInput {...{ data: tableSearchParams, onSelect, searchParam, defaultValue: searchParam?.title }} />


    </SearchForm>
  );
};

const SearchForm = styled.form`

  flex: 1 0 150px;


  display: grid;
  grid-template-columns: 1fr min-content min-content;

  max-width: 350px;

  position: relative;
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
export default TableSearchForm;
