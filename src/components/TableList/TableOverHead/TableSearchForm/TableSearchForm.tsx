import ButtonIcon from 'components/atoms/ButtonIcon/ButtonIcon';
import { SelectItem } from 'components/TableList/TableList';
import React from 'react';
import styled from 'styled-components';
import SearchParamInput from './SearchParamInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TableSearchParam } from '../../tableTypes.types';

export interface TableSearchProps<Param extends TableSearchParam = any> {
  searchParams?: Param[];
  onSubmit?: (data: TableSearchFormState<Param>) => void;
}

export interface TableSearchFormState<Param extends TableSearchParam = TableSearchParam> {
  search: string;
  searchParam: Param;
}

const validation = yup.object().shape({
  search: yup.string().required(),
  searchParam: yup.object().shape({
    dataKey: yup.string(),
  }),
});

const TableSearchForm: React.FC<TableSearchProps> = ({ onSubmit, searchParams }) => {
  const {
    // formState: { errors },
    register,
    watch,
    setValue,
    handleSubmit,
  } = useForm<TableSearchFormState>({
    defaultValues: { search: '', searchParam: searchParams?.[0] },
    reValidateMode: 'onChange',
    resolver: yupResolver(validation),
  });
  const { search, searchParam } = watch();

  function onSelect(item: SelectItem) {
    setValue('searchParam', item);
  }

  function onValid(fData: TableSearchFormState) {
    onSubmit && onSubmit(fData);
  }

  function handleReset() {
    setValue('search', '');
    setValue('searchParam', searchParams?.[0]);

    onSubmit && onSubmit({ search: '', searchParam: undefined });
  }

  return (
    <SearchForm onSubmit={handleSubmit(onValid)} onReset={handleReset}>
      <StyledLabel isActive={!!search}>
        <SearchInput
          placeholder={searchParam?.label ? `Пошук за: "${searchParam?.label}"` : 'Оберіть параметр пошуку'}
          {...register('search')}
        />

        {search && <ClearButton variant={'onlyIconNoEffects'} icon={'close'} type={'reset'} onClick={handleReset} />}
      </StyledLabel>

      <ButtonIcon
        icon={'search'}
        size={'28px'}
        iconSize={'90%'}
        variant={'onlyIconNoEffects'}
        disabled={!searchParam || !search}
        type={'submit'}
      />

      <SearchParamInput
        {...{
          params: searchParams,
          onSelect,
          searchParam,
          defaultValue: searchParam,
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
  z-index: 60;
  position: relative;
`;

const StyledLabel = styled.label<{ isActive?: boolean }>`
  display: flex;
  align-items: center;

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
    width: ${({ isActive }) => (isActive ? '100%' : 0)};
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
  padding: 4px 40px 4px 8px;

  font-size: 12px;
  font-family: inherit;
  color: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }

  background-color: transparent;

  border-style: none;
  border-radius: 0;
  border-bottom: 1px solid ${({ theme }) => theme.sideBarBorderColor};

  &:hover,
  &:focus {
    /* border-bottom-color: ${({ theme }) => theme.accentColor.hover}; */
    outline-style: none;
  }
`;

const ClearButton = styled(ButtonIcon)`
  position: absolute;
  right: 0;
  top: 50%;
  z-index: 5;

  transform: translateY(-50%);
`;
export default TableSearchForm;
