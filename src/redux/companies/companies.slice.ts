import { CompanyEntity } from '../../types/companies/companies.types';
import { createSlice } from '@reduxjs/toolkit';
import { testUserKarina } from '../../data/usersDir.data';
import { getOneCompanyThunk, updateCompanyByIdThunk } from './companies.thunks';
import { StateDataMap, StateErrorType } from '../reduxTypes.types';
import { createDefaultDataMap } from '../createDefauldDataMap.helper';

export interface CompaniesState extends StateDataMap<CompanyEntity> {
  current?: CompanyEntity;
  isLoading: boolean;
  error: StateErrorType;
}
export const initialCompany: CompanyEntity = {
  _id: 'companyId',
  name: { first: 'Initial Comp' },
  label: { print: 'Initial Comp LTD' },
  email: 'company@mail.com',
  taxCode: { corp: '51651348435' },
  owner: testUserKarina,
};

const initialCompState: CompaniesState = {
  ...createDefaultDataMap(),
  current: undefined,
  isLoading: false,
  error: null,
};
export const companiesSlice = createSlice({
  name: 'companies',
  initialState: initialCompState,
  reducers: {},
  extraReducers: builder =>
    builder
      .addCase(getOneCompanyThunk.fulfilled, (s, a) => {
        s.current = a.payload.data;
        s.dataMap[a.payload.data._id] = a.payload.data;
      })
      .addCase(updateCompanyByIdThunk.fulfilled, (s, a) => {
        s.current = a.payload.data;
        s.dataMap[a.payload.data._id] = a.payload.data;
      }),
});
