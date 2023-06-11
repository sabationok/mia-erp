import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { SelectItem } from 'components/TableList/TableList';
import { iconId } from 'data';
import React from 'react';
import styled from 'styled-components';
import SearchParamInput from './SearchParamInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

export interface TableSearchProps {
  tableSearchParams?: SelectItem[];
}

interface FormState {
  search: string;
  searchParam: SelectItem | undefined;
}

const validation = yup.object<FormState>().shape({
  search: yup.string().required(),
  searchParam: yup.object<SelectItem>().shape<SelectItem>({}),
});

const TableSearchForm: React.FC<TableSearchProps> = ({ tableSearchParams }) => {
  const {
    formState: { errors },
    register,
    watch,
    handleSubmit,
    setValue,
  } = useForm<FormState>({
    defaultValues: { search: '' },
    reValidateMode: 'onChange',
    resolver: yupResolver(validation),
  });
  const { search, searchParam } = watch();

  function onSelect(item: SelectItem) {
    setValue('searchParam', item);
  }

  function onSubmit(ev: any) {
    handleSubmit(data => {
      console.log(data);
    });
  }

  return (
    <SearchForm>
      <StyledLabel>
        <SearchInput
          placeholder={searchParam?.label ? `Пошук за: "${searchParam?.label}"` : 'Оберіть параметр пошуку'}
          {...register('search')}
        />
      </StyledLabel>

      <ButtonIcon
        iconId={iconId.search}
        size="28px"
        iconSize={'90%'}
        variant="onlyIconNoEffects"
        disabled={!searchParam || !search}
        onClick={onSubmit}
      />

      <SearchParamInput
        {...{
          data: tableSearchParams,
          onSelect,
          searchParam,
          defaultValue: searchParam?.title,
        }}
      />
    </SearchForm>
  );
};

const SearchForm = styled.div`
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
