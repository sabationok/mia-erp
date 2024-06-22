import ButtonIcon from 'components/atoms/ButtonIcon';
import React from 'react';
import styled from 'styled-components';
import SearchParamInput from './SearchParamInput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TableSearchParam, TableSortOrderEnum, TableSortParam } from '../../tableTypes.types';
import { FlexForm, FlexLabel } from '../../../atoms/FlexBox';
import { ToastService } from '../../../../services';

export interface TableSearchProps<Param extends TableSearchParam = any> {
  searchParams?: Param[];
  onSubmit?: (data: TableSearchFormState<Param>) => void;
}

export interface TableSearchFormState<Param extends TableSearchParam = TableSearchParam> {
  search: string;
  param: Param;
}

export interface TableSortFormState<Param extends TableSortParam = TableSortParam> {
  order: TableSortOrderEnum;
  param: Param;
}

const validation = yup.object().shape({
  search: yup.string().required(),
  // searchParam: yup.object().shape({
  //   dataKey: yup.string(),
  // }),
});

const TableSearchForm: React.FC<TableSearchProps> = ({ onSubmit, searchParams }) => {
  const {
    // formState: { errors },
    register,
    watch,
    setValue,
    handleSubmit,
  } = useForm<TableSearchFormState>({
    defaultValues: { param: searchParams?.[0] },
    reValidateMode: 'onSubmit',
    resolver: yupResolver(validation),
  });
  const { search, param } = watch();

  function onSelect<Param>(item: TableSearchParam<Param>) {
    setValue('param', item);
  }

  function onValid(fData: TableSearchFormState) {
    onSubmit && onSubmit(fData);
  }

  function handleReset() {
    setValue('search', '');
    setValue('param', searchParams?.[0]);

    onSubmit && onSubmit({ search: '', param: undefined });
  }

  return (
    <SearchForm
      onSubmit={handleSubmit(onValid, errors => {
        console.warn('[Table search form submit error]', errors);
        ToastService.error(errors.search?.message);
      })}
      onReset={handleReset}
    >
      <StyledLabel isActive={!!search}>
        <SearchInput
          placeholder={param?.label ? `Пошук за: "${param?.label}"` : 'Оберіть параметр пошуку'}
          {...register('search')}
        />

        {search && (
          <ClearButton variant={'onlyIconNoEffects'} size={'32px'} iconSize={'70%'} icon={'close'} type={'reset'} />
        )}
      </StyledLabel>

      <ButtonIcon
        icon={'search'}
        size={'32px'}
        iconSize={'90%'}
        variant={'onlyIconNoEffects'}
        disabled={!param || !search}
        type={'submit'}
      />

      <SearchParamInput params={searchParams} onSelect={onSelect} param={param} />
    </SearchForm>
  );
};

const SearchForm = styled(FlexForm)`
  flex-direction: row;
  //
  //display: grid;
  //grid-template-columns: 1fr min-content min-content;
  max-width: 100%;

  align-items: center;

  //max-width: 450px;
  height: 100%;
  z-index: 60;
  position: relative;
`;

const StyledLabel = styled(FlexLabel)`
  display: flex;
  align-items: center;
  max-width: 100%;

  position: relative;

  border-style: none;
  border-image: none;
  border-width: 0;

  height: 100%;
  width: max-content;

  &::before {
    display: block;
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    //left: 50%;
    height: 2px;
    width: ${({ $isActive }) => ($isActive ? '100%' : 0)};
    transition: all ${({ theme }) => theme.globals.timingFnMui};
    //transform: translate(-50%);
    background-color: ${({ theme }) => theme.accentColor.base};
  }

  &:focus-within {
    &::before {
      width: 100%;
    }
    //width: 250px;
  }

  transition: all ${p => p.theme.globals.timingFunctionMain};
`;
const SearchInput = styled.input`
  height: 100%;
  //width: 100%;
  padding: 4px 40px 4px 8px;

  font-size: 14px;
  font-family: inherit;
  color: inherit;

  &::placeholder {
    color: ${({ theme }) => theme.globals.inputPlaceholderColor};
  }

  background-color: transparent;

  border-style: none;
  border-radius: 0;
  //border-bottom: 1px solid ${({ theme }) => theme.sideBarBorderColor};

  &:hover,
  &:focus {
    /* border-bottom-color: ${({ theme }) => theme.accentColor.hover}; */
    outline-style: none;
  }

  //&:focus-visible,
  &:not(:placeholder-shown) {
    //width: 250px;
    max-width: 100%;
  }

  transition: all ${p => p.theme.globals.timingFunctionMain};
`;

const ClearButton = styled(ButtonIcon)`
  position: absolute;
  right: 0;
  //top: 50%;
  z-index: 5;

  //transform: translateY(-50%);
`;
export default TableSearchForm;
