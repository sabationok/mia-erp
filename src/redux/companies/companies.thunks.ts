import { CompaniesApi } from '../../api';
import { createAppAsyncThunk } from '../createAppAsynkThunk';

export enum CompanyThunkType {
  update = 'companies/updateThunk',
  create = 'companies/createThunk',
  getOne = 'companies/getOneThunk',
}

export function buildGetCompanyByIdThunk(type: string = CompanyThunkType.getOne) {
  return createAppAsyncThunk(type, CompaniesApi.getOne);
}
export const getOneCompanyThunk = buildGetCompanyByIdThunk();
export function buildUpdateCompanyThunk(type: string = CompanyThunkType.update) {
  return createAppAsyncThunk(type, CompaniesApi.update);
}
export const updateCompanyByIdThunk = buildUpdateCompanyThunk();
